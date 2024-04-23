const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d');
console.log(ctx)
const quadrado = ctx;

let palavraCount = 0;
const texto1 = ctx;
const texto2 = ctx;
let listWord = ['pink','yellow','black','white','green'] 
let mover = -listWord[palavraCount].length-50;
let run = false;

function palavraAtual(listWord){
    if(mover == canvas.width+listWord[palavraCount].length || listWord[palavraCount] == palavraEscrita){
        ++palavraCount;
        if(palavraCount == listWord.length){
            palavraCount = 0
        }
        mover = -listWord[palavraCount].length-50;
        palavraEscrita = ''
        
    }
    return listWord[palavraCount];
}
function Desenhar() {
    ctx.beginPath()
    ctx.font = "24px serif";
    ctx.fillStyle = 'white'
    ctx.fillText(palavraAtual(listWord), mover, canvas.height/2);
    
    ctx.beginPath()
    ctx.font = "24px serif";
    ctx.fillStyle = 'white'
    ctx.fillText(palavraEscrita, 400, 390);

    ++mover;
}
function menu(){
    ctx.beginPath()
    ctx.font = "32px serif";
    ctx.fillStyle = 'white'
    ctx.fillText('start', canvas.width/2, canvas.height/2);
    ctx.closePath()
    if(palavraEscrita == 'start'){
        run = true
        palavraEscrita = ''
    }
}
function LimparTela() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

}
function Iniciar() {
    return setInterval(Atualizar, 10);
}
function Atualizar() {
    LimparTela();
    if(run){
        Desenhar();
    }else{
        menu()
    }
}
Iniciar()

let palavraEscrita = ''

document.addEventListener("keydown",(event)=>{
    console.log(event.key)
    if (/^[a-zA-Z]$/.test(event.key)) {
        palavraEscrita += event.key
        console.log(palavraEscrita)   
    }if('Backspace' == event.key){
       palavraEscrita= palavraEscrita.slice(0,palavraEscrita.length-1)
        console.log(palavraEscrita)
    }if(' ' == event.key){
        palavraEscrita += ' ';
    }

})

