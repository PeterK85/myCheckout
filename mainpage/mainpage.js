google.load("jquery", "1.7.1");

$(document).ready(function() {

    $( "#my_button" ).click(function() {
        alert('test');
        return false;
    });

});