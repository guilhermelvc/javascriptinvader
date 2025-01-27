/* Esse código é responsável pela lógica e renderização do jogador no jogo, permitindo movimentação, animações e disparo de 
projéteis. */

import {
    INITIAL_FRAMES,           // Número inicial de frames para animações.
    PATH_ENGINE_IMAGE,        // Caminho da imagem do motor da nave.
    PATH_ENGINE_SPRITES,      // Caminho para os sprites do motor da nave.
    PATH_SPACESHIP_IMAGE,     // Caminho da imagem da nave.
} from "../utils/constants.js";

import Projectile from "./Projectile.js";  // Importa a classe `Projectile` para criar projéteis.

class Player {
    constructor(canvasWidth, canvasHeight) {
        this.alive = true;  // Inicializa o jogador como "vivo".
        this.width = 48 * 2;  // Largura da nave (48 pixels multiplicado por 2 para maior escala).
        this.height = 48 * 2;  // Altura da nave (48 pixels multiplicado por 2 para maior escala).
        this.velocity = 6;  // Velocidade da nave.

        // Define a posição inicial do jogador no canvas, centralizando a nave.
        this.position = {
            x: canvasWidth / 2 - this.width / 2,  // Calcula a posição X centralizada.
            y: canvasHeight - this.height - 30,   // Posiciona a nave no fundo do canvas, com 30px de margem.
        };

        // Carrega as imagens (nave, motor e sprites de animação do motor).
        this.image = this.getImage(PATH_SPACESHIP_IMAGE);
        this.engineImage = this.getImage(PATH_ENGINE_IMAGE);
        this.engineSprites = this.getImage(PATH_ENGINE_SPRITES);

        this.sx = 0;  // Índice de sprite para animação.
        this.framesCounter = INITIAL_FRAMES;  // Contador de frames para animação.
    }

    // Método para mover o jogador para a esquerda.
    moveLeft() {
        this.position.x -= this.velocity;  // Decrementa a posição X para mover a nave à esquerda.
    }

    // Método para mover o jogador para a direita.
    moveRight() {
        this.position.x += this.velocity;  // Incrementa a posição X para mover a nave à direita.
    }

    // Método para carregar uma imagem de um caminho especificado.
    getImage(path) {
        const image = new Image();  // Cria um novo objeto Image.
        image.src = path;  // Define o caminho da imagem.
        return image;  // Retorna a imagem carregada.
    }

    // Método para desenhar o jogador (nave) no canvas.
    draw(ctx) {
        // Desenha a imagem da nave.
        ctx.drawImage(
            this.image,
            this.position.x,  // Posição X da nave.
            this.position.y,  // Posição Y da nave.
            this.width,       // Largura da nave.
            this.height       // Altura da nave.
        );

        // Desenha a animação do motor da nave com base no sprite.
        ctx.drawImage(
            this.engineSprites,
            this.sx,         // Coordenada X do sprite da animação.
            0,              // Coordenada Y (inicialmente em 0, apenas para sprites).
            48,             // Largura do sprite.
            48,             // Altura do sprite.
            this.position.x,  // Posição X da nave.
            this.position.y + 10,  // Posição Y (ligeiramente abaixo da nave).
            this.width,      // Largura da nave.
            this.height      // Altura da nave.
        );

        // Desenha o motor da nave (imagem estática).
        ctx.drawImage(
            this.engineImage,
            this.position.x,  // Posição X da nave.
            this.position.y + 8,  // Posição Y (ligeiramente abaixo da nave).
            this.width,       // Largura da nave.
            this.height       // Altura da nave.
        );

        this.update();  // Atualiza a animação do jogador (movimento do motor).
    }

    // Método para atualizar a animação da nave (alterando o sprite do motor).
    update() {
        // Quando o contador de frames chega a zero, muda o sprite da animação.
        if (this.framesCounter === 0) {
            // Se o sprite atingiu a posição final, volta ao início.
            this.sx = this.sx === 96 ? 0 : this.sx + 48;  // Muda a posição do sprite.
            this.framesCounter = INITIAL_FRAMES;  // Reseta o contador de frames.
        }

        this.framesCounter--;  // Decrementa o contador de frames.
    }

    // Método para atirar um projétil a partir da nave.
    shoot(projectiles) {
        const p = new Projectile(
            {
                x: this.position.x + this.width / 2 - 2,  // Posição X do projétil (centro da nave).
                y: this.position.y + 2,  // Posição Y do projétil (logo acima da nave).
            },
            -10  // Velocidade do projétil (para cima).
        );

        projectiles.push(p);  // Adiciona o projétil ao array de projéteis.
    }

    // Método para verificar se o projétil atingiu o jogador.
    hit(projectile) {
        // Verifica se o projétil colidiu com a área da nave (considerando as margens).
        return (
            projectile.position.x >= this.position.x + 20 &&  // Verifica a colisão no eixo X.
            projectile.position.x <= this.position.x + 20 + this.width - 38 &&  // Verifica a colisão no eixo X (margem da nave).
            projectile.position.y + projectile.height >= this.position.y + 22 &&  // Verifica a colisão no eixo Y (parte inferior da nave).
            projectile.position.y + projectile.height <= this.position.y + 22 + this.height - 34  // Verifica a colisão no eixo Y (margem inferior da nave).
        );
    }
}

export default Player;  // Exporta a classe `Player` para uso em outros módulos.
