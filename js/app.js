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

/* Close last 2 cards */
function noMatch(){
  $(openCards).toggleClass("open show");
  openCards = [];
}

/*lock the card in the open position.*/
function match(){
  $(openCards).toggleClass("open show match");
  openCards = [];
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
      decreaseMoves();
    }
  }
}

/* Set event listener on .card to monitor click. When clicked, open card and show icon, add it to the list, check if 2 cards are matching. */
$(".card").click(function(evt){
  openAndShow(evt);
  addToList(evt);
  compareCards(openCards);

});

var moveLeft = 3;

function decreaseMoves(){
  moveLeft -= 1;
  
  if (moveLeft === 1){
    $(".moves").text(moveLeft);
    $('.score-panel').html($('.score-panel').html().replace('Moves','Move')); //Handle singular/Plural change.

  }else{
    $(".moves").text(moveLeft);
  }
}

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
