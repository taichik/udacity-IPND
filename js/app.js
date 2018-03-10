// Create an array object that holds all of your cards.
var allCards = [];

allCards = $( ".card" ).get();

// Shuffle the order of li.card elements inside allCards.
allCards = shuffle(allCards);

// Add each array card back to ul.deck.
allCards.forEach(function(element){
  $(".deck").append(element);
});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


var openCards = [];
var numberOfMatch = 0;

/* Close last 2 cards */
function noMatch(){
  $(openCards).toggleClass("open show");
  openCards = [];
}

/*lock the card in the open position.*/
function match(){
  $(openCards).toggleClass("open show match");
  openCards = [];
  numberOfMatch += 1;
  }

/* Change card color and show icon  */
function openAndShow(evt){
    $(evt.target).addClass("open show");
}

/*add clicked card to the list */
function addToList(evt){
  openCards.push($(evt.target));
  compareCards();
}

/* Compare html of the first card and second card in the list */
function compareCards(){
  if (openCards.length === 2){
    increaseMove();
    var itemOne = openCards[0].html();
    var itemTwo = openCards[1].html();
    if (itemOne === itemTwo){
      match();
    } else {
      setTimeout(noMatch, 1000); //Run resetTurn cards after 1 sec if no match
    }
  }
}

var starText;
/* Remove star every 20 seconds */
var starLeft = 3;

function removeStars(timeSpent, starLeft, starText){
  if(timeSpent === 20){
    $(".stars i").eq(-1).removeClass("fa-star").addClass("fa-star-o"); //Change star to outline
    starLeft -= 1;
  }if(timeSpent === 40){
    $(".stars i").eq(-2).removeClass("fa-star").addClass("fa-star-o");
    starLeft -= 1;
  }if(timeSpent === 60){
    $(".stars i").eq(-3).removeClass("fa-star").addClass("fa-star-o");
    starLeft -= 1;
  }
}

var gameTime;
/* Count seconds and then call removeStars */
function startTimer(){
  var timeSpent = 0;
  var gameTime = setInterval(function() {
    timeSpent += 1;
    console.log(timeSpent);
    removeStars(timeSpent, starLeft);
    if (numberOfMatch === 8){  //End timer
      console.log(timeSpent);
      console.log("WINNING");
      clearInterval(gameTime);
    }
  }, 1000);
}


/* count the total number of moves taken */
var totalMove = 0;

function increaseMove(){
  totalMove += 1;
  $(".moves").text(totalMove);
  if (totalMove <= 1){
    $('.moveText').text("Move"); //Handle singular/Plural change
  }if(totalMove == 2){
    $('.moveText').text("Moves");  }
}


function reset(){
  totalMove = 0;
  $(".moves").text(totalMove);
  $('.moveText').text("Move"); // reset total move taken
  $(".deck").children("*").removeClass("match open show"); //hide all cards
};

function setReloadTriggar(){
  $(".restart").click("div", function(){
  location.reload();
  });
}

// start game
$(document).ready(function(){
  reset();
  startTimer();
  setReloadTriggar();

});

$(".card").click("li", function(evt){
  openAndShow(evt);
  addToList(evt);
});


function endGame(){
  $(".totalMove").text(totalMove);
  $(".starLeft").text(starLeft);
  $(".starText").text(starText);
}
