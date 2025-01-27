/*Este código é responsável por gerenciar o projétil que a nave dispara no jogo, controlando sua aparência, movimento e 
atualização de posição. */

class Projectile {
    // Construtor da classe Projectile, inicializa a posição, tamanho e velocidade do projétil.
    constructor(position, velocity) {
        this.position = position;  // Define a posição inicial do projétil (coordenadas x, y).
        this.width = 2;  // Define a largura do projétil.
        this.height = 20;  // Define a altura do projétil.
        this.velocity = velocity;  // Define a velocidade do projétil, que determinará o movimento do mesmo.
    }

    // Método para desenhar o projétil no canvas.
    draw(ctx) {
        ctx.fillStyle = "white";  // Define a cor do projétil como branca.
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);  // Desenha o projétil como um retângulo branco nas coordenadas da posição.
    }

    // Método para atualizar a posição do projétil.
    update() {
        this.position.y += this.velocity;  // Atualiza a posição Y do projétil com base na sua velocidade. Se a velocidade for negativa, o projétil se moverá para cima, e se for positiva, para baixo.
    }
}

export default Projectile;
