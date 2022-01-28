var SUITS = ['diamonds', 'clubs', 'hearts', 'spades'];

function getScoreByRank(rank) {
    return (rank === 1 || rank === 11 || rank === 12 || rank === 13)
        ? 10 : rank;
}

function buildDeck() {
    var allCards = [];
    
    SUITS.forEach((suit) => {
        for (let rank = 1; rank <= 13; rank++) {
            var card = {
                rank,
                suit,
                score: getScoreByRank(rank),
                name: `${rank}_of_${suit}`,
                source: `images/${rank}_of_${suit}.png`,
            };
            
            allCards.push(card);
        }
    });
    
    return allCards;
}

var official_cards = buildDeck();

var Player = {
    name: 'Player',
    cards: [],
    containerId: 'player-hand',
    counterId: 'counter-cards-player'
};

var Dealer = {
    name: 'Dealer',
    cards: [],
    containerId: 'dealer-hand',
    counterId: 'counter-cards-dealer'
};

function updateCounter() {
    var element = document.getElementById('counter-cards');
    element.innerHTML = `Cards left: ${official_cards.length}`;
}

function calculatePoints(participant) {
    return participant.cards.reduce(
        (acc, card) => acc + card.score,
        0,
    );
}

function checkBust(){
    var playerPoints = calculatePoints(Player);
    var DealerPoints = calculatePoints(Dealer);
    var msgs = "";

    if (playerPoints > 21) {
        msgs += `${Player.name} is busted!`;
    }
    if (DealerPoints > 21) {
        msgs += `${Dealer.name} is busted!`;
    }
    var element = document.getElementById('messages');
    element.innerHTML = ` ${msgs}`;


}

function render(participant) {
    var deckElement = document.getElementById(participant.containerId);
    deckElement.innerHTML = "";

    var counterElement = document.getElementById(participant.counterId);
    counterElement.innerHTML =`Participant-name: ${participant.name} has ${calculatePoints(participant)}`;
    
    for (let index = 0; index < participant.cards.length; index++) {
        var obj = participant.cards[index];
        deckElement.innerHTML += `<img src="${obj.source}" alt="${obj.name}"> `;
    }
}





function shuffleDeck() {
    official_cards.sort(() => Math.random() - 0.5);
}

function addCard(participant) {

    participant.cards.push(official_cards.shift());
    render(participant);
}

function deal() {
    shuffleDeck();
    addCard(Player);
    addCard(Dealer);
    addCard(Player);
    addCard(Dealer);
    updateCounter()
    checkBust()
    winner()
}

function hit() {
    addCard(Player);
    addCard(Dealer);
    updateCounter()
    checkBust()
    winner()
}

function stand(){
    addCard(Dealer); 
    winner()
}

var dealButton = document.getElementById('deal-button');
dealButton.addEventListener('click', deal);

var hitButton = document.getElementById('hit-button');
hitButton.addEventListener('click', hit);

updateCounter();

var standButton = document.getElementById('stand-button');
standButton.addEventListener('click', stand);




function winner(){
var playerPoints = calculatePoints(Player);
    var DealerPoints = calculatePoints(Dealer);
    var msgs = "";

    if (playerPoints > 21) {
        msgs += `${Dealer.name} is the winner `;
    }
    if (DealerPoints > 21) {
        msgs += `${Player.name} is the winner `;
    }
    var element = document.getElementById('determine-the-winner');
    element.innerHTML = ` ${msgs}`;
}

function reset(){
    var restarButton = document.querySelector("restart");
    restarButton.innerHTML="";
}

var reset1 = document.querySelector("restart")
reset1.addEventListener('click', reset);







