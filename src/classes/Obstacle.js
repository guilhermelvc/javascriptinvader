/*Este código é responsável por gerenciar os obstáculos que protegem a nave no jogo, controlando sua aparência e 
atualização de posição. */

import { PATH_SATELITE_IMAGE } from "../utils/constants.js";

class Obstacle {
    constructor(position, width, height, color) {
        this.position = position; // Define a posição do obstáculo no canvas (objeto com propriedades 'x' e 'y').
        this.width = width; // Define a largura do obstáculo.
        this.height = height; // Define a altura do obstáculo.
        this.color = color; // Define a cor do obstáculo.
        this.image = new Image(); // Cria um objeto de imagem.
        this.image.src = PATH_SATELITE_IMAGE; // Define o caminho da imagem do satélite.
    }

    // Método para desenhar o obstáculo no canvas.
    draw(ctx) {
        if (this.image.complete) {
            // Se a imagem já foi carregada, desenhe-a no canvas.
            ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        } else {
            // Caso a imagem ainda não tenha carregado, desenha o retângulo colorido como fallback.
            ctx.fillStyle = this.color;
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }

    // Método para verificar se um projétil atingiu o obstáculo.
    hit(projectile) {
        const projectilePositionY =
            projectile.velocity < 0 // Verifica se o projétil está indo para cima (velocidade negativa).
                ? projectile.position.y // Se o projétil está indo para cima, utiliza a posição Y do projétil.
                : projectile.position.y + projectile.height; // Caso contrário, utiliza a parte inferior do projétil.

        // Verifica se o projétil está dentro da área do obstáculo.
        return (
            projectile.position.x >= this.position.x && // Verifica se a posição X do projétil está dentro da largura do obstáculo.
            projectile.position.x <= this.position.x + this.width &&
            projectilePositionY >= this.position.y && // Verifica se a posição Y do projétil está dentro da altura do obstáculo.
            projectilePositionY <= this.position.y + this.height
        );
    }
}

export default Obstacle; // Exporta a classe `Obstacle` para que possa ser utilizada em outros módulos.
