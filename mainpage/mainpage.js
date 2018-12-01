/*
	TODO: make the second index in the table array, the amount of items in the table.
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
	//TODO: iterate over the table array and populate the table.
	//the second element will be size of the table.
	//each iteration will append three items to a new table row:
	//the id of the number or index (start counter at 1 and condition will be <= size)
	//the casid, and return date
	//if casid and return date are empty then just add the " "
	//I don't think I will have to do any checking for this since " " will 
	//be added to the innerHTML just fine.
	for( var index = 0, id_num = 1; index < current_table.size; index++, id_num++ )
	{
		table.innerHTML += "<tr><td>"+id_num+"</td><td class=\"casID\" contenteditable onfocus=\"editTable()\">"+current_table.array[index]+"</td><td>"+current_table.array[++index]+"</td></tr>";		
	}
	document.getElementById("table-area").appendChild( table );
}

function editTable()
{
	console.log("focused");
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

