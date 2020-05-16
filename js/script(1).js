var markers = ["x", "o"];
var players = [];
players[0] = prompt("Player 1:");
players[1] = prompt("Player 2:");
var winNoise = new Audio();
winNoise.src = "audio/correct.wav";
var tieNoise = new Audio();
tieNoise.src = "audio/tie.mp3";
var wins = [0, 0];
var ties = 0;
var whoseTurn = 1;
var totals = [0 , 0];
var winCodes = [7, 56, 73, 84, 146, 273, 292, 448];
var gameOver = false;

function playWin()
{
	winNoise.play();
}

function playTie()
{
	tieNoise.play();
}

function player1Turn()
{
	document.getElementById("player-1").className = "highlight";
	document.getElementById("player-2").className = "no-highlight";
	document.getElementById("turn1").innerHTML = "turn";
	document.getElementById("turn2").innerHTML = " ";
}

function player2Turn()
{
	document.getElementById("player-2").className = "highlight";
	document.getElementById("player-1").className = "no-highlight";
	document.getElementById("turn2").innerHTML = "turn";
	document.getElementById("turn1").innerHTML = " ";
}


function start()
{

	var innerDivs = "";
	var counter = 1;
	for(i = 1; i <= 3; i++)
	{
		innerDivs += '<div id="row-' + i + '">';

		for(j = 1; j <= 3; j++)
		{
			innerDivs += '<div onclick="play(this,' + counter + ');"></div>';
			counter *= 2;
		} 

		innerDivs += '</div>';
	} 
	innerDivs += '<div id="row-4"><div class="highlight" id="player-1"><span id="name1">' + players[0] + ': </span><span id="score1">' + wins[0] + '</span><br><span id="turn1">turn</span></div><div id="tie">Tie: <span id="tie-score">' + ties + '</span></div><div class="no-highlight" id="player-2"><span id="name2">' + players[1] + ': </span><span id="score2">' + wins[1] + '</span><br><span id="turn2"> </span></div></div><div id="row-5"><div class="hide" id="winner"><span id="winner-name">PLAYER</span> <span id="setMessage">wins</span></div></div><div id="row-6" class="hide"><button onclick="start()">Play Again</button></div>';
	document.getElementById("game-board").innerHTML = innerDivs;  

	totals = [0 , 0];
	gameOver = false;

	if(whoseTurn)
	{
		whoseTurn = 0;
		player1Turn();
	}
	else
	{
		whoseTurn = 1;
		player2Turn();
	}
}

function play(clickedDiv, divValue)
{
	if (!gameOver)
	{
		clickedDiv.innerText = markers[whoseTurn];

		totals[whoseTurn] += divValue;
		
		if(isWin())
		{
			gameOver = true;
			wins[whoseTurn] +=1;
			document.getElementById("row-6").className = "show";
			if(whoseTurn)
			{	
				document.getElementById("winner-name").innerHTML = players[whoseTurn] + " ";
				document.getElementById("score2").innerHTML = (wins[whoseTurn]);
			}
			else
			{
				document.getElementById("winner-name").innerHTML = players[whoseTurn] + " ";
				document.getElementById("score1").innerHTML = (wins[whoseTurn]);
			}
			playWin();
			document.getElementById("winner").className = "show";
		}
		else if ((totals[0] + totals[1]) == 511)
		{
			document.getElementById("tie-score").innerHTML = (ties += 1);
			document.getElementById("winner").className = "show";
			document.getElementById("winner-name").innerHTML = "no one ";
			document.getElementById("row-6").className = "show";
			playTie();
		}
		else
		{
			if(whoseTurn)
			{
				whoseTurn = 0;
				if(!gameOver){
					player1Turn();
				}
			}
			else
			{
				whoseTurn = 1;
				if(!gameOver)
				{
					player2Turn();
				}
			}

			clickedDiv.attributes["0"].nodeValue = "";
		}
	}
	
}

function isWin()
{
	for(i = 0; i < winCodes.length; i++)
	{ 
		if((totals[whoseTurn] & winCodes[i]) == winCodes[i]) {return true;}
	}
	return false;

}