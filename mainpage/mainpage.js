/*
	TODO: make the second index in the table array, the amount of items in the table.
*/
var table_1 = [ 
"Calculators",
"prk33", "Nov 7",
"ber98", "Nov 6",
" ", " ",
" ", " ",
"ksj46", "Nov 16",
" ", " "				
];

var table_2 = [
"Teeth"
];

var table_3 = [
"Keys"
];

var MAX_NUM_TABLES = 4;

var table_of_tables = [ table_1, table_2, table_3 ];
var num_of_tables = table_of_tables.length;
var current_table = table_of_tables[0][0];

document.addEventListener('DOMContentLoaded', function() {
    createButtons();
}, false);

function createButtons()
{
	document.getElementById("left-buttons").innerHTML = "<span class=\"btn\" onclick=\"remove()\">REMOVE</span>";
	for( var index = 0; index < num_of_tables; index++ )
	{
		if( current_table == table_of_tables[index][0] )
		{
			document.getElementById("left-buttons").innerHTML += "<span class=\"btn\" id=\"current-table\">"+table_of_tables[index][0]+"</span>";
			continue;
		}
		document.getElementById("left-buttons").innerHTML += "<span class=\"btn\" onclick=\"selectTable("+index+")\">"+table_of_tables[index][0]+"</span>"; 
	}
}

function remove()
{
	var index_to_remove;
	for(var index = 0; index < num_of_tables; index++ )
	{
		if( table_of_tables[index][0] == current_table )
		{
			index_to_remove = index;
			break;
		}
	}
	table_of_tables.splice( index_to_remove, 1 );//TODO remove current table
	num_of_tables--;
	current_table = table_of_tables[0][0];
	createButtons();
}

function selectTable( index )
{
	current_table = table_of_tables[index][0];
	createButtons();
}

function addTable()
{
	if( num_of_tables == MAX_NUM_TABLES ){ return; }
	var name = document.getElementById("name-table").value;
	var num = document.getElementById("num-items").value;
	console.log(name);
	console.log(num);
	var new_array = [];
	new_array.push( name );
	new_array.push( num );
	for( var index = 3; index < num; index++ )
	{
		new_array.push( " " );
	}
	table_of_tables.push( new_array );
	num_of_tables++;
	createButtons();
	closePopUp();
}


/*
	Pop-up Menu Functionality
*/
var pop_up = document.getElementById("pop-up-container");
var add_btn_page = document.getElementById("add-table-btn");
var close_btn = document.getElementsByClassName("close")[0];

function showPopUp()
{
	document.getElementById("pop-up-container").style.display = "block";
}

function closePopUp()
{
	document.getElementById("pop-up-container").style.display = "none";
	document.getElementById("name-table").value = "";
	document.getElementById("num-items").value = "";
}

window.onclick = function(event)
{
    if( event.target == document.getElementById("pop-up-container") )
    {
        document.getElementById("pop-up-container").style.display = "none";
        document.getElementById("name-table").value = "";
		document.getElementById("num-items").value = "";
    }
}

