/* Esse código representa uma partícula no jogo (como uma explosão, efeito visual ou brilho) que se move e desaparece com o tempo.  */

class Particle {
    constructor(position, velocity, radius, color) {
        this.position = position;  // Define a posição inicial da partícula (objeto com propriedades 'x' e 'y').
        this.velocity = velocity;  // Define a velocidade da partícula (objeto com componentes 'x' e 'y').
        this.radius = radius;  // Define o raio da partícula, determinando seu tamanho.
        this.color = color;  // Define a cor da partícula.
        this.opacity = 1;  // Define a opacidade da partícula (inicialmente visível).
    }

    // Método para desenhar a partícula no canvas.
    draw(ctx) {
        ctx.save();  // Salva o estado atual do contexto de desenho (para restaurar depois).
        ctx.beginPath();  // Inicia o caminho para desenhar a partícula.
        ctx.globalAlpha = this.opacity;  // Define a opacidade global da partícula (efetua o efeito de desvanecimento).
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);  // Desenha um círculo com a posição, raio e intervalo de 360 graus.
        ctx.fillStyle = this.color;  // Define a cor de preenchimento da partícula.
        ctx.fill();  // Preenche o círculo com a cor especificada.
        ctx.closePath();  // Fecha o caminho de desenho.
        ctx.restore();  // Restaura o estado do contexto de desenho ao que era antes de chamar `save()`.
    }

    // Método para atualizar a posição e a opacidade da partícula.
    update() {
        this.position.x += this.velocity.x;  // Atualiza a posição da partícula no eixo X com base na sua velocidade.
        this.position.y += this.velocity.y;  // Atualiza a posição da partícula no eixo Y com base na sua velocidade.

        // Reduz a opacidade da partícula ao longo do tempo (fazendo-a desaparecer gradualmente).
        this.opacity = this.opacity - 0.008 <= 0 ? 0 : this.opacity - 0.008;
    }
}

export default Particle;  // Exporta a classe `Particle` para que possa ser utilizada em outros módulos.
