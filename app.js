let h2=document.querySelector("h2")
let h3=document.querySelector("h3")
let buttons=document.querySelectorAll(".btn")
let gameover=document.querySelector(".over")
let reset=document.querySelector(".reset")
let high=document.querySelector(".high")

let userseq=[]
let gameseq=[]
let start=false;
let level=0;
let score=[]

let btns=["green","yellow","blue","red"]

document.addEventListener("keypress",()=>{
    if(start===false){
        console.log("game started")
        start=true;
        levelup()
        h3.innerText="";
        gameover.innerText="";
        high.innerText=""
    }
})

function levelup(){
    userseq=[]
    level++;
    let randidx=Math.floor(Math.random()*4)
    let randcolor=btns[randidx];
    let randbtn=document.querySelector(`.${randcolor}`)
    gameflash(randbtn);
    h2.innerText=`level ${level}`;
    gameseq.push(randcolor)
    console.log(gameseq)
}
function gameflash(btn){
    btn.classList.add("flash")
    setTimeout(()=>{
        btn.classList.remove("flash")
    },200)
}
function userflash(btn){
    btn.classList.add("flash")
    setTimeout(()=>{
        btn.classList.remove("flash")
    },260)
}
buttons.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        if(!start)return;
        console.log("btn was clicked")
        userflash(btn);
        let addseq=btn.getAttribute("id")
        userseq.push(addseq)
        console.log(userseq)
        checkseq()
    })
})


function checkseq(){
    let idx=userseq.length-1;
    if(userseq[idx]===gameseq[idx]){
        if(userseq.length===gameseq.length){
            console.log("same value");
            levelup();
        }
    }else{
        console.log("game over");
        gameover.innerText="Game over,start again";
        document.querySelector("body").style.backgroundColor="red"
        setTimeout(()=>{
            document.querySelector("body").style.backgroundColor="white"
        },200)
        resetgame()
    }
}


function resetgame(){
    start=false;
    userseq=[];
    gameseq=[];
    highscore(level)
    h2.innerHTML=`<b>your score is ${level}</b><br/>press any key to start the game`;
    level=0;
}

function highscore(level){
    score.push(level);
    let highest=score.reduce((max,el)=>{
        if(max>el){
            return max;
        }else{
            return el
        }
    })
    high.innerText=`your highest score is ${highest}`
}
