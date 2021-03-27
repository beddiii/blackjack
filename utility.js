const readline = require('readline-sync');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
	//Function for create the complete deck composed by 1, 2, 4, 6, 8 decks of 52 cards
	createDeck: function(NDeck) {
		var seeds = ["Picche", "Quadri", "Fiori", "Cuori "];
		var value = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
		var deck = [];
		var count = 0;

		for (n = 0; n < NDeck; n++) {
			for (i = 0; i < seeds.length; i++) {
				for (j = 0; j < value.length; j++) {
					deck[count] = {
						"value": value[j],
						"seeds": seeds[i]
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
	}
}