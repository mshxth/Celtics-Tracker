const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'da05989f3amshd43f590771db45ep1017afjsn774606358029',
		'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
	}
};

fetch('https://api-nba-v1.p.rapidapi.com/players/statistics?id=882&team=2&season=2022', options)
	.then(response => response.json())
	.then(response => {
		
		//logs all accessible data in javascript console
		console.log(response);

		//Uses player name to title page and header
		const playerName = fullName(response.response[0].player.firstname, response.response[0].player.lastname);
		document.getElementById("title").innerHTML = playerName + " Stats";
		document.getElementById("header").innerHTML = playerName;

		//represents a players stats for one game
		class PlayerGame {
			constructor(mins, points, assists, rebounds, orebounds, drebounds, steals, blocks, turnovers, fga, fgm, fgp, fta, ftm, ftp, tpa, tpm, tpp, plusMinus) {
				this.mins = mins;
				this.points = points;
				this.assists = assists;
				this.rebounds = rebounds;
				this.orebounds = orebounds;
				this.drebounds = drebounds;
				this.steals = steals;
				this.blocks = blocks;
				this.turnovers = turnovers;
				this.fga = fga;
				this.fgm = fgm;
				this.fgp = fgp;
				this.fta = fta;
				this.ftm = ftm;
				this.ftp = ftp;
				this.tpa = tpa;
				this.tpm = tpm;
				this.tpp = tpp;
				this.plusMinus = plusMinus;
			}
			
			//puts stats of player for one game into array
			stats() {
				let a = [];
				a.push(this.mins);
				a.push(this.points);
				a.push(this.assists);
				a.push(this.rebounds);
				a.push(this.orebounds);
				a.push(this.drebounds);
				a.push(this.steals);
				a.push(this.blocks);
				a.push(this.turnovers);
				a.push(this.fga);
				a.push(this.fgm);
				a.push(this.fgp);
				a.push(this.fta);
				a.push(this.ftm);
				a.push(this.ftp);
				a.push(this.tpa);
				a.push(this.tpm);
				a.push(this.tpp);
				a.push(this.plusMinus);
				return a;
			}
		}

		//creates a 2 dimensional array of players stats for each game for last ten games
		let lastten = [];
		const tableTitle = ["Minutes", "Points", "Assists", "Rebounds", 
		"OR", "DR", "Steals", "Blocks", "Turnovers", 
		"FGA", "FGM", "FGP", "FTA", "FTM", "FTP", "TPA", "TPM", "TPP", "+/-"];
		lastten.push(tableTitle);
		for (let i = response.response.length - 1; i > response.response.length - 11; i--) {
			let temp = new PlayerGame(response.response[i].min,
				response.response[i].points,
				response.response[i].assists,
				response.response[i].totReb,
				response.response[i].offReb, 
				response.response[i].defReb,
				response.response[i].steals,
				response.response[i].blocks,
				response.response[i].turnovers,
				response.response[i].fga,
				response.response[i].fgm,
				response.response[i].fgp,
				response.response[i].fta,
				response.response[i].ftm, 
				response.response[i].ftp,
				response.response[i].tpa,
				response.response[i].tpm,
				response.response[i].tpp,
				response.response[i].plusMinus);
			lastten.push(temp.stats());
		}

		//creates a 2 dimensional array of players stats for each game for last ten games
		let seasonstats = [];
		seasonstats.push(tableTitle);
		for (let i = response.response.length - 1; i > -1; i--) {
			let temp = new PlayerGame(response.response[i].min,
				response.response[i].points,
				response.response[i].assists,
				response.response[i].totReb,
				response.response[i].offReb, 
				response.response[i].defReb,
				response.response[i].steals,
				response.response[i].blocks,
				response.response[i].turnovers,
				response.response[i].fga,
				response.response[i].fgm,
				response.response[i].fgp,
				response.response[i].fta,
				response.response[i].ftm, 
				response.response[i].ftp,
				response.response[i].tpa,
				response.response[i].tpm,
				response.response[i].tpp,
				response.response[i].plusMinus);
			seasonstats.push(temp.stats());
		}


		//makes table for last ten games
		var html = "<table><tr>";
		for (let i = 0; i < lastten.length; i++) {
			if (i != 0) {
				html += "</tr><tr>";
			}
			for (let j = 0; j < lastten[i].length; j++) {
				if (i == 0) {
					html += '<th>';
					html += lastten[i][j];
					html += '</th>';
				}
				else {
					html += '<td>';
					html += lastten[i][j];
					html += '</td>';
				}
			}
		}
		html += "</tr></table>";
		document.getElementById("container").innerHTML = html;

		

		//gets positions of player and implements it into html
		let pos = getPositions();
		document.getElementById("position").innerHTML = "Position: " + pos;
		

		//puts all positions player played this season in string
		function getPositions() {
			let str = response.response[0].pos;
			for (let i = 0; i < response.response.length; i++) {
				if (!str.includes(response.response[i].pos)) {
					str += ", " + response.response[i].pos;
				}
			}
			return str;
		}

		const tableTitle2 = ["", "Minutes", "Points", "Assists", "Rebounds", 
		"OR", "DR", "Steals", "Blocks", "Turnovers", 
		"FGA", "FGM", "FGP", "FTA", "FTM", "FTP", "TPA", "TPM", "TPP", "+/-"];

		//creates an array for average stats of last ten games
		let averageoften = ["Last Ten", averageStat(lastten, 0), 
			averageStat(lastten, 1), averageStat(lastten, 2), averageStat(lastten, 3),
			averageStat(lastten, 4), averageStat(lastten, 5), averageStat(lastten, 6),
			averageStat(lastten, 7), averageStat(lastten, 8), averageStat(lastten, 9),
			averageStat(lastten, 10), averageStat(lastten, 11), averageStat(lastten, 12),
			averageStat(lastten, 13), averageStat(lastten, 14), averageStat(lastten, 15),
			averageStat(lastten, 16), averageStat(lastten, 17), averageStat(lastten, 18)];

		//creates an array for average stats of season
		let averageofseason = ["Season", round(averageStat(seasonstats, 0)), 
			round(averageStat(seasonstats, 1)), round(averageStat(seasonstats, 2)), round(averageStat(seasonstats, 3)),
			round(averageStat(seasonstats, 4)), round(averageStat(seasonstats, 5)), round(averageStat(seasonstats, 6)),
			round(averageStat(seasonstats, 7)), round(averageStat(seasonstats, 8)), round(averageStat(seasonstats, 9)),
			round(averageStat(seasonstats, 10)), round(averageStat(seasonstats, 11)), round(averageStat(seasonstats, 12)),
			round(averageStat(seasonstats, 13)), round(averageStat(seasonstats, 14)), round(averageStat(seasonstats, 15)),
			round(averageStat(seasonstats, 16)), round(averageStat(seasonstats, 17)), round(averageStat(seasonstats, 18))];

		//creates array of arrays of averages
		let averages = [tableTitle2, averageoften, averageofseason];

		//makes table for averages
		var html2 = "<table><tr>";
		for (let i = 0; i < averages.length; i++) {
			if (i != 0) {
				html2 += "</tr><tr>";
			}
			for (let j = 0; j < averages[i].length; j++) {
				if (i == 0) {
					html2 += '<th>';
					html2 += averages[i][j];
					html2 += '</th>';
				}
				else {
					html2 += '<td>';
					html2 += averages[i][j];
					html2 += '</td>';
				}
			}
		}
		html2 += "</tr></table>";
		document.getElementById("container2").innerHTML = html2;


		let totaloften = ["Last Ten", totalStat(lastten, 0), 
			totalStat(lastten, 1), totalStat(lastten, 2), totalStat(lastten, 3),
			totalStat(lastten, 4), totalStat(lastten, 5), totalStat(lastten, 6),
			totalStat(lastten, 7), totalStat(lastten, 8), totalStat(lastten, 9),
			totalStat(lastten, 10), round(totalStat(lastten, 10)/totalStat(lastten, 9)*100), totalStat(lastten, 12),
			totalStat(lastten, 13), round(totalStat(lastten, 13)/totalStat(lastten, 12)*100), totalStat(lastten, 15),
			totalStat(lastten, 16), round(totalStat(lastten, 16)/totalStat(lastten, 15)*100), totalStat(lastten, 18)];

		
		let totalofseason = ["Season", totalStat(seasonstats, 0), 
			totalStat(seasonstats, 1), totalStat(seasonstats, 2), totalStat(seasonstats, 3),
			totalStat(seasonstats, 4), totalStat(seasonstats, 5), totalStat(seasonstats, 6),
			totalStat(seasonstats, 7), totalStat(seasonstats, 8), totalStat(seasonstats, 9),
			totalStat(seasonstats, 10), round(totalStat(seasonstats, 10)/totalStat(seasonstats, 9)*100), totalStat(seasonstats, 12),
			totalStat(seasonstats, 13), round(totalStat(seasonstats, 13)/totalStat(seasonstats, 12)*100), totalStat(seasonstats, 15),
			totalStat(seasonstats, 16), round(totalStat(seasonstats, 16)/totalStat(seasonstats, 15)*100), totalStat(seasonstats, 18)];
		
		let totals = [tableTitle2, totaloften, totalofseason];

		var html3 = "<table><tr>";
		for (let i = 0; i < totals.length; i++) {
			if (i != 0) {
				html3 += "</tr><tr>";
			}
			for (let j = 0; j < totals[i].length; j++) {
				if (i == 0) {
					html3 += '<th>';
					html3 += totals[i][j];
					html3 += '</th>';
				}
				else {
					html3 += '<td>';
					html3 += totals[i][j];
					html3 += '</td>';
				}
			}
		}
		html3 += "</tr></table>";
		document.getElementById("container3").innerHTML = html3;


	})
  
	.catch(err => console.error(err));

  function average(numbers) {
    var total = 0;
    for (let i = 0; i < numbers.length; i++) {
      total += numbers[i];
    }
    return total / numbers.length;
  }

	function fullName(first, last) {
		return first + " " + last;
	}

	function averageStat(array, x) {
		let a = [];
		for (let i = 1; i < array.length; i++) {
			a.push(parseInt(array[i][x]));
		}
		return average(a);
	}

	function totalStat(array, x) {
		let total = 0;
		for (let i = 1; i < array.length; i++) {
			total += parseInt(array[i][x]);
		}
		return total;
	}

	function round(x) {
		return Math.round(x*100)/100;
	}
	


  