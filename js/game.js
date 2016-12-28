// document vars
var bgNumber      = document.getElementById('bg_number'),
    number        = document.getElementById('number'),
    displayScore  = document.getElementById('score'),
    displayTime   = document.getElementById('time'),
    displayWrong  = document.getElementById('wrong'),
    gameControll  = document.getElementById('gameControll');
    gameFrame     = document.getElementById('gameFrame');
    help          = document.getElementById('help');
// init game vars
var wrong         = 0 ,
    score         = 0 ,
    time          = 60,
    play          = false,
    wrongColor    = '#f44336',
    rightColor    = '#66bb6a',
    normalColor   = '#bbbdc0',
    game ,          //contine interval game
    currentNumber,         //contine current number
    pressed,       //true if user pressed any key for current number
    level ;


var helpLevel = ['Just press on key that appear on circle','press on key that match number - 1 '];

//add Event Listener
gameControll.addEventListener("click", gameStatus);
gameFrame.addEventListener("keypress",pressedNumber);

//start game
startGame();

// controll start & pause game
function gameStatus() {

  if(play){ //game paused
    gameControll.innerHTML = 'Start';
    number.innerHTML ='?';
  }else{ //game continued
    gameControll.innerHTML = 'Pause';
  }
  play = !play;
}



function startGame(){
  var pervNumber = 0;

    try{
      level = document.cookie.split(';')[1].split('=')[1];
      level = parseInt(level);
    }catch(error){
      level=0;
    }

    help.innerHTML = helpLevel[level];
  game = setInterval(function(){

      if(play){

        //handle end of time
        if(time === 0 ){

          var result = Math.floor(score / 60 *100) ;
          //create cookie for result
          document.cookie ="score="+result+";";

          // create cookie for level
          document.cookie ="level= "+(level+1)+";";

          clearInterval(game);
          window.location = "status.html";
        }
        //handle apperence of same number twice
          do {
              currentNumber = generateNumber();
          } while (currentNumber === pervNumber);
          pervNumber = currentNumber ;
          bgNumber.style.backgroundColor = normalColor ;
          number.innerHTML =  currentNumber;
          pressed =false ;
          //set remine time
          displayTime.innerHTML =--time;
      }

   }, 1000);

}

//get number press by user
function pressedNumber(event) {
  var numberPressed = String.fromCharCode(event.which);
  if(!pressed && play){
    if(checkAnwser(numberPressed)){
      pressed = true;
      bgNumber.style.backgroundColor  = rightColor;
      displayScore.innerHTML = ++score;

    }else{
      bgNumber.style.backgroundColor = wrongColor;
      displayWrong.innerHTML  = ++wrong;
    }
    pressed = true;
  }
}

function checkAnwser(numberPressed){

  if(level === 0){

    return numberPressed == currentNumber;
  }else if(level == 1){

    return numberPressed == currentNumber-1;
  }

}

function generateNumber(){
  if(level === 0){

    return Math.floor((Math.random() * 9));
  }else if(level == 1){

    return Math.floor((Math.random() * 10)+1);
  }


}
