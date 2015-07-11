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

//Global variables

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
		console.log(Hangman.input);
		Hangman.popUp2Div.hide();
		Hangman.popUp3Div.show();
		Hangman.startGame();
	});
}
//Third and final pop is dismissed and game page is loaded
Hangman.startGame = function(){
	var $startGame = $('#startGame');
	var $gameWrapper = $('#gameWrapper');
	$startGame.on("click", function(){
		Hangman.popUp3Div.hide();
		$gameWrapper.show();
		var inputArray = Hangman.input.split('');
		console.log(inputArray);
	});
}

Hangman.generateWord = function(){
	Hangman.popUp1Div = $('#popUp1');
	Hangman.popUp2Div = $('#popUp2');
	Hangman.popUp3Div = $('#popUp3');
	Hangman.popUp4Div = $('#popUp4');
	Hangman.popUp1Div.hide();
	Hangman.popUp4Div.show();

	var $randomGenerateSubmit = $('#randomGenerateSubmit');
	$randomGenerateSubmit.on("click", function(){
		Hangman.category = $('#selectOption').val();
		console.log(Hangman.category);
	});
	var citiesArray = ['London', 'Paris', 'Barcelona'];
	var coloursArray = ['Pink', 'Purple', 'Orange'];
	var animalsArray = ['Tiger', 'Monkey', 'Penguin'];
	var rand = citiesArray[Math.floor(Math.random() * citiesArray.length)];
}


