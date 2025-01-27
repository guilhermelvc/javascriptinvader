/*Este código cria um efeito visual no qual as estrelas "caem" de forma contínua, se reposicionando no topo do canvas assim que 
saem da tela para fazer o cenário no fundo.*/

class Star {

    // Construtor da classe Star, que cria uma estrela com propriedades aleatórias.
    constructor(canvasWidth, canvasHeight) {
        // Define a posição inicial da estrela com coordenadas aleatórias dentro das dimensões do canvas.
        this.position = {
            x: Math.random() * canvasWidth,  // Posição aleatória no eixo X.
            y: Math.random() * canvasHeight, // Posição aleatória no eixo Y.
        };

        // Define o raio da estrela como um valor aleatório entre 0.3 e 1.
        this.radius = Math.random() * 1 + 0.3;

        // Define a velocidade de queda da estrela, baseada no seu raio.
        this.velocity = (Math.random() * 0.4 + 0.1) * this.radius;

        // Armazena as dimensões do canvas para referência.
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        // Define a cor da estrela.
        this.color = "white";
    }

    // Método para desenhar a estrela no canvas.
    draw(ctx) {
        ctx.fillStyle = this.color;  // Define a cor de preenchimento da estrela (branca).
        ctx.beginPath();  // Inicia um novo caminho para desenhar.
        // Desenha um círculo (estrela) usando a posição e o raio definidos.
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();  // Preenche o círculo com a cor definida.
        ctx.closePath();  // Finaliza o caminho do desenho.
    }

    // Método para atualizar a posição da estrela, criando um efeito de movimento.
    update() {
        // Verifica se a estrela ultrapassou o limite inferior do canvas.
        if (this.position.y > this.canvasHeight + this.radius) {
            // Se ultrapassou, reposiciona a estrela no topo do canvas com uma posição aleatória no eixo X.
            this.position.y = -this.radius;  // Coloca a estrela no topo.
            this.position.x = Math.random() * this.canvasWidth;  // Define uma nova posição aleatória no eixo X.
            // Recalcula a velocidade com base no novo raio.
            this.velocity = (Math.random() * 0.4 + 0.1) * this.radius;
        }

        // Atualiza a posição da estrela, fazendo-a cair no eixo Y.
        this.position.y += this.velocity;
    }
}

export default Star;
