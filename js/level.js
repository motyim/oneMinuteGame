window.onload = function (){

//get document vars
  var displayScore   = document.getElementById('score'),
      displayLevel   = document.getElementById('level');
      next           = document.getElementById('next');
      retry          = document.getElementById('retry');

  //get values from cookie
  var saved   = document.cookie.split(';');
  var score   = saved[0].split('=');
  var level   = saved[1].split('=');

  displayScore.innerHTML  = score[1];
  displayLevel.innerHTML  = level[1];

retry.addEventListener('click',retryGame);
next.addEventListener('click',nextGame);


function retryGame(){

  var reLevel = parseInt(level[1]);

  document.cookie ="level= "+(reLevel-1)+";";

  window.location = "game.html";
}

function nextGame(){
  var cLevel = parseInt(level[1]);
  if(cLevel == 1){
      window.location = "game.html";
  }

}


};
