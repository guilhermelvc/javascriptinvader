/* Este código define o comportamento e as interações dos invasores no jogo, incluindo movimentação, disparo de projéteis, e 
detecção de colisões com projéteis ou obstáculos. */

import { PATH_INVADER_IMAGE } from "../utils/constants.js";
// Importa o caminho da imagem do invasor (definido em constants.js).

import Projectile from "./Projectile.js";
// Importa a classe `Projectile` para criar e manipular projéteis disparados pelos invasores.

class Invader {
    constructor(position, velocity) {
        this.position = position;  // A posição do invasor no canvas (objeto com propriedades 'x' e 'y').
        this.scale = 0.8;  // Fator de escala para ajustar o tamanho do invasor.
        this.width = 50 * this.scale;  // Largura do invasor com base na escala.
        this.height = 37 * this.scale;  // Altura do invasor com base na escala.
        this.velocity = velocity;  // A velocidade do movimento do invasor.

        this.image = this.getImage(PATH_INVADER_IMAGE);  // Carrega a imagem do invasor.
    }

    // Método para mover o invasor para a direita.
    moveRight() {
        this.position.x += this.velocity;  // Aumenta a posição X do invasor pela sua velocidade.
    }

    // Método para mover o invasor para a esquerda.
    moveLeft() {
        this.position.x -= this.velocity;  // Diminui a posição X do invasor pela sua velocidade.
    }

    // Método para mover o invasor para baixo.
    moveDown() {
        this.position.y += this.height;  // Aumenta a posição Y do invasor pela altura do invasor (move para baixo).
    }

    // Método para aumentar a velocidade do invasor.
    incrementVelocity(boost) {
        this.velocity += boost;  // Aumenta a velocidade do invasor pelo valor do 'boost'.
    }

    // Método para carregar a imagem do invasor.
    getImage(path) {
        const image = new Image();  // Cria um novo objeto de imagem.
        image.src = path;  // Define o caminho da imagem.
        return image;  // Retorna a imagem carregada.
    }

    // Método para desenhar o invasor no canvas usando o contexto (ctx).
    draw(ctx) {
        ctx.drawImage(
            this.image,  // A imagem do invasor.
            this.position.x,  // Posição X do invasor.
            this.position.y,  // Posição Y do invasor.
            this.width,  // Largura do invasor.
            this.height  // Altura do invasor.
        );
    }

    // Método para disparar um projétil a partir do invasor.
    shoot(projectiles) {
        const p = new Projectile(
            {
                x: this.position.x + this.width / 2 - 2,  // Define a posição X do projétil no centro do invasor.
                y: this.position.y + this.height,  // Define a posição Y do projétil logo abaixo do invasor.
            },
            10  // Define a velocidade do projétil.
        );
        projectiles.push(p);  // Adiciona o projétil ao array de projéteis.
    }

    // Método para verificar se um projétil atingiu o invasor.
    hit(projectile) {
        return (
            projectile.position.x >= this.position.x &&  // Verifica se a posição X do projétil está dentro da largura do invasor.
            projectile.position.x <= this.position.x + this.width &&
            projectile.position.y >= this.position.y &&  // Verifica se a posição Y do projétil está dentro da altura do invasor.
            projectile.position.y <= this.position.y + this.height
        );
    }

    // Método para verificar se o invasor colidiu com um obstáculo.
    collided(obstacle) {
        return (
            (obstacle.position.x >= this.position.x &&  // Verifica se a posição X do obstáculo está dentro da largura do invasor.
                obstacle.position.x <= this.position.x + this.width &&
                obstacle.position.y >= this.position.y &&  // Verifica se a posição Y do obstáculo está dentro da altura do invasor.
                obstacle.position.y <= this.position.y + this.height) ||
            (obstacle.position.x + obstacle.width >= this.position.x &&  // Verifica se a largura do obstáculo interfere na posição do invasor.
                obstacle.position.x <= this.position.x &&
                obstacle.position.y >= this.position.y &&  // Verifica se a posição Y do obstáculo está dentro da altura do invasor.
                obstacle.position.y <= this.position.y + this.height)
        );
    }
}

export default Invader;  // Exporta a classe `Invader` para que possa ser utilizada em outros módulos.
