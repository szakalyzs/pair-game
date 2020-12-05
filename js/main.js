'use strict';

const icons = ['<i class="fa fa-birthday-cake" aria-hidden="true"></i>', '<i class="fa fa-motorcycle" aria-hidden="true"></i>', '<i class="fa fa-car" aria-hidden="true"></i>', '<i class="fa fa-tree" aria-hidden="true"></i>', '<i class="fa fa-futbol-o" aria-hidden="true"></i>'];
const iconsTwice = icons.concat(icons);

function shuffle() {
    const myArr = [];
    const mySet = new Set();
    let randNum;
    for (let i = 0; i < 10; i++) {
        do {
            randNum = Math.floor(Math.random() * 10);
        } while (mySet.has(randNum));
        mySet.add(randNum);
        myArr.push(randNum);
    }
    return myArr;

}


const cards = [];
const clickedCards = [];

(function cardsArrInit() {
    const randArr = shuffle();
    for (let i = 0; i < 10; i++) {
        cards.push({ iconNum: randArr[i], clickAble: true });
    }
})();

(function cardInit() {
    const cardFrontArr = document.querySelectorAll('.card__face--front');
    for (let i = 0; i < cardFrontArr.length; i++) {
        cardFrontArr[i].insertAdjacentHTML('beforeend', iconsTwice[cards[i].iconNum]);
    }
})();

const cardArr = document.querySelectorAll('.card');

(function cardClick() {
    for (let i = 0; i < cardArr.length; i++) {
        cardArr[i].addEventListener('click', () => {
            cardArr[i].classList.toggle('is-flipped');
            setTimeout(() => {
                checkHit(i);
            }, 800);
        });
       
    }
})();

function checkHit(cardNum) {
    if (clickedCards.length < 2) {
        clickedCards.push(cardNum);
    }
    if (clickedCards.length == 2) {
        if (Math.abs(cards[clickedCards[0]].iconNum - cards[clickedCards[1]].iconNum) == 5) {
            
 
        } else {
            cardArr[clickedCards[0]].classList.toggle('is-flipped');
            cardArr[clickedCards[1]].classList.toggle('is-flipped');
        }
        clickedCards.length = 0;
    }
}