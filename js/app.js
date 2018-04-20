
class Card {

    constructor(symbolClass) {
        this.symbolClass = symbolClass;

        const li = document.createElement('li');
        li.classList.add('card');
        const i = document.createElement('i');
        i.classList.add('fa');
        i.classList.add(symbolClass);
        li.appendChild(i);
        this.htmlElement = li;
    }

    isOpen() {
        return this.htmlElement.className.includes('open');
    }

    match() {
        this.htmlElement.classList.add('match');
    }

    matches(card) {
        return this.symbolClass === card.symbolClass;
    }

    isMatched() {
        return this.htmlElement.className.includes('match');
    }

    hide() {
        this.htmlElement.classList.remove('show');
        this.htmlElement.classList.remove('open');
    }
}


/*
 * Create a list that holds all of your cards
 */

let cards = new Array();
const symbolClasses = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];
symbolClasses.forEach(symbolClass => {
    cards.push(new Card(symbolClass));
    cards.push(new Card(symbolClass));
});


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

cards = shuffle(cards);

const cardsContainer = document.getElementsByClassName('deck')[0]; // <ul>
cards.forEach(card => {
    cardsContainer.appendChild(card.htmlElement);
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


let moveCount = 0;
const moveCountElement = document.getElementsByClassName('moves')[0];

cardsContainer.addEventListener('click', event => {
    if (allCardsMatched()) {
        return;
    }

    event.target.classList.add('show');
    event.target.classList.add('open');

    if (numberOfOpenCards() % 2 == 0) {
        moveCount++;
        renderMoveCount();

        evaluateMatch();

        if (allCardsMatched()) {
            console.log("You won");
        }
    }
});

function allCardsMatched() {
    return cards.filter(card => !card.isMatched()).length == 0;
}

function numberOfOpenCards() {
    return cards.filter(card => card.isOpen()).length;
}

function renderMoveCount() {
    moveCountElement.textContent = moveCount;
}

function evaluateMatch() {
    const openCardsNotMatched = cards.filter(card => card.isOpen() && !card.isMatched());
    const card1 = openCardsNotMatched[0];
    const card2 = openCardsNotMatched[1];
    if (card1.matches(card2)) {
        card1.match();
        card2.match()
    } else {
        setTimeout(() => {
            card1.hide();
            card2.hide();
        }, 800);
    }
}
