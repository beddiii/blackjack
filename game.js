const utility = require('./utility.js');
const readline = require('readline-sync');

//Number of decks
const decks = [1, 2, 4, 6, 8];

//Number of starting fiches
var fiches = 1000;

//Dealer's cards
var dealer = [];
var countDealer = 0;

//Player's cards
var player = [];
var countPlayer = 0;

//Cards pit
var pit = [];
var countPit = 0;

//First selection of actions if cards are not equal
var actionsNoSplit = ["stay", "hit", "double"];

//First selection of actions if cards are not equal
var actionYesSplit = ["stay", "hit", "double", "split"];

//Fir memorize if the first two cards are equal
var equal;

//Select the first action that player do
var firstAction;

//For see if red card is find
var redCardFound = false;

//See if the hand is finish
var handFinish = false;

//Ask for how many decks player want and create the complete deck
var deckNumber = readline.keyInSelect(decks, "How many decks do you want?");
var deck = utility.createDeck(decks[deckNumber]);
console.debug(deck.length);

//Shuffle the deck
utility.deckShuffling(deck);
//console.log(deck);

//Set the card signal
utility.signalCard(deck);
console.log(deck.length);

//Start the game
while (fiches > 10) {
	//Select how much fiches play and give the firsts cards to dealer and player
	start = utility.startHand(fiches, deck, player, countPlayer, dealer, countDealer);
	countPlayer = start.countP;
	countDealer = start.countD;
	redCardFound = start.found;
	fiches = fiches - start.fichesPlayed;

	if (player[0].value === "A" || player[1].value === "A") {
		values = utility.countFirstValue(player, "player");
		console.log("IL VALORE CALCOLATO È: " + values);
		console.log("Player's cards: " + player[0].value + player[0].seeds + " " + player[1].value + player[1].seeds + ". Total: " + values.value1 + "/" + values.value2);
	}
	else {
		console.log("Player's cards: " + player[0].value + player[0].seeds + " " + player[1].value + player[1].seeds + ". Total: " + utility.countFirstValue(player, "player"));
	}

	if (dealer[0].value == "A") {
		values = utility.countFirstValue(dealer, "dealer");
		console.log("Dealer's cards: " + dealer[0].value + dealer[0].seeds + ". Total: " + values.value1 + "/" + values.value2);
	}
	else {
		console.log("Dealer's cards: " + dealer[0].value + dealer[0].seeds + ". Total: " + utility.countFirstValue(dealer, "dealer"));
	}

	fiches = utility.insurance(dealer, fiches);
	console.log("Now you have: " + fiches + " fiches.");

	//Ask to player what he want to do between: hit, stay, double and
	if (player[0].weight === player[1].weight) {
		equal = true;
		firstAction = readline.keyInSelect(actionYesSplit, "What do you want to do?");
		console.log(actionYesSplit[firstAction]);
		switch (actionYesSplit[firstAction]) {
			case "stay":
				//INVOCA FUNZIONE PER STARE
				utility.stay(dealer, countDealer, deck);
				break;
			case "hit":
				//INVOCA FUNZIONE PER CHIEDERE CARTA
				break;
			case "double":
				//INVOCA FUNZIONE PER RADDOPPIARE
				break;
			case "split":
				//INVOCA FUNZIONE PER DIVIDERE
				break;
		}
	}
	else {
		equal = false;
		firstAction = readline.keyInSelect(actionsNoSplit, "What do you want to do?");
		console.log(actionsNoSplit[firstAction]);
		switch (actionYesSplit[firstAction]) {
			case "stay":
				//INVOCA FUNZIONE PER STARE
				break;
			case "hit":
				//INVOCA FUNZIONE PER CHIEDERE CARTA
				break;
			case "double":
				//INVOCA FUNZIONE PER RADDOPPIARE
				break;
		}
	}




	break;
}