// When page loads, the user needs to choose whether to input their own word, or get a generated word
// If input own word, input option is available with submit button
// Input saved in an array
// Once all player info is taken, load main page
// Load the word, in hangman form (_ _ / _ _ etc.)
// Load the letters a-z (maybe as buttons?)
// Once clicked, the a-z button checks against the letters in the array
// If true, the letter becomes visable, and the button disappears(blacked out)
// If false, the 'hangman' part is drawn, and the button disappears(blacked out)
// If correct - declare game won
// If incorrect - play again until max guesses (9)
// If total hangman is drawn - game over - restart
// Back to menu page

$(document).ready(function(){
	Hangman.setup();
});

const Hangman = {
	setup() {
		this.popUp1Div = $('#popUp1');
		this.popUp2Div = $('#popUp2');
		this.popUp3Div = $('#popUp3');
		this.popUp4Div = $('#popUp4');
		this.popUp5Div = $('#popUp5');
		this.gameWrapper = $('#gameWrapper');
		this.winOrLose = $('#winOrLose');
		// Event listeners are added to first two buttons
		const $enterWord = $('#enterWord');
		const $randomGenerate = $('#randomGenerate');
		$enterWord.on("click", this.enterWord.bind(this));
		$randomGenerate.on("click", this.generateWord.bind(this));
	},

	// User chosen word is stored in a variable and second pop up vanishes
	enterWord() {
		this.popUp1Div.hide();
		this.popUp2Div.show();
		const $submitButton = $('#enterWordSubmit');
		$submitButton.on("click", ()=> {
			this.input = $('#enterWordInput').val().toLowerCase().replace(/ /g, '/');
			this.popUp2Div.hide();
			this.popUp3Div.show();
			this.startGame();
		});
	},

	// Generates a random word from an array on click of submit and saves it in input variable
	generateWord() {
		this.popUp1Div.hide();
		this.popUp4Div.show();
		const $randomGenerateSubmit = $('#randomGenerateSubmit');
		$randomGenerateSubmit.on("click", this.pickWord.bind(this));
	},

	pickWord() {
		const GACitiesArray = ['atlanta', 'austin', 'boston', 'chicago', 'hong/kong', 'london', 'los/angeles', 'melbourne', 'new/york/city', 'san/francisco', 'seattle', 'singapore', 'sydney', 'washington/dc'];
		const starWarsArray = ['darth/vader', 'luke/skywalker', 'leia/organa', 'han/solo', 'yoda', 'obi-wan/kenobi', 'boba/fett', 'chewbacca', 'jabba/the/hutt', 'jar/jar/binks'];
		const pokemonArray = ['pikachu', 'bulbasaur', 'squirtle', 'rattata', 'clefairy', 'jigglypuff', 'meowth', 'magnemite', 'starmie', 'snorlax', 'mew'];
		const WD14 = ['andrea', 'franziska', 'gabriele', 'keith', 'marty', 'matt', 'troy', 'alex', 'anconst', 'dami', 'evan', 'francesca', 'hassan', 'jacopo', 'lexie', 'marcus', 'rane', 'sam'];
		const LOTR = ['frodo/baggins', 'aragorn', 'gandalf', 'legolas', 'bilbo/baggins', 'saruman', 'gollum', 'elrond', 'galadriel', 'boromir', 'peregrin/took', 'gimli', 'faramir', 'radagast'];
		// Picks from array based on player category selection
		let $selectOption = $('#selectOption').val();
		switch ($selectOption) {
			case "GACities":
			this.input = GACitiesArray[Math.floor(Math.random() * GACitiesArray.length)];
			break;
			case "starWars":
			this.input = starWarsArray[Math.floor(Math.random() * starWarsArray.length)];
			break;
			case "pokemon":
			this.input = pokemonArray[Math.floor(Math.random() * pokemonArray.length)];
			break;
			case "WD14":
			this.input = WD14[Math.floor(Math.random() * WD14.length)];
			break;
			case "LOTR":
			this.input = LOTR[Math.floor(Math.random() * LOTR.length)];
			break;
		}
		this.popUp3Div.show();
		this.popUp4Div.hide();
		this.startGame();
	},


	//Third and final pop is dismissed and game page is loaded - scroll down to game div
	startGame() {
		const $startGame = $('#startGame');
		$startGame.on("click", () => {
			$(document.body).animate({'scrollTop':$('#game').offset().top}, 1500);
			soundLetters();
			Hangman.gameWrapper.show();
			Hangman.inputArray = Hangman.input.split('');
			setTimeout(() => {
				this.initializeBoard();
			}, 4000);
			setTimeout(() => {
				this.initializeWord();
			}, 2000);
		});
	},

	// Generates the a-z buttons in the DOM
	initializeBoard() {
		this.letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
		$.each(this.letters, function(index, value){
			let $letterSeed = $('<input/>').attr({type:'button', class:'letters', value:value}).addClass("animated pulse zoomIn");
			$("#letterSeed").append($letterSeed);
			$letterSeed.mouseenter(function() {
				soundCoin();
			});
			setTimeout(function() {
				$letterSeed.removeClass("zoomIn");
			}, 1000);
		});
		this.playGame();
	},

	// Loads divs for each letter to be guessed
	initializeWord() {
		this.inputArray = this.input.split(''); // Figure out why I have to re-declare this var
		$.each(this.inputArray, function(index, value){
			let $wordSeed = $('<div/>').attr({class:'word', value:value, name:value});
			setTimeout(function(){
				$("#wordSeed").append($wordSeed);
				$(".word[name='/']").html('/').addClass('full');
				$(".word[name='-']").html('-').addClass('full');
			}, (150*index+1));
		});
	},

	// Adds event listeners to the a-z buttons + main game logic
	playGame() {
		this.guessCounter = 0;
		const $letterClick = $('.letters');
		$letterClick.on("click",() => {
			let $clicked = $(event.target);
			if (this.guessCounter < 9){
				if($.inArray($clicked.val(), this.inputArray) > -1){
					$clicked.addClass("correct");
					let $selectLetter = $(".word[name='" + $clicked.val() + "']");
					$selectLetter.html($clicked.val()).addClass("full");
					sound1up();
					this.checkForWinner();
				} else {
					this.guessCounter++;
					this.changeImage();
					soundFail();
					$clicked.addClass("incorrect");
				}
			}
		});
	},

	// Changes the hangman frame - when guessCounter reaches 8 (max) the gameOver function runs
	changeImage() {
		const $animation = $('#animation');
		switch (this.guessCounter) {
			case 1:
			$animation.css("background-image", "url(./images/hm1.png)");
			break;
			case 2:
			$animation.css("background-image", "url(./images/hm2.png)");
			break;
			case 3:
			$animation.css("background-image", "url(./images/hm3.png)");
			break;
			case 4:
			$animation.css("background-image", "url(./images/hm3-5.png)");
			break;
			case 5:
			$animation.css("background-image", "url(./images/hm4.png)");
			break;
			case 6:
			$animation.css("background-image", "url(./images/hm5.png)");
			break;
			case 7:
			$animation.css("background-image", "url(./images/hm6.png)");
			break;
			case 8:
			$animation.css("background-image", "url(./images/hm7.png)");
			break;
			case 9:
			$animation.css("background-image", "url(./images/hm8.png)");
			// Game over if the guessCounter gets to 9
			this.gameOver();
			soundGameOver();
			$solution = $('#solution');
			$solution.html("The correct answer was '" + this.input.replace(/ |\//g," ") +"'!");
			this.winOrLose.html("Game over!");
			break;
		}
	},

	// Checks to see if .word divs have a class of 'full' - if yes then declare winner
	checkForWinner() {
		if ($(".word.full").length == $(".word").length) {
			this.gameOver();
			soundWin();
			this.winOrLose.html("Congratulations! You won!");
		}
	},

	// Sets event listener on play again button, and scrolls back up to the top
	gameOver() {
		this.popUp5Div.show();
		const $playAgain = $('#playAgain');
		$playAgain.on("click", () => {
			$(document.body).animate({'scrollTop':$('#setup').offset().top}, 1500);
			this.popUp1Div.show();
			this.popUp3Div.hide();
			setTimeout(function(){
				location.reload();
			}, 2000);
		});
	}
};
