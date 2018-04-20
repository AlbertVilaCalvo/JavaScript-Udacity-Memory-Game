
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

        this.matched = false
    }

    isOpen() {
        return this.htmlElement.className.includes('open')
    }

    match() {
        this.matched = true;
    }

    isMatched() {
        return this.matched;
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


const openCards = new Array();

cardsContainer.addEventListener('click', event => {
    event.target.classList.add('show');
    event.target.classList.add('open');
    if (numberOfOpenCards(cards) % 2 == 0) {
        evaluateMatch();
    }
});

function numberOfOpenCards(cards) {
    return cards.filter(card => card.isOpen()).length;
}

function evaluateMatch() {
    const openCardsNotMatched = cards.filter(card => card.isOpen() && !card.isMatched());
    const openCard1 = openCardsNotMatched[0];
    const openCard2 = openCardsNotMatched[1];
    if (openCard1.symbolClass === openCard2.symbolClass) {
        openCard1.match();
        openCard2.match()
    } else {
        setTimeout(() => {
            openCard1.htmlElement.classList.remove('show');
            openCard1.htmlElement.classList.remove('open');
            openCard2.htmlElement.classList.remove('show');
            openCard2.htmlElement.classList.remove('open');
        }, 800);
    }
}
