var soundCoin = function(){
	var sound = soundManager.createSound({ 
		id: 'sound_coin', 
		url: '/sounds/coin.mp3', 
		volume: 50, 
		autoPlay: true 
	}).play();
}

var soundFail = function(){
	var sound = soundManager.createSound({ 
		id: 'sound_fail', 
		url: '/sounds/fail.mp3', 
		volume: 50, 
		autoPlay: true 
	}).play();
}

var soundGameOver = function(){
	var sound = soundManager.createSound({ 
		id: 'sound_gameOver', 
		url: '/sounds/gameOver.mp3', 
		volume: 50, 
		autoPlay: true 
	}).play();
}

var soundWin = function(){
	var sound = soundManager.createSound({ 
		id: 'sound_win', 
		url: '/sounds/win.mp3', 
		volume: 25, 
		autoPlay: true 
	}).play();
}