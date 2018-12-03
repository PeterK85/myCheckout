var index = 0;

function runTest()
{
    var newp = document.createElement("p");
    newp.innerHTML = "This is a new test" + ++index;
    document.body.appendChild(newp);
}