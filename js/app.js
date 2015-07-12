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
	var $enterWord = $('#enterWord');
	var $randomGenerate = $('#randomGenerate');
	$enterWord.on("click", Hangman.enterWord);
	$randomGenerate.on("click", Hangman.generateWord);
}

Hangman.enterWord = function(){
	// First pop up vanishes and second appears
	Hangman.popUp1Div = $('#popUp1');
	Hangman.popUp2Div = $('#popUp2');
	Hangman.popUp3Div = $('#popUp3');
	Hangman.popUp4Div = $('#popUp4');

	var $submitButton = $('#enterWordSubmit');
	Hangman.popUp1Div.hide();
	Hangman.popUp2Div.show();
	// User chosen word is stored in a variable and second pop up vanishes
	$submitButton.on("click", function(){
		Hangman.input = $('#enterWordInput').val().toLowerCase().replace(/ /g, '-');
		Hangman.popUp2Div.hide();
		Hangman.popUp3Div.show();
		Hangman.startGame();
		Hangman.initializeBoard();
	});
}

//Third and final pop is dismissed and game page is loaded
Hangman.startGame = function(){
	var $startGame = $('#startGame');
	var $gameWrapper = $('#gameWrapper');
	$startGame.on("click", function(){
		Hangman.popUp3Div.hide();
		$gameWrapper.show();
		Hangman.inputArray = Hangman.input.split('');
		console.log(Hangman.inputArray);
	});
}

// Generates a random word from an array on click of submit
Hangman.generateWord = function(){
	Hangman.popUp1Div = $('#popUp1');
	Hangman.popUp2Div = $('#popUp2');
	Hangman.popUp3Div = $('#popUp3');
	Hangman.popUp4Div = $('#popUp4');
	Hangman.popUp1Div.hide();
	Hangman.popUp4Div.show();

	var $randomGenerateSubmit = $('#randomGenerateSubmit');
	$randomGenerateSubmit.on("click", function(){
		var $selectOption = $('#selectOption').val();
		var citiesArray = ['london', 'paris', 'barcelona'];
		var coloursArray = ['pink', 'purple', 'orange'];
		var animalsArray = ['tiger', 'monkey', 'penguin'];

		switch ($selectOption) {
			case "cities":
			Hangman.input = citiesArray[Math.floor(Math.random() * citiesArray.length)];
			break;
			case "colours":
			Hangman.input = coloursArray[Math.floor(Math.random() * coloursArray.length)];
			break;
			case "animals":
			Hangman.input = animalsArray[Math.floor(Math.random() * animalsArray.length)];
			break;
		}
		Hangman.popUp3Div.show();
		Hangman.popUp4Div.hide();
		Hangman.startGame();
		Hangman.initializeBoard();
	});
}

// Generates the a-z buttons in the DOM
Hangman.initializeBoard = function(){
	Hangman.letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
	
	$.each(Hangman.letters, function(index, value){
		var $letterSeed = $('<input/>').attr({type: 'button', class:'letters', value:value});
		$("#letterSeed").append($letterSeed);
	});

	Hangman.bindEvents();
	// Shows the word (for now)
	var $chosenWord = $('#chosenWord');
	$chosenWord.html(Hangman.input);
}

// Adds event listeners to the a-z buttons
Hangman.bindEvents = function(){
	var $letterClick = $('.letters');
	$letterClick.on("click", function(){
		if($.inArray($(this).val(), Hangman.inputArray) > -1){
			$(this).hide();
		} else{
			$(this).css("background-color", "red");
		}
	});
}


