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

var tName;
var tDestination;


$("#add-train").on("click", function(event) {

	event.preventDefault();

	tName = $("#train-name").val().trim();
    tDestination = $("#train-dest").val().trim();
    tTime = $("#train-time").val().trim();
    tFrequency = $("#train-freq").val().trim();

    database.ref().push({

    	tName: tName,
    	tDestination: tDestination,
    	tFrequency: tFrequency,
    	tTime: tTime,
    	dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
	

});

database.ref().on("child_added", function(childSnapshot) {

    tTime = childSnapshot.val().tTime;
    tFrequency = childSnapshot.val().tFrequency;

	var firstTimeConverted = moment(tTime, "hh:mm").subtract(1, "years");

	var currentTime = moment();

	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

	var tRemainder = diffTime % tFrequency;

	var tMinutesTillTrain = tFrequency - tRemainder;

	var nextTrain = moment().add(tMinutesTillTrain, "minutes");

	var timeNextTrain = moment(nextTrain).format("hh:mm");


      $(".schedule-container").append("<div class='row'><div class='col-md-3' id='name-display'>" + childSnapshot.val().tName
       + "</div><div class='col-md-3' id='dest-display'>" + childSnapshot.val().tDestination
       + "</div><div class='col-md-2' id='freq-display'>" + childSnapshot.val().tFrequency
       + "</div><div class='col-md-2' id='arrival-display'>" + timeNextTrain
       + "</div><div class='col-md-2' id='min-display'>" + tMinutesTillTrain
       + "</div></div><hr>");
      
}, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);

});