/*
	players is an array to hold each player's information.
	Fields:
		name - Football player's name
		img  - The relative/absolute path to the image file.
		alt  - The alternative text that describes the image.
		year - The student's year in college (Freshman, Sophomore, Junior, Senior).
		major- The student's current college major.
		games_played    - The number of football games the student has played for the Buffs.
		pass_yards      - The total number of passing yards in the student's football career for the Buffs.
		rushing_yards   - The total number of rushing yards in the student's football career for the Buffs.
		receiving_yards - The total number of receiving yards in the student's football career for the Buffs.
*/
var players = [{name:"John Doe", img: "../resources/img/player1.jpg", alt:"Image of Player 1", year:"Sophomore", major:"Art", games_played: 23, pass_yards: 435, rushing_yards: 200, receiving_yards: 88},
				{name:"James Smith", img: "../resources/img/player2.jpg", alt:"Image of Player 2", year:"Junior", major:"Science", games_played: 17, pass_yards: 192, rushing_yards: 102, receiving_yards: 344},
				{name:"Samuel Phillips", img: "../resources/img/player3.jpg", alt:"Image of Player 3", year:"Freshman", major:"Math", games_played: 8, pass_yards: 35, rushing_yards: 70, receiving_yards: 98},
				{name:"Robert Myers", img: "../resources/img/player4.jpg", alt:"Image of Player 4", year:"Senior", major:"Computer Science", games_played: 31, pass_yards: 802, rushing_yards: 375, receiving_yards: 128}];


/*
	Registration Page:
		viewStudentStats(id, toggle) method
			parameters:
				id - The css id of the html tag being updated.
				toggle - 
					0 - hide the html tag
					1 - make the html tag visible
			
			purpose: This method will accept the id of an html tag and a toggle value.
					 The method will then set the html tag's css visibility and height.  
					 To hide the html tag (toggle - 0), the visibility will be set to hidden and
					 the height will be set to 0.  
					 To reveal the html tag (toggle - 1), the visibility will be set to visible and
					 the height will be set to auto.
*/

function viewStudentStats(id, toggle){
	console.log("in stats");
	var element = $("#"+id);
	if(toggle == 0){ //toggle is zero so we are hiding the element
		element.css("visibility", "hidden");
		element.css("height", 0);
	}else{ //togle is 1 so we are showing the element
		element.css("visibility", "visible");
		element.css("height", "auto");
	}
}
				
/*
	Home Page: 
		changeColor(color) method
			parameter: 
				color- A css color
				
			purpose: This method will set the html body's background color to the 
					 provided parameter.
*/

function changeColor(color){
	$("body").css("backgroundColor", color);
}


/*
	Football Season Stats Page:
		loadStatsPage method:
			parameters: none
			
			purpose: This method will iterate through the stats table and 
					 do the following:
						1. Read through each row of the table & determine which team won
						   the game.
						
						2. Update the winner column to the name of the winning team.
						
						3. Keep track of the number of wins/losses for the Buffs.
						
						4. Update the second table to show the total number of wins/losses for the Buffs.
*/

function loadStatsPage(){
	//get a reference to the table
	var table = document.getElementById('stats_table');
	// console.log(table);
	//set up variables to hold the information that we want to know
	//keep track of what row we are in
	var row_counter;
	//variable to hold the opposing team's name
	var oppTeam;
	//variable to hold the buff team score
	var buffScore;
	//variable to hold the opposing team score
	var oppScore;
	//variable to hold the total number of buff wins
	var buffWins = 0;
	//variable to hold the total number of buff losses
	var buffLosses = 0;

	//we know that the top two rows are header rows so we are going to start at index 2 which is the first data row in the table
	for(row_counter = 2; row_counter < table.rows.length; row_counter++){
		oppTeam = table.rows[row_counter].cells[1].innerHTML;
		// console.log(oppTeam);
		buffScore = parseInt(table.rows[row_counter].cells[2].innerHTML);
		oppScore =  parseInt(table.rows[row_counter].cells[3].innerHTML);
		if(oppScore > buffScore){
			table.rows[row_counter].cells[4].innerHTML = oppTeam;
			buffLosses++;
		}else{
			table.rows[row_counter].cells[4].innerHTML = "University of Colorado";
			buffWins++;
		}
	}

	$("#wins").text(buffWins);
	$("#losses").text(buffLosses);
}

/*
	Football Player Information Page
		loadPlayersPage method:
			parameters: none
			
			purpose: This method will populate the dropdown menu to allow the 
					 user to select which player's information to view.
					 
					 To handle this, you will need to iterate through the players array
					 and do the following for each player:
						1. Create an anchor tag
						2. Set the href to "#", this will make sure the 
							anchor tag doesn't change pages
						3. Set the onclick to call switchPlayers method 
							(this will need to pass in the index inside the players array)
						4. Set the anchor tag's text to the player's name.
						
					After setting all of the anchor tags, update the innerHTML of the dropdown menu.
					As a note, the id for the dropdown menu is player_selector.
		
		switchPlayers(playerNum) method:
			parameters: 
				playerNum - The index of the football player in the players array.
			
			purpose:
				This method will update the the spans on the player's information pageX
				and calculate the average passing, rushing, and receiving yards.
				
				Span ids:
					p_year     - the player's year in college
					p_major    - the player's major in college
					g_played   - the number of games played for Buffs
					player_img - the player's photo (must set src and alt)
					p_yards    - the number of passing yards
					r_yards    - the number of rushing yards
					rec_yards  - the number of receiving yards
					
					Calculated values:
					  avg_p_yards   - the average number of passing yards for the player's Buff career
					  avg_r_yards   - the average number of rushing yards for the player's Buff career
					  avg_rec_yards - the average number of receiving yards for the player's Buff career
*/

function loadPlayersPage(){
	//loop over our players array
	for (var index = 0; index < players.length; index++){
		//for each player we want to add a dropdown item to our player_selector dropdown list
		//be sure to include the dropdown-item class for the correct styling
		//be sure to include the href="#"
		//be sure to make the text of the anchor tag the player's name
		//be sure to add an onclick event call to switchPlayers on the player's index number
		$("#player_selector").append("<a href='#' class='dropdown-item' onClick='switchPlayers("+index+")'>"+players[index].name+"</a>");
	}
}

function switchPlayers(playerNum){
	//set all information on the player stat table to reflect the stats for the selected player
	var player = players[playerNum];
	//set year
	$("#p_year").text(player.year);
	//set major
	$("#p_major").text(player.major);
	//set the number of games played
	$("#g_played").text(player.games_played);
	//set the player image
	$("#player_img").attr("src", player.img);
	$("#player_img").attr("alt", player.alt);
	//set the number of passing yards
	$("#p_yards").text(player.pass_yards);
	//set the number of rushing yards
	$("#r_yards").text(player.rushing_yards);
	//set the number of receiving yards
	$("#rec_yards").text(player.receiving_yards);

	//calc the average rushing yards and update to page
	var avg_r_yards = Math.round(player.rushing_yards/player.games_played);
	$("#avg_r_yards").text(avg_r_yards);
	//calc the average passing yards and update to page
	var avg_p_yards = Math.round(player.pass_yards/player.games_played);
	$("#avg_p_yards").text(avg_p_yards);
	//calc the average receiving yards and update to page
	var avg_rec_yards = Math.round(player.receiving_yards/player.games_played);
	$("#avg_rec_yards").text(avg_rec_yards);

}
				

