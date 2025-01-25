let resultCount=JSON.parse(localStorage.getItem('resultCount')) || {
    win:0,
    lose:0,
    score:0
};
let computerMOve='';
updateScoreElement();
function computer(){
    const randomNumber=Math.random();
    if(randomNumber>=0 && randomNumber<(1/3)){
        computerMOve='Rock';
    } else if(randomNumber>=(1/3) && randomNumber<(2/3)){
        computerMOve='Paper';
    } else if(randomNumber>=(2/3) && randomNumber<1){
        computerMOve='scissors';
    }
    return computerMOve;
}

const display=document.querySelector('.js-autoPlay-btn');

const autoKey=()=>{
    autoplay();
    if(display.innerText==='Auto Play'){
        display.innerHTML='Stop Playing';
    } else{
        display.innerHTML='Auto Play';
    }
}

display.addEventListener('click',()=>{
    autoKey();
});

let isAutoPlay=false;
let intervalId;
function autoplay(){
    if(!isAutoPlay){
        intervalId=setInterval(()=>{
            const playerMove=computer();
            gameMove(playerMove);
        } ,1600);
        isAutoPlay=true;
    } else{
        clearInterval(intervalId);
        isAutoPlay=false;
    }
}

document.querySelector('.js-Rock-btn').addEventListener('click',()=>{
    gameMove('Rock');
});

document.querySelector('.js-Paper-btn').addEventListener('click',()=>{
    gameMove('Paper');
});

document.querySelector('.js-scissors-btn').addEventListener('click',()=>{
    gameMove('scissors');
});

document.body.addEventListener('keydown',(event)=>{
    if(event.key==='r'){
        gameMove('Rock');
    } else if(event.key==='p'){
        gameMove('Paper');
    } else if(event.key==='s'){
        gameMove('scissors');
    } else if(event.key==='a'){
        autoKey();
    } else if(event.key==='Backspace'){
        gameMove('reset score');
    }
});

document.querySelector('.js-reset-btn').addEventListener('click',()=>{
    gameMove('reset score');
    localStorage.removeItem('resultCount');
    updateScoreElement();
});

function gameMove(playerMove){
    computerMOve=computer();
    let result='';
    if(playerMove==='Rock'){
        if(computerMOve==='Rock'){
            result='Tie';
            resultCount.score+=1;
        } else if(computerMOve==='Paper'){
            result='You lose';
            resultCount.lose+=1;
        } else if(computerMOve==='scissors'){
            result='You Win';
            resultCount.win+=1;
        }
    } else if (playerMove==='Paper'){
        if(computerMOve==='Paper'){
            result='Tie';
            resultCount.score+=1;;
        } else if(computerMOve==='scissors'){
            result='You lose';
            resultCount.lose+=1;
        } else if(computerMOve==='Rock'){
            result='You Win';
            resultCount.win+=1;
        }
    } else if (playerMove==='scissors'){
        if(computerMOve==='scissors'){
            result='Tie';
            resultCount.score+=1;
        } else if(computerMOve==='Rock'){
            result='You lose';
            resultCount.lose+=1;
        } else if(computerMOve==='Paper'){
            result='You Win';
            resultCount.win+=1;
        }
    }else if(playerMove==='reset score'){
        const confirmation=document.querySelector('.js-container');
        confirmation.innerHTML=`<p>Are you sure you want to reset the score? <button class='js-Yes-btn'>Yes</button><button class='js-No-btn'>No</button></p>`;

        document.querySelector('.js-Yes-btn').addEventListener('click',()=>{
            resultCount.score=0;
            resultCount.lose=0;
            resultCount.win=0;
            updateScoreElement();
            document.querySelector('.js-move').innerHTML=`you ${playerMove}`;
            confirmation.innerHTML='';
        });

        document.querySelector('.js-No-btn').addEventListener('click',()=>{
            confirmation.innerHTML='';
        });
    }
    updateScoreElement();
    document.querySelector('.js-result').innerHTML=result;
    if (playerMove==='Rock' || playerMove==='Paper' || playerMove==='scissors'){
        document.querySelector('.js-move').innerHTML=`You <img src="new/images/${playerMove}-emoji.png" class="move-icon">- <img src="new/images/${computerMOve}-emoji.png" class="move-icon"> Computer`;
    }

    localStorage.setItem('resultCount',JSON.stringify(resultCount));
    
}

function updateScoreElement(){
    document.querySelector('.js-score').innerHTML=`Tie:${resultCount.score}  Win:${resultCount.win}  lose:${resultCount.lose}`;
}