let blackjackGame = {
  you: {
    scoreSpan: "#your-blackjack-result",
    div: "#your-box",
    boxSize: ".flex-blackjack-row-2 div",
    score: 0,
  },

  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    boxSize: ".flex-blackjack-row-2 div",
    score: 0,
  },

    cards: ["1_of_clubs"	,
    "1_of_diamonds"	,
    "1_of_hearts"	,
    "1_of_spades"	,
    "2_of_clubs"	,
    "2_of_diamonds"	,
    "2_of_hearts"	,
    "2_of_spades"	,
    "3_of_clubs"	,
    "3_of_diamonds"	,
    "3_of_hearts"	,
    "3_of_spades"	,
    "4_of_clubs"	,
    "4_of_diamonds"	,
    "4_of_hearts"	,
    "4_of_spades"	,
    "5_of_clubs"	,
    "5_of_diamonds"	,
    "5_of_hearts"	,
    "5_of_spades"	,
    "6_of_clubs"	,
    "6_of_diamonds"	,
    "6_of_hearts"	,
    "6_of_spades"	,
    "7_of_clubs"	,
    "7_of_diamonds"	,
    "7_of_hearts"	,
    "7_of_spades"	,
    "8_of_clubs"	,
    "8_of_diamonds"	,
    "8_of_hearts"	,
    "8_of_spades"	,
    "9_of_clubs"	,
    "9_of_diamonds"	,
    "9_of_hearts"	,
    "9_of_spades"	,
    "10_of_clubs"	,
    "10_of_diamonds"	,
    "10_of_hearts"	,
    "10_of_spades"	,
    "11_of_clubs"	,
    "11_of_diamonds"	,
    "11_of_hearts"	,
    "11_of_spades"	,
    "12_of_clubs"	,
    "12_of_diamonds"	,
    "12_of_hearts"	,
    "12_of_spades"	,
    "13_of_clubs"	,
    "13_of_diamonds"	,
    "13_of_hearts"	,
    "13_of_spades"	,
    
    ],

  cardsMap: {"1_of_clubs":1,
  "1_of_diamonds":1,
  "1_of_hearts":1,
  "1_of_spades":1,
  "2_of_clubs":2,
  "2_of_diamonds":2,
  "2_of_hearts":2,
  "2_of_spades":2,
  "3_of_clubs":3,
  "3_of_diamonds":3,
  "3_of_hearts":3,
  "3_of_spades":3,
  "4_of_clubs":4,
  "4_of_diamonds":4,
  "4_of_hearts":4,
  "4_of_spades":4,
  "5_of_clubs":5,
  "5_of_diamonds":5,
  "5_of_hearts":5,
  "5_of_spades":5,
  "6_of_clubs":6,
  "6_of_diamonds":6,
  "6_of_hearts":6,
  "6_of_spades":6,
  "7_of_clubs":7,
  "7_of_diamonds":7,
  "7_of_hearts":7,
  "7_of_spades":7,
  "8_of_clubs":8,
  "8_of_diamonds":8,
  "8_of_hearts":8,
  "8_of_spades":8,
  "9_of_clubs":9,
  "9_of_diamonds":9,
  "9_of_hearts":9,
  "9_of_spades":9,
  "10_of_clubs":10,
  "10_of_diamonds":10,
  "10_of_hearts":10,
  "10_of_spades":10,
  "11_of_clubs":10,
  "11_of_diamonds":10,
  "11_of_hearts":10,
  "11_of_spades":10,
  "12_of_clubs":10,
  "12_of_diamonds":10,
  "12_of_hearts":10,
  "12_of_spades":10,
  "13_of_clubs":10,
  "13_of_diamonds":10,
  "13_of_hearts":10,
  "13_of_spades":10,
  
  },

  wins: 0,
  losses: 0,
  draws: 0,
  isStand: false,
  isTurnsOver: false,
  pressOnce: false,
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];
let windowWidth = window.screen.width;
let windowHeight = window.screen.height;
let winner;

//Button Event Listeners
document
  .querySelector("#blackjack-hit-button")
  .addEventListener("click", blackjackHit);
document
  .querySelector("#blackjack-stand-button")
  .addEventListener("click", blackjackStand);
document
  .querySelector("#blackjack-deal-button")
  .addEventListener("click", blackjackDeal);
document
  .querySelector("#blackjack-reset-button")
  .addEventListener("click", blackjackRestart);

function blackjackHit() {
  if (blackjackGame["isStand"] === false) {
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
  }
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 52);
  return blackjackGame["cards"][randomIndex];
}

function showCard(card, activePlayer) {
  if (activePlayer["score"] <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `images/${card}.png`;
    cardImage.style = `width:${widthSize()}; height:${heightSize()};`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
  
  }
}

function widthSize() {
  if (windowWidth > 1000) {
    let newWidthSize = window.screen.width * 0.06;
    return newWidthSize;
  } else {
    return window.screen.width * 0.18;
  }
}

function heightSize() {
  if (windowHeight > 700) {
    let newHeightSize = window.screen.height * 0.10;
    return newHeightSize;
  } else {
    return window.screen.height * 0.15;
  }
}

function updateScore(card, activePlayer) {
  if (card === "A") {
    if (activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21) {
      activePlayer["score"] += blackjackGame["cardsMap"][card][1];
    } else {
      activePlayer["score"] += blackjackGame["cardsMap"][card][0];
    }
  } else {
    activePlayer["score"] += blackjackGame["cardsMap"][card];
  }

  console.log(activePlayer["score"]);
}

function showScore(activePlayer) {
  //Bust logic if score is over 21
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}

function blackjackStand() {
  if (blackjackGame.pressOnce === false) {
    blackjackGame["isStand"] = true;
    let yourImages = document
      .querySelector("#your-box")
      .querySelectorAll("img");

    for (let i = 0; i < yourImages.length; i++) {
      let card = randomCard();
      showCard(card, DEALER);
      updateScore(card, DEALER);
      showScore(DEALER);
    }

    blackjackGame["isTurnsOver"] = true;

    computeWinner();
    showWinner(winner);
  }

  blackjackGame.pressOnce = true;
}

function computeWinner() {
  if (YOU["score"] <= 21) {
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      winner = YOU;
    } else if (YOU["score"] < DEALER["score"]) {
      winner = DEALER;
    } else if (YOU["score"] === DEALER["score"]) {
      winner = "Draw";
    }
  } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    winner = DEALER;
  } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
    winner = "None";
  }

  return winner;
}

function showWinner(winner) {
  let message;

  if (winner === YOU) {
    message = "You Won";
  
    
  } else if (winner === DEALER) {
    message = "You Lost";
    
    
  } 

  document.querySelector("#blackjack-result").textContent = message;
 
}

function blackjackDeal() {
  if (blackjackGame["isTurnsOver"] === true) {
    // Select all the images in both the user and dealer box
    let yourImages = document
      .querySelector("#your-box")
      .querySelectorAll("img");
    let dealerImages = document
      .querySelector("#dealer-box")
      .querySelectorAll("img");

    document.querySelector("#blackjack-result").style.color = "white";

    //Sets the user and dealers scors to zero
    YOU["score"] = DEALER["score"] = 0;
    document.querySelector("#your-blackjack-result").textContent = 0;
    document.querySelector("#dealer-blackjack-result").textContent = 0;
   
    //Removes the cards in the user's box
    for (let i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
      dealerImages[i].remove();
    }

    blackjackGame["isStand"] = false;
    blackjackGame.pressOnce = false;
    blackjackGame["isTurnsOver"] = false;
  }
}

function blackjackRestart() {
  blackjackDeal();
}