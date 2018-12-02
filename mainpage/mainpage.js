/*
	File: mainpage.js

	Description: This file is used for the logic side of the CS386 Project. It allows the user to create, edit, and manage tables of items.
*/


class CheckoutTable
{
	constructor( name, size )
	{
		this.name = name;
		this.size = size;
		this.array = [];
		for( var index = 0; index < size; index++ )
		{
			this.array.push( "" );
		}
	}

	setIndex( index, item )
	{
		this.array[index] = item;
	}
}

/* Hard coding in tables for MVP */
/* First element would be name of table, and second the number of items in the table */
/*
var table_1 = [ 
"Calculators", "6",
"prk33", "Nov 7",
"ber98", "Nov 6",
" ", " ",
" ", " ",
"ksj46", "Nov 16",
" ", " "				
];

var table_2 = [
"Teeth", "5",
"ber98", "Nov 18",
" ", " ",
" ", " ",
" ", " ",
" ", " "
];

var table_3 = [
"Keys", "1",
"prk33", "Dec 85"
];*/

var table_1 = new CheckoutTable( "Calculators", 12 );
table_1.setIndex(0,"prk33");
table_1.setIndex(1,"dec 45");
table_1.setIndex(4,"bob");
table_1.setIndex(5,"may 85");
var table_2 = new CheckoutTable( "Teeth", 10);
var table_3 = new CheckoutTable( "Keys", 2 );

var MAX_NUM_TABLES = 4;

var table_of_tables = [ table_1, table_2, table_3 ];
var num_of_tables = table_of_tables.length;
var current_table = table_of_tables[0];

document.addEventListener('DOMContentLoaded', function() {
    createButtons();
}, false);

function createButtons()
{
	document.getElementById("left-buttons").innerHTML = "<span class=\"btn\" onclick=\"remove()\">REMOVE</span>";
	if( num_of_tables == 0 )
	{ populateEmptyTableDiv(); return; }
	for( var index = 0; index < num_of_tables; index++ )
	{
		if( current_table == table_of_tables[index] )
		{
			document.getElementById("left-buttons").innerHTML += "<span class=\"btn\" id=\"current-table\">"+table_of_tables[index].name+"</span>";
			continue;
		}
		document.getElementById("left-buttons").innerHTML += "<span class=\"btn\" onclick=\"selectTable("+index+")\">"+table_of_tables[index].name+"</span>"; 
	}
	populateTableDiv();
}

/* Displays the message that there is no tables. */
function populateEmptyTableDiv()
{
	document.getElementById("table-area").innerHTML = "";
	var table = document.createElement("table");
	table.innerHTML = "<tr><th>No Tables</th><tr>";
	document.getElementById("table-area").appendChild( table );
	return; 
}

function populateTableDiv()
{
	document.getElementById("table-area").innerHTML = "";
	var table = document.createElement("table");
	
	table.innerHTML = "<tr class=\"first\"><th>Item ID</th><th>Student CASID</th><th>Due Date</th></tr>"
	for( var index = 0, id_num = 1; index < current_table.size; index++, id_num++ )
	{
		table.innerHTML += "<tr><td>"+id_num+"</td><td class=\"casID\" contenteditable id=\""+index+"\" onfocusout=\"editTable("+index+")\">"+current_table.array[index]+"</td><td>"+current_table.array[++index]+"</td></tr>";		
	}
	document.getElementById("table-area").appendChild( table );
}

function editTable( index )
{
	var regex = /^[a-z]{3}\d{1,5}$/;
	var user_input = document.getElementById(index).innerHTML;
	if( regex.test( user_input ) || user_input == "" )
	{
		current_table.setIndex( index, user_input );
		var date = getDueDate();
		current_table.setIndex( index + 1, date );
		populateTableDiv();
		return;
	}
	alert("Please enter a valid CASID");
	document.getElementById(index).innerHTML = current_table.array[index];
}

function getDueDate()
{
	var date = new Date();
	var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
	var months_thirty = [ 3, 5, 8, 10 ];
	var months_thirty_one = [ 0, 2, 4, 6, 7, 9, 11 ];
	var temp_month = date.getMonth();
	var current_day = date.getDate();
	var temp_date =  current_day + 14;
	if( temp_date > 28 && temp_month == 1 )
	{
		temp_month = 2;
		temp_date -= 31;
	}
	else if( temp_date > 30 && months_thirty.includes( temp_month ) )
	{
		temp_month++;
		current_day -= 30;
	}
	else if( temp_date > 31 && months_thirty_one.includes( temp_month ) )
	{
		temp_month++;
		current_day -= 31;
	}

	if( temp_month == 12 ){ temp_month = 0; }

	return months[temp_month] + " " + temp_date;
}

/* Removes current table after confirming with the user. Sets the new current table to the first on in the list. */
function remove()
{
	var validation = confirm("Are you sure you want to delete the " + current_table.name + " table?");
	if( !validation ){ return; }
	if( num_of_tables == 0 ){ return; }
	var index_to_remove;
	for(var index = 0; index < num_of_tables; index++ )
	{
		if( table_of_tables[index] == current_table )
		{
			index_to_remove = index;
			break;
		}
	}
	table_of_tables.splice( index_to_remove, 1 );
	num_of_tables--;
	if( num_of_tables == 0 ){ createButtons(); return; }
	current_table = table_of_tables[0];
	createButtons();
}

function selectTable( index )
{
	current_table = table_of_tables[index];
	createButtons();
}

function addTable()
{
	if( num_of_tables == MAX_NUM_TABLES )
	{ alert("You may only have 4 tables at this time."); closePopUp(); return; }
	var name = document.getElementById("name-table").value;
	var num = parseInt(document.getElementById("num-items").value);
	if( ( typeof name ) != "string" || ( typeof num ) != "number" || num <= 0 || isNaN(num)  )
	{
		alert("Please enter a name and/or the number of items you want.");
		return;
	}
	/* MUST MULTIPLY NUM BY 2 TO GET CORRECT SIZE BECAUSE JAVASCRIPT IS STUPID. */
	table_of_tables.push( new CheckoutTable( name, num * 2 ) );
	num_of_tables++;
	current_table = table_of_tables[ table_of_tables.length - 1 ];
	createButtons();
	closePopUp();
}


/*
	Pop-up Menu Functionality
*/

/* Sets the pop up div visible. */
function showPopUp()
{
	document.getElementById("pop-up-container").style.display = "block";
}

/* Makes the pop invisible and remove any values entered into input fields. */
function closePopUp()
{
	document.getElementById("pop-up-container").style.display = "none";
	document.getElementById("name-table").value = "";
	document.getElementById("num-items").value = "";
}

/* Close the window when the user clicks outside of the pop up area */
window.onclick = function(event)
{
    if( event.target == document.getElementById("pop-up-container") )
    {
        closePopUp();
    }
}

