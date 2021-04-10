const readline = require('readline-sync');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
	//Function for create a complete deck composed by 1, 2, 4, 6, 8 decks of 52 cards
	createDeck: function(NDeck) {
		var seeds = ["Picche", "Quadri", "Fiori", "Cuori "];
		var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
		var deck = [];
		var count = 0;

		for (n = 0; n < NDeck; n++) {
			for (i = 0; i < seeds.length; i++) {
				for (j = 0; j < values.length; j++) {
					if (values[j] === "J" || values[j] === "Q" || values[j] === "K") {
						deck[count] = {
							"value": values[j],
							"seeds": seeds[i],
							"weight": 10
						}
					}
					else if (values[j] === "A") {
						deck[count] = {
							"value": values[j],
							"seeds": seeds[i],
							"weight": [1, 11]
						}
					}
					else {
						deck[count] = {
							"value": values[j],
							"seeds": seeds[i],
							"weight": parseInt(values[j])
						}
					}
					count++;
				}
			}
		}

		return deck;
	},

	//Durstenfeld-Knuth algorithm for shuffle the deck
	deckShuffling: function(deck) {
		i = deck.length;
		while (i > 1) {
			j = getRandomInt(0, i);
			i = i - 1;
			help = deck[j];
			deck[j] = deck[i];
			deck[i] = help;
		}
	},

	//Set signal card
	signalCard: function(deck) {
		var countCards = deck.length;
		var redCardPosition;
		switch (countCards) {
			case 52:
				redCardPosition = getRandomInt(Math.floor(countCards/2) + 10, Math.floor(countCards/2) + 17);
				break;
			case 104:
				redCardPosition = getRandomInt(Math.floor(countCards/2) + 20, Math.floor(countCards/2) + 40);
				break;
			case 208:
				redCardPosition = getRandomInt(Math.floor(countCards/2) + 50, Math.floor(countCards/2) + 80);
				break;
			case 312:
				redCardPosition = getRandomInt(Math.floor(countCards/2) + 90, Math.floor(countCards/2) + 120);
				break;
			case 416:
				redCardPosition = getRandomInt(Math.floor(countCards/2) + 140, Math.floor(countCards/2) + 170);
				break;
		}

		deck.splice(redCardPosition, 0, {"value": "RED CARD", "seeds": "JOLLY", "value": null});
	},

	//Give the first card for start the hand
	startHand: function(fiches, deck, player, countPlayer, dealer, countDealer) {
		var found = false;

		//Ask for how many fiches player want to use
		var fichesPlayed = Number(readline.question("How many fiches do you want to use? (Min. 10 - Max. 50): "));
		while (Number(fichesPlayed) < 10 || Number(fichesPlayed) > 50) {
			console.log(fichesPlayed);
			fichesPlayed = Number(readline.question("How many fiches do you want to use? (Min. 10 - Max. 50): "));
		}
		fiches = fiches - fichesPlayed;
		console.log("Remaining fiches: " + fiches);

		//Give the first card to player
		if (deck[0].value !== "RED CARD") {
			player[countPlayer] = deck.shift();
			countPlayer++;
		}
		else {
			found = true;
			deck.shift();
			player[countPlayer] = deck.shift();
			countPlayer++;
		}

		//Give the first card to dealer
		if (deck[0].value !== "RED CARD") {
			dealer[countDealer] = deck.shift();
			countDealer++;
		}
		else {
			found = true;
			deck.shift();
			player[countPlayer] = deck.shift();
			countPlayer++;
		}

		//Give the second card to player
		if (deck[0].value !== "RED CARD") {
			player[countPlayer] = deck.shift();
			countPlayer++;
		}
		else {
			found = true;
			deck.shift();
			player[countPlayer] = deck.shift();
			countPlayer++;
		}

		return {"countP": countPlayer, "countD": countDealer, "redCard": found};
	},

	//Control and ask for insurance after the dealer have an ace
	insurance: function(dealer, fiches) {
		if (dealer[0].value === "A") {
			askInsurance = readline.keyInYNStrict("Do you want to insurance your play? (Cost 50% of fiches played)");
			if (askInsurance) {
				fiches = fiches - Math.floor(fiches/2);
				console.log("Insurance accepted. Remains " + fiches + " fiches");
			}
		}
		return fiches;
	},

	//Count value of cards
	countFirstValue: function(arr, subject) {
		if (subject === "player") {
			if (arr[0].value === "A" || arr[1].value ==="A") {
				if ((arr[0].value === "A" && arr[1].weight === 10) || (arr[0].weight === 10 && arr[0].value === "A")) {
					return "BLACKJACK!";
				}
				else {
					return {"value1": arr[0].weight[0] + arr[1].weight[1], "value2": arr[0].weight[0] + arr[1].weight[0]};
				}
			}
			else {
				return arr[0].weight + arr[1].weight;
			}
		}
		else {
			if (arr[0].value === "A") {
				return {"value1": arr[0].weight[0], "value2": arr[0].weight[1]};
			}
			else {
				return arr[0].weight;
			}
		}
	},

	//Stay, dealer's turn
	stay: function(dealer, countDealer, deck) {
		//Calcola il totale del dealer
		/*if (dealer[]) {
			
		}

		while (total <= 16) {
			dealer[countDealer] = deck.shift();
			
		}*/
	}
}