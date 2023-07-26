const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'da05989f3amshd43f590771db45ep1017afjsn774606358029',
		'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
	}
};

fetch('https://api-nba-v1.p.rapidapi.com/players?team=2&season=2022', options)
	.then(response => response.json())
	.then(response => {
    console.log(response);
		
		document.getElementById("title").innerHTML = "Celtics Roster";
		document.getElementById("header").innerHTML = "Celtics Roster";

		class Player {
			constructor(name, pos, jersey, college, height, weight, yeardrafted, birthday) {
				this.name = name;
				this.pos = pos;
				this.jersey = jersey;
				this.college = college;
				this.height = height;
				this.weight = weight;
				this.yeardrafted = yeardrafted;
				this.birthday = birthday;
			}

			roster() {
				let playerInfo = [];
				playerInfo.push(this.name);
				playerInfo.push(this.pos);
				playerInfo.push(this.jersey);
				playerInfo.push(this.college);
				playerInfo.push(this.height);
				playerInfo.push(this.weight);
				playerInfo.push(this.yeardrafted);
				playerInfo.push(this.birthday);
				return playerInfo;
			}
		}

		let completeRoster = [];
		const tableTitle = ["Name", "Position", "Number", "College", "Height", "Weight",
												"Year Drafted", "Birthday"];
		completeRoster.push(tableTitle);
		for (let i = 0; i < response.response.length; i++) {
			let tempPlayer = new Player(response.response[i].firstname + " " + response.response[i].lastname, 
				response.response[i].leagues.standard.pos, response.response[i].leagues.standard.jersey, response.response[i].college,
				response.response[i].height.feets + "'" + response.response[i].height.inches, response.response[i].weight.pounds + " lbs", 
				response.response[i].nba.start, changeDate(response.response[i].birth.date));
			if (tempPlayer.name == "Jayson Tatum") {
				tempPlayer.jersey = 0;
			}
			if (tempPlayer.name == "Jaylen Brown" || tempPlayer.name == "Jayson Tatum" ||
					tempPlayer.name == "Marcus Smart" || tempPlayer.name == "Robert Williams III" ||
					tempPlayer.name == "Al Horford" || tempPlayer.name == "Grant Williams" ||
					tempPlayer.name == "Malcolm Brogdon" || tempPlayer.name == "Derrick White" ||
					tempPlayer.name == "Payton Pritchard" || tempPlayer.name == "Blake Griffin") {
				completeRoster.push(tempPlayer.roster());
			}
		}

		sort(completeRoster, 0);
		
		
		var html = "<table><tr>";
		for (let i = 0; i < completeRoster.length; i++) {
			if (i != 0) {
				html += "</tr><tr data-href='https://mshxth.github.io/Celtics-Tracker/" 
				+ getLastName(completeRoster[i][0]) + "'>";
			}
			for (let j = 0; j < completeRoster[i].length; j++) {
				if (i == 0) {
					html += '<th>';
					html += completeRoster[i][j];
					html += '</th>';
				}
				else {
					html += '<td>';
					html += completeRoster[i][j];
					html += '</td>';
				}
			}
		}

		html += "</tr></table>";
		document.getElementById("container").innerHTML = html;

  })
	.catch(err => console.error(err));


function changeDate(str) {
	if (str == null) {
		return null;
	}
	return str.substring(5) + "-" + str.substring(0, 4);
}

function sort(roster, x) {
	for (let i = 1; i < roster.length - 1; i++) {
		let min = i;
		for (let j = i + 1; j < roster.length; j++) {
			if (roster[j][x] < roster[min][x]) {
				min = j;
			}
		}
		let temp = roster[min];
		roster[min] = roster[i];
		roster[i] = temp;
	}
}

function maxsort(roster, x) {
	for (let i = 1; i < roster.length - 1; i++) {
		let max = i;
		for (let j = i + 1; j < roster.length; j++) {
			if (roster[j][x] > roster[max][x]) {
				max = j;
			}
		}
		let temp = roster[max];
		roster[max] = roster[i];
		roster[i] = temp;
	}
}

function getLastName(name) {

	if (name == "Robert Williams III") {
		return "williamsiii.html";
	}
	let ret = name.substring(findSpaceIndex(name) + 1) + ".html";
	return ret.toLowerCase();
	
	
	function findSpaceIndex(name) {
		for (let i = 0; i < name.length; i++) {
			if (name.substring(i, i + 1) == " ") {
				return i;
			}
		}
		return -1;
	}
}









	
