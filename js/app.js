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
}

/* Compare html of the first card and second card in the list */
function compareCards(openCards){
  if (openCards.length === 2){
    var itemOne = openCards[0].html();
    var itemTwo = openCards[1].html();
    if (itemOne == itemTwo){
      match();
    } else {
      setTimeout(noMatch, 1000); //Run resetTurn cards after 1 sec if no match
    }
    increaseMove();
  }
}

/* Set event listener on .card to monitor click. When clicked, open card and show icon, add it to the list, check if 2 cards are matching.
$(".card").click("li", function(evt){
  openAndShow(evt);
  addToList(evt);
  compareCards(openCards);
});
*/

/* Remove star every 20 seconds */

function removeStars(timeSpent, starLeft){
  if(timeSpent === 20){
    $(".stars i").eq(-1).removeClass("fa-star").addClass("fa-star-o"); //Change star to outline
    console.log(timeSpent);
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
  var starLeft = 3;
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
    $('.score-panel').html($('.score-panel').html().replace('Moves','Move')); //Handle singular/Plural change
  }if(totalMove == 2){
    $('.score-panel').html($('.score-panel').html().replace('Move',' Moves'));
  }
}


function reset(){
  totalMove = 0;
  $(".moves").text(totalMove);
  $('.score-panel').html($('.score-panel').html().replace('Moves','Move')); // reset total move taken
};


// start game
$(document).ready(function(){
  reset();

  startTimer();

  $(".restart").click("div", function(){
    location.reload();
  });
});

$(".card").click("li", function(evt){
  openAndShow(evt);
  addToList(evt);
  compareCards(openCards);
});
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
