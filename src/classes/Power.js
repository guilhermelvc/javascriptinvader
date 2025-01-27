/*Esse código representa o comportamento do item "objeto de poder" no jogo, que pode ser coletado pelo jogador para vencer a partida. */

export default class Power {
    // Construtor da classe Power, inicializa a posição, raio, cor e velocidade do power-up.
    constructor(x, y, radius, color) {
        this.position = { x, y };  // Define a posição inicial do power-up (coordenadas x, y).
        this.radius = radius;  // Define o raio do power-up.
        this.color = color;  // Define a cor do power-up.
        this.velocity = { x: 0, y: 1 };  // Define a velocidade do power-up (flutua para baixo).
        this.emoji = "⚡"; // Emoji do raio
        this.fontSize = radius * 2; // Tamanho da fonte proporcional ao raio
    }

    // Método que atualiza a posição do power-up com base em sua velocidade.
    update() {
        this.position.y += this.velocity.y;  // A posição Y do power-up é incrementada pela sua velocidade Y (fazendo-o descer).
    }

    // Método para desenhar o power-up no canvas.
    draw(ctx) {
        const { x, y } = this.position;

        ctx.save(); // Salva o estado do contexto

        // Define o estilo da fonte para desenhar o emoji
        ctx.font = `${this.fontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = this.color;

        // Desenha o emoji no canvas
        ctx.fillText(this.emoji, x, y);

        ctx.restore(); // Restaura o estado do contexto
    }

    // Método para verificar se o jogador coletou o power-up.
    collect(player) {
        const distX = player.position.x - this.position.x;  // Calcula a diferença entre a posição X do jogador e do power-up.
        const distY = player.position.y - this.position.y;  // Calcula a diferença entre a posição Y do jogador e do power-up.
        const distance = Math.sqrt(distX * distX + distY * distY);  // Calcula a distância entre a posição do jogador e o power-up.

        // Verifica se a distância entre o jogador e o power-up é menor que a soma do raio do power-up e metade da largura da nave (colisão).
        return distance < player.width / 2 + this.radius;
    }
}
