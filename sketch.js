var bart; // variable stores json data
var trains = []; // stores trains as objects
var abbr = getQueryVariable("abbr"); // abbreviated station name

if (abbr === undefined){
  abbr = "rock";
}

var stationName;
var KEY = "Z7MP-P9E2-9KTT-DWE9"; // key
var url;
var input; // variable for the input field

function setup() {
  createCanvas(windowWidth,windowHeight);

  colorMode(HSB);
  rectMode(CENTER);

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
          x: width/4,
          y: parseInt(train.minutes) * 5,
          w: width/4,
          h: 50,
          rotate: 0,
          estimate: train.minutes + 'm',
          dir: bart.root.station[0].etd[i].estimate[j].direction,
          color: train.hexcolor,
      });
    }
  }

  // draw trains
  background(25);
  for (i = 0; i < trains.length; i++) {
    var train = trains[i];

    if (train.dir === "South"){
      var flip = -1;
    } else {
      var flip = 1;
    }

    push();
    noStroke();
    fill(train.color);
    translate(width/2, height/2);
    rect(train.x * flip, train.y * flip, train.w, train.h, 10);

    fill(0);
    text(train.estimate, train.x * flip, train.y * flip);
    text(train.dir, train.x * flip, train.y * flip + 20);
    pop();
    
    push();
    fill(50);
    noStroke();
    rect(width/2, height/2, width-100, 50, 10);

    fill(100);
    textSize(25);
    textStyle(BOLD);
    text(stationName, 75, height/2+8);
    pop();
  }
}


function draw() {
  push();
  fill(50);
  noStroke();
  rect(width/2, height/2, width-100, 50, 10);

  fill(100);
  textSize(25);
  textStyle(BOLD);
  text(stationName, 75, height/2+8);
  pop();
}
