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

/* Remove star every 20 seconds */
var starLeft = "3 stars";

function removeStars(timeSpent, starLeft){

  if(timeSpent === 20){
    $(".stars i").eq(-1).removeClass("fa-star").addClass("fa-star-o"); //Change star to outline
    starLeft = "2 stars";
    $(".starLeft").text(starLeft);
  }if(timeSpent === 40){
    $(".stars i").eq(-2).removeClass("fa-star").addClass("fa-star-o");
    starLeft = "1 star";
    $(".starLeft").text(starLeft);
  }if(timeSpent === 60){
    $(".stars i").eq(-3).removeClass("fa-star").addClass("fa-star-o");
    starLeft = "0 star";
    $(".starLeft").text(starLeft);
  }
}

/* Count seconds and then call removeStars */
var startTimer = function(){
  $(".card").off("click", startTimer);//remove event listener for start timer
  var timeSpent = 0;
  var gameTime = setInterval(function() {
    timeSpent += 1;
    console.log(timeSpent);
    calculateTime(timeSpent);
    removeStars(timeSpent, starLeft);
    if (numberOfMatch === 8){
      clearInterval(gameTime); //End timer
      $(".modal").css("display", "block"); //display modal
    }
  }, 1000);
}


//display time spent in minutes and seconds
function calculateTime(timeSpent){
  var minutesText = "min";
  var secondsText = "sec";
  var minutesNumber = Math.floor(timeSpent / 60);
  var secondsNumber = timeSpent - minutesNumber * 60;

  if (minutesNumber === 1 || minutesNumber === 0){
    minutesText = "min";
  }else{
    minutesText = "mins";
  }

  if(secondsNumber === 1 || secondsNumber === 0){
    secondsText = "sec";
  }else{
    secondsText = "secs";
  }

  timeSpent = String(minutesNumber) + " " + minutesText + " " + String(secondsNumber) + " " + secondsText;

  $(".timeSpent").text(timeSpent);

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
  // reset total move taken
  totalMove = 0;
  $(".moves").text(totalMove);
  $('.moveText').text("Move");
  $(".deck").children("*").removeClass("match open show"); //hide all cards
};


function setReloadTriggar(){
  // set event listener for reload button
  $(".restart").click("div", function(){
  location.reload();
  });
}

$(document).ready(function(){
  // start game
  reset();
  setReloadTriggar();
});

$(".card").on("click", startTimer); //start timer on click

$(".card").click("li", function(evt){
  // open a card on click, and add to the list to check if 2 cards are matched.
  openAndShow(evt);
  addToList(evt);
});
