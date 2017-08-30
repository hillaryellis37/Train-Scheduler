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
// var tTime;
// var tFrequency;

//     // Assumptions

//     // Time is 3:30 AM
// // var firstTime = "03:30";

//     // First Time (pushed back 1 year to make sure it comes before current time)
// var firstTimeConverted = moment(tTime, "hh:mm").subtract(1, "years");
//     // console.log(firstTimeConverted);

//     // Current Time
// var currentTime = moment();
//     // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

//     // Difference between the times
// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//     // console.log("DIFFERENCE IN TIME: " + diffTime);

//     // Time apart (remainder)
// var tRemainder = diffTime % tFrequency;
//     // console.log(tRemainder);

//     // Minute Until Train
// var tMinutesTillTrain = tFrequency - tRemainder;
//     // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

//     // Next Train
// var nextTrain = moment().add(tMinutesTillTrain, "minutes");
//     // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

// var timeNextTrain = moment(nextTrain).format("hh:mm");

$("#add-train").on("click", function(event) {

	event.preventDefault();

	tName = $("#train-name").val().trim();
    tDestination = $("#train-dest").val().trim();
    tTime = $("#train-time").val().trim();
    tFrequency = $("#train-freq").val().trim();

    // console.log(tName);
    // console.log(tDestination);
    // console.log(firstTimeConverted);
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // console.log("DIFFERENCE IN TIME: " + diffTime);
    // console.log(tRemainder);
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    database.ref().push({

    	tName: tName,
    	tDestination: tDestination,
    	tFrequency: tFrequency,
    	tTime: tTime,
    	dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
	

});

database.ref().on("child_added", function(childSnapshot) {

      // console.log(childSnapshot.val().tName);
      // console.log(childSnapshot.val().tDestination);
      // console.log(childSnapshot.val().tFrequency);
      // console.log(childSnapshot.val().tTime);
      // console.log(nextTrain);
      // console.log(tMinutesTillTrain)



      tTime = childSnapshot.val().tTime;
      tFrequency = childSnapshot.val().tFrequency;
var firstTimeConverted = moment(tTime, "hh:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    // Current Time
var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);

    // Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

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