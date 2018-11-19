console.log( "loaded" );

var usernames = [ "prk33", "ber98", "ksj46", "mba75", "sap353" ];
var password = "password";

function checkInput()
{
    var inputUsername = document.getElementById( "username" ).value;
    var inputPassword = document.getElementById( "password" ).value;
    var usernameValid = false;
    var passwordValid = false;
    
    for( username in usernames )
    {
        if(inputUsername === usernames[ username ] )
        {
            usernameValid = true;
        }
    }
    
    if( inputPassword === password )
    {
        passwordValid = true;        
    }
    
    if( usernameValid && passwordValid)
    {
        window.location = "../mainpage/mainpage.html";
    }
    
    usernameValid = passwordValid = false;
}