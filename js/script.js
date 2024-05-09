
class CanvasGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.wordIndex = 0;
        this.wordPositionX = 0;
        this.words;
        this.isRunning = false;
        this.typedWord = '';
        this.speed = 10;
        this.i = 1;
        fetch('../js/words.json')
            .then(res => res.json())
            .then(data => {
                this.words = data.listWord
            })
        this.init();
    }

    init() {
        this.addEventListeners();
        this.intervalId = setInterval(() => this.update(), this.speed);
    }

    addEventListeners() {
        document.addEventListener("keydown", (event) => this.handleKeyDown(event));
    }

    startMenu() {
        this.drawTextTyping('start', 450, this.canvas.height / 2);
        this.checkTypedWord('start', 450)
        if (this.typedWord === 'start') {
            this.isRunning = true;
            this.typedWord = '';
        }
    }

    drawTextTyping(text, x, y, color = 'white') {
        this.ctx.beginPath();
        this.ctx.font = "24px serif";
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x, y);
    }

    drawWord() {
        const currentWord = this.words[this.wordIndex];
        this.drawTextTyping(currentWord, this.wordPositionX, this.canvas.height / 2);
        this.checkTypedWord(currentWord, this.wordPositionX);
        this.wordPositionX+= this.i;
        if (this.wordPositionX === this.canvas.width + currentWord.length || currentWord === this.typedWord) {
            if(currentWord !== this.typedWord) this.gameOver();
            this.i +=0.5;
            this.resetVariables();
        }
    }

    checkTypedWord(word, wordPositionX) {
        for (let i = 0; i < this.typedWord.length; ++i) {
            if (word.charAt(i) !== this.typedWord.charAt(i)) {
                this.ctx.fillStyle = 'red';
                break;
            } else {
                this.ctx.fillStyle = 'green';
            }
        }
        this.ctx.beginPath();
        this.ctx.font = "24px serif";
        this.ctx.fillText(this.typedWord, wordPositionX, this.canvas.height / 2);
    }

    clearCanvas() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    gameOver(){
         this.startMenu()
         this.isRunning = false
         this.i = 1;  
    }
    resetVariables(){
        this.wordIndex = (this.wordIndex + 1) % this.words.length;
        this.wordPositionX = 0;
        this.typedWord = '';
        
    }

    handleKeyDown(event) {
        if (/^[a-zA-Z]$/.test(event.key)) {
            this.typedWord += event.key;
        }
        if (event.key === 'Backspace') {
            this.typedWord = this.typedWord.slice(0, this.typedWord.length - 1);
        }
        if (event.key === ' ') {
            this.typedWord += ' ';
        }
        if (event.key === '1') {
            this.typedWord = '';
        }
    }
    
    update() {
        this.clearCanvas();
        if (this.isRunning) {
            this.drawWord();
        } else {
            this.startMenu();
        }
    }
}

const game = new CanvasGame('canvas');
