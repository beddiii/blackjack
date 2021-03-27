const utility = require('./utility.js');
const readline = require('readline-sync');

//Number of decks
const decks = [1, 2, 4, 6, 8];

//Number of starting fiches
var fiches = 1000;

//Dealer's cards
var dealer = [];
var countDealer = 0;

//User's cards
var user = [];
var countUser = 0;

//Ask for how many decks player want and create the complete deck
var deckNumber = readline.keyInSelect(decks, "How many decks do you want?");
var deck = utility.createDeck(decks[deckNumber]);
console.log(deckNumber);
console.debug(deck.length);

//Shuffle the deck
utility.deckShuffling(deck);
console.log(deck);

//Set the card signal
switch (deckNumber) {

}