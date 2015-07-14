// When page loads, the user needs to choose whether to input their own word, or get a generated word
// If input own word, input option is available with submit button
// Input saved in an array
// Give option 1 or 2 players
// If 2 players then ask for names/team names
// Once all player info is taken, load main page
// Load the word, in hangman form (_ _ / _ _ etc.)
// Load the letters a-z (maybe as buttons?)
// Once clicked, the a-z button checks against the letters in the array
// If true, the letter becomes visable, and the button disappears(blacked out)
// It is still player 1's go
// If false, the 'hangman' part is drawn, and the button disappears(blacked out)
// If false, it is player 2's go
// The player can guess the word by typing in a box at any point - but only on their go
// If correct - declare winner
// If incorrect - next person's go
// If total hangman is drawn - game over - restart
// Player 1 or player 2 score taken (this might be complicated, with player 1/2 toggle)
// Back to menu page

$(document).ready(function(){
	Hangman.setup();
})

var Hangman = Hangman || {};

Hangman.setup = function(){
	Hangman.popUp1Div = $('#popUp1');
	Hangman.popUp2Div = $('#popUp2');
	Hangman.popUp3Div = $('#popUp3');
	Hangman.popUp4Div = $('#popUp4');
	Hangman.popUp5Div = $('#popUp5');
	Hangman.gameWrapper = $('#gameWrapper');
	Hangman.winOrLose = $('#winOrLose');

	var $enterWord = $('#enterWord');
	var $randomGenerate = $('#randomGenerate');
	$enterWord.on("click", Hangman.enterWord);
	$randomGenerate.on("click", Hangman.generateWord);
}

// User chosen word is stored in a variable and second pop up vanishes
Hangman.enterWord = function(){
	Hangman.popUp1Div.hide();
	Hangman.popUp2Div.show();
	var $submitButton = $('#enterWordSubmit');
	$submitButton.on("click", function(){
		Hangman.input = $('#enterWordInput').val().toLowerCase().replace(/ /g, '/');
		Hangman.popUp2Div.hide();
		Hangman.popUp3Div.show();
		Hangman.startGame();
	});
}

// Generates a random word from an array on click of submit and saves it in input variable
Hangman.generateWord = function(){
	Hangman.popUp1Div.hide();
	Hangman.popUp4Div.show();
	var $randomGenerateSubmit = $('#randomGenerateSubmit');
	$randomGenerateSubmit.on("click", function(){
		var GACitiesArray = ['atlanta', 'austin', 'boston', 'chicago', 'hong/kong', 'london', 'los/angeles', 'melbourne', 'new/york/city', 'san/francisco', 'seattle', 'singapore', 'sydney', 'washington/dc'];
		var starWarsArray = ['darth/vader', 'luke/skywalker', 'leia/organa', 'han/solo', 'yoda', 'obi-wan/kenobi', 'boba/fett', 'chewbacca', 'jabba/the/hutt', 'jar/jar/binks'];
		var pokemonArray = ['pikachu', 'bulbasaur', 'squirtle', 'rattata', 'clefairy', 'jigglypuff', 'meowth', 'magnemite', 'starmie', 'snorlax', 'mew'];
		var WD14 = ['andrea', 'franziska', 'gabriele', 'keith', 'marty', 'matt', 'troy', 'alex', 'anvar', 'dami', 'evan', 'francesca', 'hassan', 'jacopo', 'lexie', 'marcus', 'rane', 'sam', 'siavosh']
		var LOTR = ['frodo/baggins', 'aragorn', 'gandalf', 'legolas', 'bilbo/baggins', 'saruman', 'gollum', 'elrond', 'galadriel', 'boromir', 'peregrin/took', 'gimli', 'faramir', 'radagast']
		
		var $selectOption = $('#selectOption').val();
		switch ($selectOption) {
			case "GACities":
			Hangman.input = GACitiesArray[Math.floor(Math.random() * GACitiesArray.length)];
			break;
			case "starWars":
			Hangman.input = starWarsArray[Math.floor(Math.random() * starWarsArray.length)];
			break;
			case "pokemon":
			Hangman.input = pokemonArray[Math.floor(Math.random() * pokemonArray.length)];
			break;
			case "WD14":
			Hangman.input = WD14[Math.floor(Math.random() * WD14.length)];
			break;
			case "LOTR":
			Hangman.input = LOTR[Math.floor(Math.random() * LOTR.length)];
			break;
		}
		Hangman.popUp3Div.show();
		Hangman.popUp4Div.hide();
		Hangman.startGame();
	});
}

//Third and final pop is dismissed and game page is loaded - scroll down to game div
Hangman.startGame = function(){
	var $startGame = $('#startGame');
	$startGame.on("click", function(){
		$(document.body).animate({'scrollTop':$('#game').offset().top}, 1500);
		soundLetters();
		Hangman.gameWrapper.show();
		Hangman.inputArray = Hangman.input.split('');
		console.log(Hangman.input);
		setTimeout(Hangman.initializeBoard, 4000);
		setTimeout(Hangman.initializeWord, 2000);
	});
}

// Generates the a-z buttons in the DOM
Hangman.initializeBoard = function(){
	Hangman.letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
	$.each(Hangman.letters, function(index, value){
		var $letterSeed = $('<input/>').attr({type:'button', class:'letters', value:value}).addClass("animated pulse zoomIn");
		$("#letterSeed").append($letterSeed);
		$letterSeed.mouseenter(function() {
			soundCoin();
		});
		setTimeout(function() {
			$letterSeed.removeClass("zoomIn");
		}, 1000);
	});
	Hangman.playGame();
}

// Loads divs for each letter to be guessed
Hangman.initializeWord = function(){
	Hangman.inputArray = Hangman.input.split(''); // Figure out why I have to re-declare this var
	$.each(Hangman.inputArray, function(index, value){
		var $wordSeed = $('<div/>').attr({class:'word', value:value, name:value});
		setTimeout(function(){
			$("#wordSeed").append($wordSeed);
			$(".word[name='/']").html('/').addClass('full');
			$(".word[name='-']").html('-').addClass('full');
		}, (150*index+1));
	});
}

// Adds event listeners to the a-z buttons + main game logic
Hangman.playGame = function(){
	Hangman.guessCounter = 0;
	var $letterClick = $('.letters');
	$letterClick.on("click", function(){
		if (Hangman.guessCounter < 9){
			if($.inArray($(this).val(), Hangman.inputArray) > -1){
				$(this).addClass("correct");
				var $selectLetter = $(".word[name='" + $(this).val() + "']");			
				$selectLetter.html($(this).val()).addClass("full");
				sound1up();
				Hangman.checkForWinner();
			} else {
				Hangman.guessCounter++;
				Hangman.changeImage();
				soundFail();
				console.log(Hangman.guessCounter);
				$(this).addClass("incorrect");
			}
		}
	});                          
}
// Changes the hangman frame - when guessCounter reaches 8 (max) the gameOver function runs
Hangman.changeImage = function(){
	var $animation = $('#animation');
	switch (Hangman.guessCounter) {
		case 1:
		$animation.css("background-image", "url(./images/hm1.png)")
		break;
		case 2:
		$animation.css("background-image", "url(./images/hm2.png)")
		break;
		case 3:
		$animation.css("background-image", "url(./images/hm3.png)")
		break;
		case 4:
		$animation.css("background-image", "url(./images/hm3-5.png)")
		break;
		case 5:
		$animation.css("background-image", "url(./images/hm4.png)")
		break;
		case 6:
		$animation.css("background-image", "url(./images/hm5.png)")
		break;
		case 7:
		$animation.css("background-image", "url(./images/hm6.png)")
		break;
		case 8:
		$animation.css("background-image", "url(./images/hm7.png)")
		break;
		case 9:
		$animation.css("background-image", "url(./images/hm8.png)");
		// Game over if the guessCounter gets to 9
		Hangman.gameOver();
		soundGameOver();
		$solution = $('#solution');
		$solution.html("The correct answer was '" + Hangman.input.replace(/ |\//g," ") +"'!")
		Hangman.winOrLose.html("Game over!");
		break;
	}
}

// Checks to see if .word divs have a class of 'full' - if yes then declare winner
Hangman.checkForWinner = function(){
	if ($(".word.full").length == $(".word").length) {
		Hangman.gameOver();
		soundWin();
		Hangman.winOrLose.html("Congratulations! You won!");
	}
}

// Sets event listener on play again button, and scrolls back up to the top
Hangman.gameOver = function(){
	Hangman.popUp5Div.show();
	var $playAgain = $('#playAgain');
	$playAgain.on("click", function(){
		$(document.body).animate({'scrollTop':$('#setup').offset().top}, 1500);
		Hangman.popUp1Div.show();
		Hangman.popUp3Div.hide();
		setTimeout(function(){
			location.reload() // Hassan told me to do this!
		}, 2000);
	})
}