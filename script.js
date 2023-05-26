const playBoard=document.querySelector(".playboard");
const scoreElement=document.querySelector(".score");

const highscoreElement=document.querySelector(".high-score");




let gameover=false;
let foodX=13,foodY=10;
let snakeX=5,snakeY=10;
let velocityX=0,velocityY=0;
let snakebody=[];
let setIntervalId;
let score=0;
let highscore=localStorage.getItem("high-score")||0;
const audio3=new Audio("gameendedeffect.mp3");
const audio4=new Audio("touchaudio.mpeg");

function play()
{
    audio4.play();


const changeFoodPosition = () =>
{
    foodX=Math.floor(Math.random()* 30)+1;
    foodY=Math.floor(Math.random()*30)+1;

}

const handleGameOver =()=>
{
    audio3.play();
    clearInterval(setIntervalId);
    location.reload();
    alert("Game Ended Press Ok to replay....");
    
    
}

const changeDirection =(e) =>
{
   if(e.key==='ArrowUp' && velocityY!=1)
   {
    velocityX=0;
    velocityY=-1
   }
   else if(e.key==="ArrowDown" && velocityY!=-1)
   {
    velocityX=0;
    velocityY=1;
   }
   else if(e.key==="ArrowLeft" && velocityX!=1)
   {
    velocityX=-1;
    velocityY=0;
   }
   else if(e.key==="ArrowRight" && velocityX!=-1)
   {
    velocityX=1;
    velocityY=0;
   }
   initGame();
   
   
}

const initGame=()=>
{
    if(gameover) return handleGameOver();

    let htmlMarkup=`<div class="food" style="grid-area: ${foodY} / ${foodX} "></div>`;

    if(snakeX === foodX &&snakeY==foodY)
    {
        changeFoodPosition();
        var audio=new Audio("audiosound.mp3");
        audio.play();
        snakebody.push([foodX,foodY]);
        score++;

        highscore=score>highscore?score:highscore;
        localStorage.setItem("high-score",highscore);

        scoreElement.innerText=`Score: ${score}`;
        highscoreElement.innerText=`High-Score: ${highscore}`;
    }


     for(let i=snakebody.length-1;i>0;i--)
     {
        snakebody[i]=snakebody[i-1];
     }
    snakebody[0]=[snakeX,snakeY];

    snakeX+=velocityX;
    snakeY+=velocityY;

    if(snakeX<=0||snakeX>30 ||snakeY<=0 ||snakeY>30)
    {
        audio3.play();
        gameover=true;
       
    }

    for (let i = 0; i < snakebody.length; i++) {
        htmlMarkup+=`<div class="head" style="grid-area: ${snakebody[i][1]} / ${snakebody[i][0]} "></div>`;
        if(i !== 0 &&snakebody[0][1] === snakebody[i][1] && snakebody[0][0] === snakebody[i][0])
        {
            gameover=true;
            

        }
        
    }
     


    playBoard.innerHTML=htmlMarkup;
}

//changeFoodPosition();

setIntervalId=setInterval(initGame(),130);

document.addEventListener("keydown",changeDirection);

}