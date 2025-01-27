// Importação de classes e constantes necessárias
import Grid from "./classes/Grid.js";
import Obstacle from "./classes/Obstacle.js";
import Particle from "./classes/Particle.js";
import Player from "./classes/Player.js";
import SoundEffects from "./classes/SoundEffects.js";
import Star from "./classes/Star.js";
import { GameState, NUMBER_STARS } from "./utils/constants.js";
import Power from "./classes/Power.js";
import Life from "./classes/Life.js";


// Defina o número máximo de pontos de poder necessários para a vitória .
const maxPowerPoints = 20;  // Número editável para definir o ponto de vitória


// Instancia efeitos sonoros
const soundEffects = new SoundEffects();

// Seleciona elementos da interface do usuário (UI)
const startScreen = document.querySelector(".start-screen");
const gameOverScreen = document.querySelector(".game-over");
const scoreUi = document.querySelector(".score-ui");
const scoreElement = scoreUi.querySelector(".score > span");
const levelElement = scoreUi.querySelector(".level > span");
const highElement = scoreUi.querySelector(".high > span");
const buttonPlay = document.querySelector(".button-play");
const buttonRestart = document.querySelector(".button-restart");

// Remove a tela de game over inicialmente
gameOverScreen.remove();

// Configuração do canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
ctx.imageSmoothingEnabled = false; // Desativa suavização para manter gráficos pixelados

// Estado atual do jogo
let currentState = GameState.START;
let lifeItems = []; // Array para armazenar itens de vida

// Dados do jogo
const gameData = {
    score: 0,
    level: 1,
    high: 0,
    life: 3,
    power: 0,
};

// Função para atualizar a interface do HUD
const showGameData = () => {
    scoreElement.textContent = gameData.score; // Atualiza pontuação
    levelElement.textContent = gameData.level; // Atualiza nível
    highElement.textContent = gameData.high;  // Atualiza recorde
    lifeElement.textContent = gameData.life;  // Atualiza vidas
    powerElement.textContent = powerPoints;  // Atualiza pontos de poder
};

// Inicializa o jogador
const player = new Player(canvas.width, canvas.height);

// Inicializa arrays para objetos do jogo
const stars = [];
const playerProjectiles = [];
const invadersProjectiles = [];
const particles = [];
const obstacles = [];
const powerElement = scoreUi.querySelector(".power > span"); // Elemento de exibição de poder

// Função para inicializar obstáculos
const initObstacles = () => {
    const x = canvas.width / 2 - 50; // Posição inicial horizontal
    const y = canvas.height - 250; // Posição inicial vertical
    const offset = canvas.width * 0.15; // Distância entre os obstáculos
    const color = "blue"; // Cor dos obstáculos

    // Criação de dois obstáculos
    const obstacle1 = new Obstacle({ x: x - offset, y }, 180, 70, color); //Configurar o tamanho do obstaculo 1
    const obstacle2 = new Obstacle({ x: x + offset, y }, 180, 70, color);

    obstacles.push(obstacle1, obstacle2); // Adiciona os obstáculos ao array
};

initObstacles(); // Chama a inicialização dos obstáculos

// Inicializa o grid de invasores
const grid = new Grid(
    Math.round(Math.random() * 2 + 1), // Número aleatório de linhas
    Math.round(Math.random() * 2 + 1)  // Número aleatório de colunas
);

// Armazena o estado das teclas pressionadas
const keys = {
    left: false, // Tecla para mover à esquerda
    right: false, // Tecla para mover à direita
    shoot: {
        pressed: false,  // Tecla de disparo pressionada
        released: true,  // Tecla de disparo liberada
    },
};

// Incrementa a pontuação e atualiza o recorde, se necessário
const incrementScore = (value) => {
    gameData.score += value; // Adiciona valor à pontuação atual
    if (gameData.score > gameData.high) {
        gameData.high = gameData.score; // Atualiza o recorde
    }
};

// Incrementa o nível do jogo e verifica se deve gerar uma vida
const incrementLevel = () => {
    gameData.level += 1;
    if (gameData.level % 1 === 0) {
        generateLife(); // Gera um item de vida a cada 1 nível
    }
};

// Gera estrelas no fundo do jogo
const generateStars = () => {
    for (let i = 0; i < NUMBER_STARS; i += 1) {
        stars.push(new Star(canvas.width, canvas.height));
    }
};

// Desenha as estrelas no fundo
const drawStars = () => {
    stars.forEach((star) => {
        star.draw(ctx); // Desenha cada estrela
        star.update();  // Atualiza a posição da estrela
    });
};

// Função para desenhar os projéteis
const drawProjectiles = () => {
    const projectiles = [...playerProjectiles, ...invadersProjectiles]; // Combina projéteis de jogador e inimigos
    projectiles.forEach((projectile) => {
        projectile.draw(ctx); // Desenha projétil
        projectile.update();  // Atualiza posição do projétil
    });
};

// Desenha partículas de explosão
const drawParticles = () => {
    particles.forEach((particle) => {
        particle.draw(ctx); // Desenha partícula
        particle.update();  // Atualiza partícula
    });
};

// Desenha os obstáculos
const drawObstacles = () => {
    obstacles.forEach((obstacle) => obstacle.draw(ctx));
};

// Função que gera um item de vida em uma posição aleatória
const generateLife = () => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.5; // Gera no topo da tela
    const lifeItem = new Life(x, y, 15, "red"); // Cria o item de vida
    lifeItems.push(lifeItem); // Adiciona ao array
};

// Função que desenha os itens de vida
const drawLives = () => {
    lifeItems.forEach((lifeItem) => {
        lifeItem.draw(ctx); // Desenha cada item de vida
        lifeItem.update(); // Atualiza a posição (desce)
    });
};

// Função para limpar projéteis que saem da tela
const clearProjectiles = () => {
    playerProjectiles.forEach((projectile, i) => {
        if (projectile.position.y <= 0) {
            playerProjectiles.splice(i, 1); // Remove projéteis do jogador fora da tela
        }
    });

    invadersProjectiles.forEach((projectile, i) => {
        if (projectile.position.y > canvas.height) {
            invadersProjectiles.splice(i, 1); // Remove projéteis de invasores fora da tela
        }
    });
};

// Função para limpar partículas com base na sua opacidade
const clearParticles = () => {
    // Percorre todas as partículas
    particles.forEach((particle, i) => {
        // Se a opacidade da partícula for menor ou igual a 0
        if (particle.opacity <= 0) {
            particles.splice(i, 1); // Remove a partícula da lista
        }
    });
};

// Função para criar uma explosão em uma posição específica
const createExplosion = (position, size, color) => {
    // Cria uma quantidade de partículas de explosão
    for (let i = 0; i < size; i += 1) {
        // Cria uma nova partícula com posição, velocidade e cor aleatória
        const particle = new Particle(
            {
                x: position.x,
                y: position.y,
            },
            {
                x: (Math.random() - 0.5) * 1.5,
                y: (Math.random() - 0.5) * 1.5,
            },
            2,
            color
        );

        particles.push(particle); // Adiciona a partícula à lista de partículas
    }
};

// Função que verifica se o jogador coletou uma vida
const checkLifeCollection = () => {
    lifeItems.forEach((lifeItem, index) => {
        if (lifeItem.collect(player)) {
            if (gameData.life < 5) {
                gameData.life += 1; // Incrementa vidas até o limite de 5
                updateLives(); // Atualiza o HUD de vidas
                soundEffects.playHeartSound(); // Toca o som de vida
            }
            lifeItems.splice(index, 1); // Remove a vida coletada
        }
    });
};

// Função que verifica se um projétil atingiu um invasor
const checkShootInvaders = () => {
    grid.invaders.forEach((invader, invaderIndex) => {
        playerProjectiles.some((projectile, projectileIndex) => {
            // Verifica se o projétil atingiu o invasor
            if (invader.hit(projectile)) {
                soundEffects.playHitSound(); // Toca o som de impacto

                // Cria uma explosão no local do invasor
                createExplosion(
                    {
                        x: invader.position.x + invader.width / 2,
                        y: invader.position.y + invader.height / 2,
                    },
                    10,
                    "#FFC222" //"#941CFF" cor roxo
                );

                incrementScore(10); // Incrementa a pontuação do jogador

                grid.invaders.splice(invaderIndex, 1); // Remove o invasor da grade
                playerProjectiles.splice(projectileIndex, 1); // Remove o projétil

                return; // Interrompe o loop de projéteis
            }
        });
    });
};

// Função para exibir a tela de Game Over
const showGameOverScreen = () => {
    document.body.append(gameOverScreen); // Adiciona a tela de Game Over ao corpo
    gameOverScreen.classList.add("zoom-animation"); // Adiciona animação de zoom
    soundEffects.playGameOverSound(); // Toca musica game over
};

// Obtém o elemento HTML que mostra as vidas do jogador
const lifeElement = document.querySelector(".life > span");
lifeElement.textContent = gameData.life; // Exibe o número inicial de vidas

// Função para atualizar o número de vidas exibido
const updateLives = () => {
    lifeElement.textContent = gameData.life; // Atualiza as vidas no elemento HTML
    if (gameData.life <= 0) {
        gameOver(); // Chama o fim de jogo se as vidas acabarem
    }
};

// Criação e configuração da tela de vitória
const victoryScreen = document.createElement("div");
victoryScreen.classList.add("screen", "victory-screen");
victoryScreen.innerHTML = `
    <h1>Victory!</h1>
    <button class="button-restart">Restart</button>
`;
victoryScreen.style.display = "none"; // Inicialmente oculta
document.body.append(victoryScreen);

// Evento de clique no botão de reinício da tela de vitória
victoryScreen.querySelector(".button-restart").addEventListener("click", () => {
    victoryScreen.style.display = "none"; // Esconde a tela de vitória
    restartGame(); // Reinicia o jogo
});

// Função que verifica se o jogador foi atingido por um projétil
const checkShootPlayer = () => {
    invadersProjectiles.some((projectile, index) => {
        // Verifica se o projétil atingiu o jogador
        if (player.hit(projectile)) {
            soundEffects.playExplosionSound(); // Toca som de explosão
            invadersProjectiles.splice(index, 1); // Remove o projétil

            gameData.life -= 1; // Reduz a vida do jogador
            updateLives(); // Atualiza as vidas

            if (gameData.life <= 0) {
                gameOver(); // Finaliza o jogo se as vidas chegarem a 0
            }
        }
    });
};

// Função para lidar com a colisão do jogador com o fim de jogo
const gameOver = () => {
    // Cria múltiplas explosões na posição do jogador
    createExplosion(
        {
            x: player.position.x + player.width / 2,
            y: player.position.y + player.height / 2,
        },
        10,
        "white"
    );

    createExplosion(
        {
            x: player.position.x + player.width / 2,
            y: player.position.y + player.height / 2,
        },
        5,
        "#4D9BE6"
    );

    createExplosion(
        {
            x: player.position.x + player.width / 2,
            y: player.position.y + player.height / 2,
        },
        5,
        "crimson"
    );

    player.alive = false; // Marca o jogador como morto
    currentState = GameState.GAME_OVER; // Altera o estado para "Game Over"
    showGameOverScreen(); // Exibe a tela de Game Over
};

// Função para verificar colisões entre projéteis e obstáculos
const checkShootObstacles = () => {
    obstacles.forEach((obstacle) => {
        playerProjectiles.some((projectile, index) => {
            // Verifica se o projétil atingiu o obstáculo
            if (obstacle.hit(projectile)) {
                playerProjectiles.splice(index, 1); // Remove o projétil
                return;
            }
        });

        invadersProjectiles.some((projectile, index) => {
            // Verifica se o projétil dos invasores atingiu o obstáculo
            if (obstacle.hit(projectile)) {
                invadersProjectiles.splice(index, 1); // Remove o projétil
                return;
            }
        });
    });
};

// Função que verifica colisões entre invasores e obstáculos
const checkInvadersCollidedObstacles = () => {
    obstacles.forEach((obstacle, i) => {
        grid.invaders.some((invader) => {
            // Verifica se o invasor colidiu com o obstáculo
            if (invader.collided(obstacle)) {
                obstacles.splice(i, 1); // Remove o obstáculo da lista
            }
        });
    });
};

// Função que verifica se o jogador colidiu com algum invasor
const checkPlayerCollidedInvaders = () => {
    grid.invaders.some((invader) => {
        // Verifica se o jogador colidiu com o invasor
        if (
            invader.position.x >= player.position.x &&
            invader.position.x <= player.position.x + player.width &&
            invader.position.y >= player.position.y
        ) {
            gameOver(); // Se colidir, finaliza o jogo
        }
    });
};

// Variáveis para armazenar itens de poder e pontos de poder
let powerUps = [];
let powerPoints = 0; // Contador de pontos de poder

// Função que gera um item de poder em uma posição aleatória
const generatePowerUp = () => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.5; // Gera no topo da tela
    const powerUp = new Power(x, y, 15, "gold");
    powerUps.push(powerUp); // Adiciona o item à lista
};

// Função que desenha os itens de poder na tela
const drawPowerUps = () => {
    powerUps.forEach((powerUp) => {
        powerUp.draw(ctx); // Desenha o item
        powerUp.update(); // Atualiza a posição
    });
};

// Função que verifica se o jogador coletou um item de poder
const checkPowerUpCollection = () => {
    powerUps.forEach((powerUp, index) => {
        if (powerUp.collect(player)) {
            powerPoints += 1; // Incrementa os pontos de poder
            powerUps.splice(index, 1); // Remove o item coletado
            soundEffects.playPowerUpSound(); // Toca o som de power-up
            showGameData(); // Atualiza a exibição do jogo

            if (powerPoints >= maxPowerPoints) {  // Usando a variável maxPowerPoints
                showVictoryScreen(); // Exibe a tela de vitória
            }
        }
    });
};

// Função para exibir a tela de vitória
const showVictoryScreen = () => {
    currentState = GameState.GAME_OVER; // Altera o estado para "Game Over"
    victoryScreen.style.display = "flex"; // Exibe a tela de vitória
    soundEffects.playVictorySound(); // Toca o som de vitória
    soundEffects.playNextLevelSound(); // Toca o som de vitória
};

// Função que executa o loop principal do jogo
const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa a tela

    drawStars(); // Desenha as estrelas

    if (currentState === GameState.PLAYING) { // Se o jogo está em andamento
        showGameData(); // Exibe a pontuação e outros dados do jogo
        spawnGrid(); // Gera a grade de invasores
        
        drawProjectiles(); // Desenha os projéteis
        drawParticles(); // Desenha as partículas
        drawObstacles(); // Desenha os obstáculos
        drawLives(); // Desenha os itens de vida
        drawPowerUps(); // Desenha os itens de poder

        clearProjectiles(); // Limpa os projéteis
        clearParticles(); // Limpa as partículas

        // Verifica colisões e interações
        checkShootInvaders();
        checkShootPlayer();
        checkShootObstacles();
        checkInvadersCollidedObstacles();
        checkPlayerCollidedInvaders();
        checkPowerUpCollection();
        checkLifeCollection(); // Verifica se uma vida foi coletada

        grid.draw(ctx); // Desenha a grade de invasores
        grid.update(player.alive); // Atualiza a posição dos invasores

        ctx.save(); // Salva o contexto atual
        ctx.translate(player.position.x + player.width / 2, player.position.y + player.height / 2); // Centraliza o jogador

        // Verifica se o jogador está pressionando para atirar
        if (keys.shoot.pressed && keys.shoot.released) {
            soundEffects.playShootSound(); // Toca o som de tiro
            player.shoot(playerProjectiles); // Faz o jogador atirar
            keys.shoot.released = false; // Impede disparos repetidos
        }

        // Verifica se o jogador está pressionando para mover à esquerda
        if (keys.left && player.position.x >= 0) {
            player.moveLeft(); // Move o jogador para a esquerda
            ctx.rotate(-0.15); // Gira a tela
        }

        // Verifica se o jogador está pressionando para mover à direita
        if (keys.right && player.position.x <= canvas.width - player.width) {
            player.moveRight(); // Move o jogador para a direita
            ctx.rotate(0.15); // Gira a tela
        }

        ctx.translate(-player.position.x - player.width / 2, -player.position.y - player.height / 2); // Restaura o centro da tela

        player.draw(ctx); // Desenha o jogador
        ctx.restore(); // Restaura o contexto
    }

    if (currentState === GameState.GAME_OVER) { // Se o jogo terminou
        checkShootObstacles();
        drawProjectiles();
        drawParticles();
        drawObstacles();
        clearProjectiles();
        clearParticles();
        grid.draw(ctx);
        grid.update(player.alive); // Atualiza a grade mesmo após o fim do jogo
    }

    requestAnimationFrame(gameLoop); // Chama o próximo quadro do jogo
};

// Função que gera a nova grade de invasores a cada nível
const spawnGrid = () => {
    if (grid.invaders.length === 0) { 
        soundEffects.playNextLevelSound();

        const baseRows = 2;
        const baseCols = 3;

        const maxRows = 10;
        const maxCols = 12;

        grid.rows = Math.min(baseRows + Math.floor(gameData.level / 2), maxRows);
        grid.cols = Math.min(baseCols + Math.floor(gameData.level / 2), maxCols);

        grid.restart();
        incrementLevel();

        if (obstacles.length === 0) {
            initObstacles();
        }

        generatePowerUp();

        // Gera uma vida extra a cada 4 níveis
        if (gameData.level % 4 === 0) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const life = new Life(x, y, 20, "red"); // Coração vermelho
            powerUps.push(life); // Adiciona ao array de power-ups
        }
    }
};

// Função que reinicia o jogo
const restartGame = () => {
    currentState = GameState.PLAYING; // Define o estado como "jogando"

    player.alive = true; // O jogador está vivo

    grid.invaders.length = 0; // Limpa os invasores
    grid.invadersVelocity = 1; // Restaura a velocidade dos invasores

    invadersProjectiles.length = 0; // Limpa os projéteis dos invasores
    gameData.score = 0; // Zera a pontuação
    gameData.level = 0; // Zera o nível
    gameData.life = 3; // Restaura as vidas

    powerPoints = 0; // Zera os pontos de poder
    powerUps = []; // Limpa os itens de poder

    updateLives(); // Atualiza as vidas na tela
    initObstacles(); // Inicializa os obstáculos
    
    gameOverScreen.remove(); // Remove a tela de Game Over
    soundEffects.playStartSound(); // Toca o som de start
};

// Eventos para capturar as teclas pressionadas e soltas
addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();

    if (key === "a") keys.left = true; // Movimento para a esquerda
    if (key === "d") keys.right = true; // Movimento para a direita
    if (key === "enter") keys.shoot.pressed = true; // Atirar
});

addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase();

    if (key === "a") keys.left = false; // Parar de mover para a esquerda
    if (key === "d") keys.right = false; // Parar de mover para a direita
    if (key === "enter") {
        keys.shoot.pressed = false; // Parar de atirar
        keys.shoot.released = true; // Permitir um novo disparo
    }
});


// Evento para lidar com o clique do botão de "Play" (Iniciar Jogo)
buttonPlay.addEventListener("click", () => {
    startScreen.remove(); // Remove a tela inicial
    scoreUi.style.display = "block"; // Exibe o HUD de pontuação
    currentState = GameState.PLAYING; // Define o estado do jogo como "jogando"

    // Configura intervalo para atirar projéteis dos invasores
    setInterval(() => {
        const invader = grid.getRandomInvader(); // Obtém um invasor aleatório
        if (invader) {
            invader.shoot(invadersProjectiles); // Faz o invasor atirar
        }
    }, 1000); // Intervalo de 1 segundo
});

// Evento para lidar com o clique do botão de "Restart" (Reiniciar Jogo)
buttonRestart.addEventListener("click", restartGame); // Chama a função de reinício do jogo

// Inicializa as estrelas no fundo
generateStars();

// Inicia o loop principal do jogo
gameLoop();

window.onload = function () {
    const themeMusic = new Audio('src/assets/audios/theme.mp3');
    themeMusic.loop = true;
    themeMusic.volume = 0.1; // Ajusta o volume
    themeMusic.play();

    const toggleMusicButton = document.getElementById('toggle-music');
    const playButton = document.getElementById('play-game'); // Seleciona o botão Play
    const startScreen = document.querySelector('.start-screen'); // Seleciona a tela inicial

    let isPlaying = true;

    // Controle de música
    toggleMusicButton.addEventListener('click', () => {
        if (isPlaying) {
            themeMusic.pause();
            toggleMusicButton.textContent = 'Play Música';
        } else {
            themeMusic.play();
            toggleMusicButton.textContent = 'Pause Música';
        }
        isPlaying = !isPlaying;

        // Remove o foco do botão após o clique
        toggleMusicButton.blur();
    });

    // Iniciar o jogo ao clicar no botão Play
    playButton.addEventListener('click', () => {
        startScreen.style.display = 'none'; // Esconde a tela inicial
        console.log('Jogo iniciado!'); // Lógica para iniciar o jogo
    });
};