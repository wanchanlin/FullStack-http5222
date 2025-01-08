//BLOCKING VS NON-BLOCKING SCRIPT
//Below lines are blocking (synchronous) code.
console.log("time1");
console.log("time2");
console.log("time3");

//The event handler is an example of non-blocking code (asynchronous code) because it is only executed when the button is clicked.
setTimeout(function(){
    document.getElementById("topsecret").innerHTML="here you go!"
    console.log("set timeout");
},3000);

console.log("time4");
console.log("time5");
console.log("time6");