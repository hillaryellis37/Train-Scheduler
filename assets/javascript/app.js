var config = {
    apiKey: "AIzaSyCsn7_8-3uCVfT_awEJaI6lnbjiG76dWUg",
    authDomain: "train-scheduler-a3c5c.firebaseapp.com",
    databaseURL: "https://train-scheduler-a3c5c.firebaseio.com",
    projectId: "train-scheduler-a3c5c",
    storageBucket: "train-scheduler-a3c5c.appspot.com",
    messagingSenderId: "613159696624"
  };
firebase.initializeApp(config);
var database = firebase.database();

var tName = "";
var tDestination = "";
var tTime = 0;
var tFrequency = "";

    $("#add-train").on("click", function() {
	event.preventDefault();

	tName = $("#train-name").val().trim();
    tDestination = $("#train-dest").val().trim();
    tTime = $("#train-time").val().trim();
    tFrequency = $("#train-freq").val().trim();

    database.ref().set({
    	tName: tName,
    	tDestination: tDestination,
    	tTime: tTime,
    	tFrequency: tFrequency
    });
	
	alert("clicked");
	console.log(tName);

});