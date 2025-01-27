/*Este arquivo fornece valores e caminhos essenciais para o jogo, centralizando as constantes e facilitando a manutenção e 
atualização das imagens e estados.*/

// Define o caminho para a imagem da nave espacial.
export const PATH_SPACESHIP_IMAGE = "src/assets/images/spaceship.png";

// Define o caminho para a imagem do motor da nave espacial.
export const PATH_ENGINE_IMAGE = "src/assets/images/engine.png";

// Define o caminho para os sprites do motor da nave espacial (animados).
export const PATH_ENGINE_SPRITES = "src/assets/images/engine_sprites.png";

// Define o caminho para a imagem do invasor (inimigo).
export const PATH_INVADER_IMAGE = "src/assets/images/invader.png";

// Define o caminho para a imagem do stelite (obstáculo).
export const PATH_SATELITE_IMAGE = "src/assets/images/satelite.png";

// Define o número de estrelas a serem geradas no cenário do jogo.
export const NUMBER_STARS = 100;

// Define o número de quadros que o jogo deve esperar antes de atualizar o sprite da nave espacial.
export const INITIAL_FRAMES = 8;

// Define os estados possíveis do jogo.
export const GameState = {
    // Estado inicial do jogo, quando o jogo ainda não começou.
    START: "start",

    // Estado do jogo enquanto o jogador está jogando.
    PLAYING: "playing",

    // Estado do jogo quando o jogador perde e o jogo termina.
    GAME_OVER: "gameOver",

    VICTORY: "victory",
};
