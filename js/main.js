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
let timeCounting;
let clickCount = 0;

function stopper() {
    let timeCounter = 0;
    timeCounting = setInterval(() => {
        timeCounter += 1;
        
        displayStopper(timeCounter);
    }, 1000);
}

function displayStopper(counter) {
    const minutes = Math.floor(counter / 60);
    const seconds = counter % 60;
    const clock = document.querySelector('.clock');
    clock.textContent = `${minutes < 10 ? `0${minutes}` : `${minutes}`}:${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
}


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
            clickCount += 1;
            if (clickCount == 1) {
                stopper();
            }
            if(cards[i].clickAble) {
                cardArr[i].classList.toggle('is-flipped');
                setTimeout(() => {
                    checkHit(i);
                    checkOver();
                }, 800);

            }
            
        });   
    }
})();

function checkHit(cardNum) {
    if (clickedCards.length < 2) {
        clickedCards.push(cardNum);
    }
    if (clickedCards.length == 2) {
        if (Math.abs(cards[clickedCards[0]].iconNum - cards[clickedCards[1]].iconNum) == 5) {
            cards[clickedCards[0]].clickAble = false;
            cards[clickedCards[1]].clickAble = false;
 
        } else {
            cardArr[clickedCards[0]].classList.toggle('is-flipped');
            cardArr[clickedCards[1]].classList.toggle('is-flipped');
        }
        clickedCards.length = 0;
    }
}

function checkOver() {
    if (cards.every(item => item.clickAble == false)) {
        clearInterval(timeCounting);
        setTimeout(() => {
            cardArr.forEach(item => item.classList.toggle('is-flipped'));
            setTimeout(() => { location.reload() }, 700);
                }, 4300);
    }
}