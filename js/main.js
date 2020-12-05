'use strict';

(function cardClick() {
    let cardBoxes = document.querySelectorAll('.card');
    for (let i = 0; i < cardBoxes.length; i++) {
        cardBoxes[i].addEventListener('click', () => {
            cardBoxes[i].setAttribute('class','card--face');
            cardBoxes[i].textContent = i;
        });
        
    }
})();