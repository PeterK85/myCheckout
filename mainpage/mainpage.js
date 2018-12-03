/*
	File: mainpage.js

	Description: This file is used for the logic side of the CS386 Project. It allows the user to create, edit, and manage tables of items.
	
	Author: Peter Kurtz
*/

/*
	Class for a checkout table that holds a name, the size and an array. The array will always be an even size.
	The array can be thought of as groups of two, the first part a CASID, and the second part the due date for the particular student.
	Since JavaScript is "special" you don't have declared variables you set class variables in the constructor by setting a variable with 
	the prefix "this.". So "this.name" creates a variable for the class called "name." And in this class there is an array. Arrays inside 
	of classes need to have a function to assign values to different indicies.
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
var table_1 = new CheckoutTable( "Calculators", 12 );
table_1.setIndex(0,"prk33");
table_1.setIndex(1,"Dec 15");
table_1.setIndex(4,"ber98");
table_1.setIndex(5,"Dec 16");
table_1.setIndex(6, "kst42");
table_1.setIndex(7, "Dec 16");
table_1.setIndex(10, "msd7");
table_1.setIndex(11, "Dec 18");
var table_2 = new CheckoutTable( "Teeth", 10);
table_2.setIndex(2, "ksj46");
table_2.setIndex(3, "Dec 18");
table_2.setIndex(4, "mba75");
table_2.setIndex(5, "Dec 18");
var table_3 = new CheckoutTable( "Keys", 20 );
table_3.setIndex(0, "sap353");
table_3.setIndex(1, "Dec 18");
table_3.setIndex(2, "ber98");
table_3.setIndex(3, "Dec 18");
table_3.setIndex(4, "prk33");
table_3.setIndex(5, "Dec 18");
table_3.setIndex(6, "mba75");
table_3.setIndex(7, "Dec 18");
table_3.setIndex(8, "ksj46");
table_3.setIndex(9, "Dec 18");

/* The current max amount of tables is 4 becuase once more than a certain threshold is passed the styling looks weird. */
var MAX_NUM_TABLES = 4;

/* An array and information about checkout tables. */
var table_of_tables = [ table_1, table_2, table_3 ];
var num_of_tables = table_of_tables.length;
var current_table = table_of_tables[0];

/* Loads the tables the first time the page is loaded. */
document.addEventListener('DOMContentLoaded', function() {
    createButtons();
}, false);

/* Creates the tabs on the top left for the different tables and the REMOVE button. And makes the user know which table is selected. */
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

/* Dynamically create HTML table elements to display the current table. */
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

/* Checks if the user put in a valid CASID by checking against a regex. */
function editTable( index )
{
	var regex = /^[a-z]{3}\d{1,5}$/;
	var user_input = document.getElementById(index).innerHTML;
	if( regex.test( user_input ) )
	{
		current_table.setIndex( index, user_input );
		var date = getDueDate();
		current_table.setIndex( index + 1, date );
		populateTableDiv();
		return;
	}
	if( user_input == "" ){ current_table.setIndex( index + 1, "" ); populateTableDiv(); return; }
	alert("Please enter a valid CASID");
	document.getElementById(index).innerHTML = current_table.array[index];
}

/* Calculates the due date of the item, 2 weeks from the current date. */
/* DOES NOT ACCOUNT FOR LEAP YEAR. */
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
		temp_date -= 28;
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

/* Used for visiually showing the current table that the user selects. */
function selectTable( index )
{
	current_table = table_of_tables[index];
	createButtons();
}

/* Lets the user create new tables up to the max amout of tables, 4. */
function addTable()
{
	if( num_of_tables == MAX_NUM_TABLES )
	{ 
		alert("You may only have 4 tables at this time."); 
		closePopUp(); 
		return; 
	}

	var name = document.getElementById("name-table").value;
	var num = parseInt(document.getElementById("num-items").value);

	/* Error handling to make sure the user puts in a name and a number. */
	if( ( typeof name ) != "string" || ( typeof num ) != "number" || num <= 0 || isNaN(num)  )
	{
		alert("Please enter a name and/or the number of items you want.");
		return;
	}

	/* MUST MULTIPLY NUM BY 2 TO GET CORRECT SIZE BECAUSE JAVASCRIPT IS STUPID. */
	table_of_tables.push( new CheckoutTable( name, num * 2 ) );
	num_of_tables++;

	/* Set the current table to the new table that was just created. */
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
