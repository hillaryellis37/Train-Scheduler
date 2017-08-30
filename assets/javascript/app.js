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


var row = $("<div class='row'></div>");
var col1 = $("<div class='col-md-3' id='name-display'></div>");
var col2 = $("<div class='col-md-3' id='dest-display'></div>");
var col3 = $("<div class='col-md-2' id='freq-display'></div>");
var col4 = $("<div class='col-md-2' id='arrival-display'></div>");
var col5 = $("<div class='col-md-2' id='min-display'></div>");
var rowCol = row.append(col1, col2, col3, col4, col5);
var schedContainer = $(".schedule-container");

$("#add-train").on("click", function(event) {

	event.preventDefault();

	tName = $("#train-name").val().trim();
    tDestination = $("#train-dest").val().trim();
    tTime = $("#train-time").val().trim();
    tFrequency = $("#train-freq").val().trim();

    database.ref().push({

    	tName: tName,
    	tDestination: tDestination,
    	tTime: tTime,
    	tFrequency: tFrequency,
    	dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
	

});

database.ref().on("child_added", function(childSnapshot) {

      console.log(childSnapshot.val().tName);
      console.log(childSnapshot.val().tDestination);
      console.log(childSnapshot.val().tFrequency);
      console.log(childSnapshot.val().tTime);

      $(".schedule-container").append("<div class='row'><div class='col-md-3' id='name-display'>" + childSnapshot.val().tName
       + "</div><div class='col-md-3' id='dest-display'>" + childSnapshot.val().tDestination
       + "</div><div class='col-md-2' id='freq-display'>" + childSnapshot.val().tFrequency
       + "</div><div class='col-md-2' id='arrival-display'>" + childSnapshot.val().tTime
       + "</div><div class='col-md-2' id='min-display'>" + childSnapshot.val().tTime
       + "</div></div><hr>");
      
      // schedContainer.append(rowCol);

      // $("#name-display").html(childSnapshot.val().tName);
      // $("#dest-display").html(childSnapshot.val().tDestination);
      // $("#freq-display").html(childSnapshot.val().tFrequency);
      // $("#arrival-display").html(childSnapshot.val().tTime);
      // $("#min-display").html(childSnapshot.val().tTime);



}, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);

});