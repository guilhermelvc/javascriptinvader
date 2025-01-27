/*Esse código representa o comportamento do item "vida" no jogo, que pode ser coletado pelo jogador. */

export default class Life {
    // Construtor da classe Life, inicializa a posição, raio, cor e velocidade da vida.
    constructor(x, y, radius, color) {
        this.position = { x, y };  // Define a posição inicial da vida (coordenadas x, y).
        this.radius = radius;  // Define o raio do item de vida.
        this.color = color;  // Define a cor do item de vida (vermelho para coração).
        this.velocity = { x: 0, y: 1 };  // Define a velocidade da vida (flutua para baixo).
        this.emoji = "❤️"; // Emoji de coração
        this.fontSize = radius * 2; // Tamanho da fonte proporcional ao raio
    }

    // Método que atualiza a posição do item de vida com base em sua velocidade.
    update() {
        this.position.y += this.velocity.y;  // A posição Y da vida é incrementada pela sua velocidade Y (fazendo-o descer).
    }

    // Método para desenhar o item de vida no formato de coração
draw(ctx) {
    const { x, y } = this.position;

        ctx.save(); // Salva o estado do contexto

        // Define o estilo da fonte para desenhar o emoji
        ctx.font = `${this.fontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = this.color;

        // Desenha o emoji de coração no canvas
        ctx.fillText(this.emoji, x, y);

        ctx.restore(); // Restaura o estado do contexto
}

    // Método para verificar se o jogador coletou o item de vida.
    collect(player) {
        const distX = player.position.x - this.position.x;  // Calcula a diferença entre a posição X do jogador e do item de vida.
        const distY = player.position.y - this.position.y;  // Calcula a diferença entre a posição Y do jogador e do item de vida.
        const distance = Math.sqrt(distX * distX + distY * distY);  // Calcula a distância entre a posição do jogador e o item de vida.

        // Verifica se a distância entre o jogador e o item de vida é menor que a soma do raio do item e metade da largura da nave (colisão).
        return distance < player.width / 2 + this.radius;
    }
}
