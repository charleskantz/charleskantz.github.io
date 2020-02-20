window.onload = function(){

    // CARD SHUFFLING

    var cardBG = [ // class names to be used for card BGs and pair checking
        'l', 'l',
        'll', 'll', // each class appears twice so the match can occur
        'lll', 'lll', 
        'llll', 'llll',
        'lllll', 'lllll',
        'llllll', 'llllll',
        'lllllll', 'lllllll',
        'llllllll', 'llllllll'
    ];

    function shuffleCards(){
        var cards = document.querySelectorAll('.game-card-inner'); // collect all blank cards for shuffle
        for(let i = cards.length - 1; i > 0; i--){ // shuffle array with class names
            let j = Math.floor(Math.random() * i);
            let temp = cardBG[i];
            cardBG[i] = cardBG[j];
            cardBG[j] = temp;
        }
        for(let i = 0; i < cards.length; i++){ // apply randomized class name to each card
            cards[i].classList.add(cardBG[i]);
        }

    }   

    
    // CARD FLIPPING

    var cardsFlipped = 0;
    var cardOne, cardTwo;
    var matches = 0;

    var gameArea = document.querySelector('.game-container'); 
    gameArea.addEventListener('click', function(e){    // listen for clicks on cards
        if(e.target.className === 'game-card' || e.target.className === 'game-card is-flipped'){
            e.target.classList.toggle('is-flipped'); // activate the card flip
            countScore();
            cardsFlipped++; // count to determine if 1 or 2 cards have been flipped
            e.target.style.pointerEvents = 'none';
            if(cardsFlipped === 1){
                e.target.setAttribute("id", "card-one");
                cardOne = document.querySelector('#card-one').firstChild; // store card info for later comparison
            }
            if(cardsFlipped === 2){
                e.target.setAttribute("id", "card-two");
                cardTwo = document.querySelector('#card-two').firstChild;
                if(cardOne.className === cardTwo.className){ // compare the two cards
                    matches++;
                    cardOne.parentElement.removeAttribute('id');
                    cardTwo.parentElement.removeAttribute('id');

                    cardsFlipped = 0;
                } else {
                    var noClicky = document.querySelectorAll('.game-card');
                    for(let i = 0; i < noClicky.length; i++){
                        noClicky[i].style.pointerEvents = 'none';
                    }
                    setTimeout(function(){
                        cardOne.parentElement.classList.toggle('is-flipped');
                        cardTwo.parentElement.classList.toggle('is-flipped');
                        cardOne.parentElement.style.pointerEvents = 'auto';
                        cardTwo.parentElement.style.pointerEvents = 'auto';
                        cardOne.parentElement.removeAttribute('id');
                        cardTwo.parentElement.removeAttribute('id');
                        for(let i = 0; i < noClicky.length; i++){
                            noClicky[i].style.pointerEvents = 'auto';
                        }
                        cardsFlipped = 0;
                    }, 750);
                        
                }
                if(matches === 8){
                    checkScore();
                }
            }
        }
    });

    // SCORE KEEPING

    var currentScore = 0; // number of card turns
    var bestScoreCounter = document.querySelector('.header-score-bestscore');
    bestScoreCounter.innerHTML = localStorage.getItem('best-score'); // best score is stored in localStorage

    function countScore(){
        var score = document.querySelector('.header-score-score'); // update score with new click
        currentScore++;
        score.innerHTML = currentScore;
    }

    function checkScore(){
        if(currentScore < localStorage.getItem('best-score')){ // update best score or just report score
            localStorage.setItem('best-score', currentScore);
            bestScoreCounter.innerHTML = localStorage.getItem('best-score');
            alert('Congratulations! You have the best score with ' + currentScore + '!');
        } else {
            alert('Congratulations! You completed by flipping ' + currentScore + ' cards!');
        }
    }

    // START BUTTON

    var startGame = document.querySelector('button');
    startGame.addEventListener('click', function(){
        gameStarted();
    });

    var gameStart = false;

    function gameStarted(){
        var gameContainer = document.querySelector('.game-container');


        if(gameStart){
            var delCards = document.querySelectorAll('.game-card');
            if(delCards.length > 0){
                for(let k = 16; k > 0; k--){
                    var delItem = gameContainer.firstChild;
                    gameContainer.removeChild(delItem);
                }
            }
            currentScore = 0;
            var score = document.querySelector('.header-score-score');
            score.innerHTML = currentScore;
            startGame.classList.toggle('game-started');
            startGame.innerHTML = 'Start Game';
            gameStart = false;
        } else {
            gameStart = true;
            startGame.classList.toggle('game-started');
            startGame.innerHTML = "End Game";
            var i = 0;
            while(i < 16){ // create cards
                var gameCard = document.createElement('div');
                gameCard.setAttribute('class', 'game-card');
                var gameCardInner = document.createElement('div');
                gameCardInner.setAttribute('class', 'game-card-inner');
                var gameCardOuter = document.createElement('div');
                gameCardOuter.setAttribute('class', 'game-card-outer');
                gameCard.appendChild(gameCardInner);
                gameCard.appendChild(gameCardOuter);
                gameContainer.appendChild(gameCard);
                i++;
            }
            shuffleCards();
        }
    }

}
