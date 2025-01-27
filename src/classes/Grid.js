/* Esse código estrutura o comportamento de uma grid de inimigos (invaders), permitindo movimento, colisões com as bordas e 
aceleração de velocidade ao longo do tempo. Ele também permite reiniciar a partida e obter um invasor aleatório, criando a 
base para o funcionamento do jogo.*/

import Invader from "./Invader.js";
// Importa a classe Invader do arquivo "Invader.js", que representa os inimigos no jogo.

class Grid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.direction = "right";  // Direção inicial do movimento dos invasores (para a direita).
        this.moveDown = false;  // Flag que indica se os invasores devem se mover para baixo.
        this.boost = 0.1;  // Aceleração para o aumento da velocidade dos invasores ao longo do tempo.
        this.invadersVelocity = 1;  // Velocidade inicial dos invasores.

        this.invaders = this.init();  // Inicializa a grade de invasores.
    }

    // Método para inicializar os invasores, organizando-os em uma matriz de linhas e colunas.
    init() {
        const array = [];  // Cria um array vazio para armazenar os invasores.

        for (let row = 0; row < this.rows; row += 1) {  // Loop pelas linhas.
            for (let col = 0; col < this.cols; col += 1) {  // Loop pelas colunas.
                // Cria um novo invader (inimigo) com a posição calculada com base na linha e coluna.
                const invader = new Invader(
                    {
                        x: col * 50 + 20,  // Posição X dos invasores ajustada com base na coluna.
                        y: row * 37 + 120,  // Posição Y dos invasores ajustada com base na linha.
                    },
                    this.invadersVelocity  // Define a velocidade inicial dos invasores.
                );

                array.push(invader);  // Adiciona o invader criado ao array de invasores.
            }
        }

        return array;  // Retorna o array com todos os invasores criados.
    }

    // Método para desenhar todos os invasores no canvas (usando o contexto ctx).
    draw(ctx) {
        this.invaders.forEach((invader) => invader.draw(ctx));
        // Para cada invader na grid, chama o método de desenho (draw) passando o contexto do canvas.
    }

    // Método de atualização para movimentar os invasores, com base no estado do jogador.
    update(playerStatus) {
        // Verifica se os invasores atingiram a borda direita do canvas.
        if (this.reachedRightBoundary()) {
            this.direction = "left";  // Se atingiu a borda direita, os invasores começam a mover para a esquerda.
            this.moveDown = true;  // Se atingiu a borda, eles se movem para baixo.
        } else if (this.reachedLeftBoundary()) {
            this.direction = "right";  // Se atingiu a borda esquerda, os invasores começam a mover para a direita.
            this.moveDown = true;  // Se atingiu a borda, eles se movem para baixo.
        }

        if (!playerStatus) this.moveDown = false;  // Se o jogador não estiver ativo, não move os invasores para baixo.

        // Atualiza a posição e velocidade de cada invader na grid.
        this.invaders.forEach((invader) => {
            if (this.moveDown) {
                invader.moveDown();  // Move o invader para baixo.
                invader.incrementVelocity(this.boost);  // Aumenta a velocidade do invader ao longo do tempo.
                this.invadersVelocity = invader.velocity;  //
            }

            // Move os invasores para a direita ou para a esquerda dependendo da direção.
            if (this.direction === "right") invader.moveRight();  // Move o invader para a direita.
            if (this.direction === "left") invader.moveLeft();  // Move o invader para a esquerda.
        });
    
        this.moveDown = false;  // Reseta o flag 'moveDown' após o movimento dos invasores.
    }
    
    // Verifica se algum invader atingiu a borda direita do canvas.
    reachedRightBoundary() {
        return this.invaders.some(
            (invader) => invader.position.x + invader.width >= innerWidth
            // Verifica se a posição X de um invader somada à sua largura ultrapassou a largura da tela (innerWidth).
        );
    }
    
    // Verifica se algum invader atingiu a borda esquerda do canvas.
    reachedLeftBoundary() {
        return this.invaders.some((invader) => invader.position.x <= 0);
        // Verifica se a posição X de algum invader é menor ou igual a 0, ou seja, se atingiu a borda esquerda.
    }
    
    // Retorna um invader aleatório da grid.
    getRandomInvader() {
        const index = Math.floor(Math.random() * this.invaders.length);  // Gera um índice aleatório dentro do tamanho da grid.
        return this.invaders[index];  // Retorna o invader que corresponde ao índice aleatório.
    }
    
    // Método para reiniciar a grid de invasores.
    restart() {
        this.invaders = this.init();  // Recria a grid de invasores (reinicia o jogo).
        this.direction = "right";  // Reseta a direção para a direita.
    }
}

export default Grid;



