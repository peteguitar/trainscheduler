/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
 var config = {
    apiKey: "AIzaSyD4f4PMDuh7rEjJ_kE4I3l4-aDfdsKHnPE",
    authDomain: "train-scheduler-d392b.firebaseapp.com",
    databaseURL: "https://train-scheduler-d392b.firebaseio.com",
    storageBucket: "train-scheduler-d392b.appspot.com",
    messagingSenderId: "390266006109"

};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trName = $("#tr-name-input").val().trim();
  var destName = $("#dest-name-input").val().trim();
  var trStart = moment($("#tr-start-input").val().trim(), "DD/MM/YY").format("X");
  var trfrequency = $("#tr-frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newtr = {
    name: trName,
    destination: destName,
    start: trStart,
    rate: trfrequency
  };

  // Uploads train data to the database
  database.ref().push(newtr);

  // Logs everything to console
  console.log(trName.name);
  console.log(destName.destination);
  console.log(trStart.start);
  console.log(trfrequency.frequency);

  // Alert
  alert("Employee successfully added");

  // Clears all of the text-boxes
  $("#tr-name-input").val("");
  $("#dest-name-input").val("");
  $("#tr-Start-input").val("");
  $("#tr-frequency-input").val("");

  // Prevents moving to new page
  return false;
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trName = childSnapshot.val().name;
  var destName = childSnapshot.val().role;
  var trStart = childSnapshot.val().start;
  var trfrequency = childSnapshot.val().rate;

  // Employee Info
  console.log(trName);
  console.log(destRole);
  console.log(trStart);
  console.log(trFrequency);

 

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
  console.log(empMonths);

  // Calculate the total billed rate
  var empBilled = empMonths * empRate;
  console.log(empBilled);

  // Add each train's data into the table
  $("#trName-table > tbody").append("<tr><td>" + trName + "</td><td>" + destRole + "</td><td>" +
  trStart + "</td><td>" + trFrequency + "</td><td>" + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
