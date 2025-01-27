/* Este código gerencia os efeitos sonoros do jogo, garantindo que sons como disparos, acertos, explosões e transições de nível 
sejam tocados corretamente e com volumes ajustados.*/

class SoundEffects {
    // Construtor da classe SoundEffects, que inicializa todos os efeitos sonoros do jogo.
    constructor() {
        // Inicializa um array de sons para o disparo (5 sons diferentes de disparo).
        this.shootSounds = [
            new Audio("src/assets/audios/shoot.mp3"),  // Sons de disparo.
            new Audio("src/assets/audios/shoot.mp3"),
            new Audio("src/assets/audios/shoot.mp3"),
            new Audio("src/assets/audios/shoot.mp3"),
            new Audio("src/assets/audios/shoot.mp3"),
        ];

        // Inicializa um array de sons para o acerto (5 sons diferentes de acerto).
        this.hitSounds = [
            new Audio("src/assets/audios/hit.mp3"),  // Sons de acerto.
            new Audio("src/assets/audios/hit.mp3"),
            new Audio("src/assets/audios/hit.mp3"),
            new Audio("src/assets/audios/hit.mp3"),
            new Audio("src/assets/audios/hit.mp3"),
        ];

        // Sons para a explosão e para a troca de nível.
        this.explosionSound = new Audio("src/assets/audios/explosion.mp3");
        this.nextLevelSound = new Audio("src/assets/audios/next_level.mp3");

        // Sons adicionais
        this.themeSound = new Audio("src/assets/audios/theme.mp3");  // Som do tema do jogo       
        this.startSound = new Audio("src/assets/audios/start.mp3");  // Som de início do jogo
        this.victorySound = new Audio("src/assets/audios/victory.mp3");  // Som de vitória
        this.heartSound = new Audio("src/assets/audios/heart.mp3");  // Som de vida
        this.powerUpSound = new Audio("src/assets/audios/power-up.mp3");  // Som de power-up
        this.gameOverSound = new Audio("src/assets/audios/game-over.mp3"); // Som game over

        // Controla a sequência dos sons de disparo e acerto.
        this.currentShootSound = 0;  // Indica qual som de disparo está sendo tocado.
        this.currentHitSound = 0;    // Indica qual som de acerto está sendo tocado.

        // Ajusta o volume dos efeitos sonoros.
        this.adjustVolumes();
    }

    // Método para tocar um som de disparo.
    playShootSound() {
        // Reseta o tempo de reprodução para o início.
        this.shootSounds[this.currentShootSound].currentTime = 0;
        this.shootSounds[this.currentShootSound].play();  // Toca o som de disparo.
        
        // Atualiza o índice do som de disparo atual, alternando entre os sons.
        this.currentShootSound = (this.currentShootSound + 1) % this.shootSounds.length;
    }

    // Método para tocar um som de acerto.
    playHitSound() {
        // Reseta o tempo de reprodução para o início.
        this.hitSounds[this.currentHitSound].currentTime = 0;
        this.hitSounds[this.currentHitSound].play();  // Toca o som de acerto.

        // Atualiza o índice do som de acerto atual, alternando entre os sons.
        this.currentHitSound = (this.currentHitSound + 1) % this.hitSounds.length;
    }

    // Método para tocar o som de explosão.
    playExplosionSound() {
        this.explosionSound.play();  // Toca o som de explosão.
    }

    // Método para tocar o som da troca de nível.
    playNextLevelSound() {
        this.nextLevelSound.play();  // Toca o som de próximo nível.
    }

    // Toca o som do tema
    playThemeSound() {
        this.themeSound.play();
    }

    stopThemeSound() {
        this.themeMusic.pause();  // Pausa a música
        this.themeMusic.currentTime = 0;  // Reseta a posição da música para o início
    }

    // Toca o som de início
    playStartSound() {
        this.startSound.play();
    }

    // Toca o som de vitória
    playVictorySound() {
        this.victorySound.play();
    }

    // Toca o som de vida
    playHeartSound() {
        this.heartSound.play();
    }

    // Toca o som de power-up
    playPowerUpSound() {
        this.powerUpSound.play();
    }

    // Toca o som de game-over
    playGameOverSound(){
        this.gameOverSound.play();
    }

    // Método para ajustar o volume de todos os efeitos sonoros.
    adjustVolumes() {
        this.hitSounds.forEach((sound) => (sound.volume = 0.2));  // Ajusta o volume dos sons de acerto.
        this.shootSounds.forEach((sound) => (sound.volume = 0.5));  // Ajusta o volume dos sons de disparo.
        this.explosionSound.volume = 0.2;  // Ajusta o volume do som de explosão.
        this.nextLevelSound.volume = 0.4;  // Ajusta o volume do som de troca de nível.
        this.themeSound.volume = 0.1;  // Ajuste o volume do tema, se necessário
        this.startSound.volume = 0.5;  // Ajuste o volume do som de início
        this.victorySound.volume = 0.5;  // Ajuste o volume da vitória
        this.heartSound.volume = 0.4;  // Ajuste o volume da vida
        this.powerUpSound.volume = 0.4;  // Ajuste o volume do power-up
        this.gameOverSound.volume = 0.4; // Ajuste o volume do game over
    }
}

export default SoundEffects;
