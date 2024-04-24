const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d');

let palavraCount = 0;
let listWord = ['pink','yellow','black','white','green'] 
let mover = 0;
let run = false;
function palavraAtual(listWord){
    if(mover == canvas.width+listWord[palavraCount].length || listWord[palavraCount] == palavraEscrita){
        ++palavraCount;
        if(palavraCount == listWord.length){
            palavraCount = 0
        }
        mover = 0;
        palavraEscrita = ''
        
    }
    return listWord[palavraCount];
}
function Desenhar() {   
    ctx.beginPath()
    ctx.font = "24px serif";
    ctx.fillStyle = 'white'
    ctx.fillText(palavraAtual(listWord), mover, canvas.height/2);

    corrigirCaracter(palavraAtual(listWord),mover);
    ++mover;
}
function menu(){
    ctx.beginPath()
    ctx.font = "24px serif";
    ctx.fillStyle = 'white'
    ctx.textBaseline = 'middle'
    ctx.fillText('start',450,canvas.height/2);

    corrigirCaracter('start',450)

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
    mostrarInput()
    if(run){
        Desenhar();
    }else{
        menu()
    }
}

function corrigirCaracter(palavra,posX,posY){
    ctx.beginPath()    
    ctx.font = "24px serif";
    if(palavraEscrita.length){
        for(let i = 0; i < palavraEscrita.length;++i){
            if(palavra.charAt(i) == palavraEscrita.charAt(i)){
                ctx.fillStyle = 'green';   
                ctx.fillText(palavraEscrita, posX, canvas.height/2);
            }else{
                ctx.fillStyle = 'red';
                ctx.fillText(palavraEscrita, posX, canvas.height/2);
                break;
            }
            
        }
    }

}
Iniciar()

let palavraEscrita = ''
function mostrarInput(){
    ctx.beginPath()
    ctx.font = "24px serif";
    ctx.fillStyle = 'white';
    ctx.fillText(palavraEscrita, 400, 390);
}

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
    }if('1' == event.key){
        palavraEscrita = '';
    }
})
