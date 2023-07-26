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
		
		
		
		
var headerHtml = "<thead><tr>";
for (let i = 0; i < completeRoster[0].length; i++) {
  headerHtml += `<th data-index='${i}'>`; // Set data-index for each header
  headerHtml += completeRoster[0][i];
  headerHtml += '</th>';
}
headerHtml += "</tr></thead>";

var bodyHtml = "<tbody>";
for (let i = 1; i < completeRoster.length; i++) {
  bodyHtml += "<tr data-href='https://mshxth.github.io/Celtics-Tracker/" 
    + getLastName(completeRoster[i][0]) + "'>";
  for (let j = 0; j < completeRoster[i].length; j++) {
    bodyHtml += '<td>';
    bodyHtml += completeRoster[i][j];
    bodyHtml += '</td>';
  }
  bodyHtml += "</tr>";
}
bodyHtml += "</tbody>";

var tableHtml = "<table id='sortable-table'>" + headerHtml + bodyHtml + "</table>";
document.getElementById("container").innerHTML = tableHtml;

function handleRowClick(event) {
  const target = event.target;
  const href = target.closest('tr[data-href]');
  if (href) {
    window.location.href = href.dataset.href;
  }
}
		
// Function to rebuild only the table body after sorting
function rebuildTableBody(roster) {
  const tableBody = document.querySelector('#sortable-table tbody');
  tableBody.innerHTML = '';
  for (let i = 1; i < roster.length; i++) {
    const row = document.createElement('tr');
    row.setAttribute('data-href', `https://mshxth.github.io/Celtics-Tracker/${getLastName(roster[i][0])}`);
    for (let j = 0; j < roster[i].length; j++) {
      const cell = document.createElement('td');
      cell.textContent = roster[i][j];
      row.appendChild(cell);
    }
    tableBody.appendChild(row);
  }
  const tableRows = document.querySelectorAll('tr[data-href]');
  tableRows.forEach(row => {
    row.addEventListener('click', handleRowClick);
  });
}

// Event listeners for each header
const headers = document.querySelectorAll('#sortable-table th');
headers.forEach((header) => {
  header.addEventListener('click', () => {
    const columnIndex = parseInt(header.getAttribute('data-index'));
    const isAscending = !header.classList.contains('asc');
    headers.forEach((h) => h.classList.remove('asc', 'sorted', 'desc'));
    if (isAscending) {
	header.classList.add('asc', 'sorted');
	header.classList.add('asc');
			if (columnIndex == 1) {
				sortByPosition(completeRoster);
			}
			else if (columnIndex == 7) {
				sortByBirthday(completeRoster);
			}
			else {
				sort(completeRoster, columnIndex); // Sort in ascending order
			}
    } else {
      header.classList.add('desc', 'sorted');
      header.classList.remove('asc');
      if (columnIndex == 1) {
				maxSortByPosition(completeRoster);
			}
			else if (columnIndex == 7) {
				maxSortByBirthday(completeRoster);
			}
			else {
				maxSort(completeRoster, columnIndex); // Sort in descending order
			}
    }
    rebuildTableBody(completeRoster); // Rebuild the table body after sorting
  });
});

 const tableRows = document.querySelectorAll('tr[data-href]');
    tableRows.forEach(row => {
      row.addEventListener('click', handleRowClick);
    });


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

function maxSort(roster, x) {
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

function sortByPosition(roster) {
	let arr = ["G", "G-F", "F-G", "F", "C-F"];
	for (let i = 1; i < roster.length - 1; i++) {
		let min = i;
		for (let j = i + 1; j < roster.length; j++) {
			if (arr.indexOf(roster[j][1]) < arr.indexOf(roster[min][1])) {
				min = j;
			}
		}
		let temp = roster[min];
		roster[min] = roster[i];
		roster[i] = temp;
	}
}

function maxSortByPosition(roster) {
	let arr = ["C-F", "F", "F-G", "G-F", "G"];
	for (let i = 1; i < roster.length - 1; i++) {
		let min = i;
		for (let j = i + 1; j < roster.length; j++) {
			if (arr.indexOf(roster[j][1]) < arr.indexOf(roster[min][1])) {
				min = j;
			}
		}
		let temp = roster[min];
		roster[min] = roster[i];
		roster[i] = temp;
	}
}

function sortByBirthday(roster) {
	for (let i = 1; i < roster.length - 1; i++) {
		let min = i;
		for (let j = i + 1; j < roster.length; j++) {
			if (getBirthYear(roster[j][7]) < getBirthYear(roster[min][7])) {
				min = j;
			}
			else if (getBirthYear(roster[j][7]) == getBirthYear(roster[min][7]) &&
							getBirthMonth(roster[j][7]) < getBirthMonth(roster[min][7])) {
				min = j;
			}
		}
		let temp = roster[min];
		roster[min] = roster[i];
		roster[i] = temp;
	}
}

function maxSortByBirthday(roster) {
	for (let i = 1; i < roster.length - 1; i++) {
		let max = i;
		for (let j = i + 1; j < roster.length; j++) {
			if (getBirthYear(roster[j][7]) > getBirthYear(roster[max][7])) {
				max = j;
			}
			else if (getBirthYear(roster[j][7]) == getBirthYear(roster[max][7]) &&
							getBirthMonth(roster[j][7]) > getBirthMonth(roster[max][7])) {
				max = j;
			}
		}
		let temp = roster[max];
		roster[max] = roster[i];
		roster[i] = temp;
	}
}

function getBirthYear(birthday) {
	return birthday.substring(6);
}

function getBirthMonth(birthday) {
	return birthday.substring(0, 3);
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










	
