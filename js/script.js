var markers = ["x", "o"];
var whoseTurn = 0;
var totals = [0 , 0];
var winCodes = [7, 56, 73, 84, 146, 273, 292, 448];
function play(clickedDiv, divValue)
{
	clickedDiv.innerText = markers[whoseTurn];

	totals[whoseTurn] += divValue;
	if(isWin())
	{
		console.log(whoseTurn + "won");
	}
	else
	{
		if(whoseTurn)
		{
			whoseTurn = 0;
			
		}
		else
		{
			whoseTurn = 1;
		}

		clickedDiv.attributes["0"].nodeValue = "";
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