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

var MAX_NUM_TABLES = 3;

var table_of_tables = [ table_1, table_2, table_3 ];
var num_of_tables = table_of_tables.length;
var current_table = table_of_tables[0][0];

document.addEventListener('DOMContentLoaded', function() {
    createButtons();
}, false);

function createButtons()
{
	for( var index = 0; index < num_of_tables; index++ )
	{
		document.getElementById("left-buttons").innerHTML += "<span>"+table_of_tables[index][0]+"</span>"; 
	}
}

function remove()
{

}
