/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, winningScore, dice1, dice2;
var input = document.querySelector('.final-score');

document.querySelector('.btn-score').addEventListener('click', function () {
	var inputValue = input.value;

	// Undefined, 0, null or "" are false
	if (inputValue) 
		winningScore = inputValue;
	else
		winningScore = 100;

	input.disabled = true;
	this.disabled = true;

	gameSettingsSet();
});

document.querySelector('.btn-roll').addEventListener('click', function (argument) {

	if (gamePlaying) {
		// Random number
		dice1 = Math.floor(Math.random() * 6) + 1;
		dice2 = Math.floor(Math.random() * 6) + 1;
		
		diceShow(dice1, dice2);

		if (dice1 !== 1 && dice2 !== 1) {
			// Add score
			roundScore += dice1 + dice2;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;

		} else {
			nextPlayer();
		}

		// Store last roll value 
		// var previousDiceRoll = dice;
	}

});

document.querySelector('.btn-hold').addEventListener('click', function () {

	if (gamePlaying) {
		// Add current score to global score

		if (dice1 === dice2)
			scores[activePlayer] += roundScore * 2;
		else
			scores[activePlayer] += roundScore;

		// Update UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		// Check if player has won the game
		if (scores[activePlayer] >= winningScore){
			document.querySelector('#name-' + activePlayer).textContent = 'Winner';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			diceHide();
			gamePlaying = false;
		}else{	
			// Next player
			nextPlayer();
		}
	}
});

document.querySelector('.btn-new').addEventListener('click', initGame);

function nextPlayer () {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	diceHide();
}

function initGame () {
	input.value = 0;
	input.disabled = false;
	document.querySelector('.btn-score').disabled = false;

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
}

function gameSettingsSet(){
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	document.querySelector('.player-0-panel').classList.add('active');
}

function diceHide(){
	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';
}

function diceShow(dice1, dice2){
	document.getElementById('dice-1').style.display = 'block';
	document.getElementById('dice-2').style.display = 'block';
	document.getElementById('dice-1').src = 'images/dice-' + dice1 + '.png';
	document.getElementById('dice-2').src = 'images/dice-' + dice2 + '.png';
}