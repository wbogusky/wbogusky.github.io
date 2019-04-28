// This file was written without reference to any specific existing file
// however I made frequent use of the Coding Train videos by Daniel Shiffman
// for assistance. I'd also like to thank Michael Toren for teaching
// the Computational Practices 1 course.
//
// Goals for this program are:
// Allow users to choose a relevant station and view the appropriate information
//
// Problems with this program are:
// Right now the available trains populate in static rows.
// The trains should animate along their routes. How do I accomplish that?



var bart; // variable stores json data
var trains = []; // stores trains as objects

var stationName;

if (getQueryVariable("abbr" === TRUE){
var abbr = getQueryVariable("abbr"); // abbreviated station name
} else {
  var abbr = "rock";
}
var KEY = "Z7MP-P9E2-9KTT-DWE9"; // key

var url;

var input; // variable for the input field

// function preload(){
//   var d = new Date(); // find the current date
//   var dotw = d.getDay(); // get the day of the week
//
// }

function setup() {
  createCanvas(windowWidth,windowHeight);

  // var button = select('#submit'); // make the button
  // button.mouseClicked(stationAsk); // do the stationAsk function

  url =
    'https://api.bart.gov/api/etd.aspx?cmd=etd&orig=' + abbr +
    '&key=' + KEY + '&json=y';

  print(url);
  setInterval(loadBart, 2000); // refresh the bart data every 2 sec
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if(pair[0] == variable){return pair[1];}
  }
  return(false);
}

// function stationAsk() {
//   trains.splice(0, trains.length); // reset the data
//
//   input = select('#stationInput'); // get user data
//   abbr = input.value(); // put user data into abbr slot of url
//   url =
//       'https://api.bart.gov/api/etd.aspx?cmd=etd&orig=' + abbr +
//       '&key=' + KEY + '&json=y';
//
//   loadJSON(url, gotBart); // try to load json from url
//
//   print(url);
// }

function loadBart(){
  trains.splice(0, trains.length); // reset the data

  loadJSON(url, gotBart); // try to load json from url
}

function gotBart(bart){
  stationName = bart.root.station[0].name;

  // push train objects into trains array
  for (i = 0; i < bart.root.station[0].etd.length; i++) {
    for (j = 0; j < bart.root.station[0].etd[i].estimate.length; j++){
      var train = bart.root.station[0].etd[i].estimate[j];

      trains.push({
          x: parseInt(train.minutes) * 5,
          y: (60 * i)+20,
          w: 20,
          l: 50,
          rotate: 0,
          estimate: train.minutes + 'm',
          dir: bart.root.station[0].etd[i].estimate[j].direction,
          color: train.hexcolor,
      });
    }
  }

  // draw trains
  for (i = 0; i < trains.length; i++) {
    var train = trains[i];
    noStroke();
    fill(train.color)
    rect(train.x, train.y, train.w, train.l, 5);
    fill(0);
    text(train.estimate, train.x, train.y + 20);
    text(train.dir, train.x, train.y + 40);
    // trains.splice(0,trains.length);
  }
}


function draw() {
  rectMode(CENTER)
  rect(width/2, height/2, 0.8*width, 50);
}
