// what's broken?
// display platform #s as text


var bart; // variable stores json data

var trains = []; // stores trains as objects

var abbr = getQueryVariable("abbr"); // abbreviated station name
var stationName; // full station name
var qtyPlatforms; // number of platforms at this station

var KEY = "Z7MP-P9E2-9KTT-DWE9"; // key
var url; // API url

// objects
var pill; // train icons
var centerBar; // station icon

// trying to account for when you access
// the page without a station specified by the url
if (abbr === false){
  abbr = "rock";
}

function setup() {
  print(abbr);

  // load stationInfo
  print('https://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=' + abbr +
  '&key=' + KEY + '&json=y');
  loadJSON('https://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=' + abbr +
  '&key=' + KEY + '&json=y', gotStation)

  createCanvas(windowWidth,windowHeight); // fullscreen

  centerBar = { // station icon as object
    width: width-100,
    height: 150,
    round: 40,
  }

  pill = { // train icon as object
    width: (centerBar.width/3) - 20,
    height: 60,
    round: 30,
  }

  colorMode(HSB);
  rectMode(CENTER); // easier to position shapes

  url = // assembling url
    'https://api.bart.gov/api/etd.aspx?cmd=etd&orig=' + abbr +
    '&key=' + KEY + '&json=y';

  print(url); // makes accessing the original json quicker

  loadJSON(url, gotBart); // try to load json from url for the first time
  setInterval(loadBart, 2000); // refresh the bart data every 2 sec
}

// this function was found via google on css-tricks.com
// https://css-tricks.com/snippets/javascript/get-url-variables/
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");

  for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if(pair[0] == variable){return pair[1];}
  }

  return(false);
}

// this function runs every two seconds after setup
function loadBart(){
  trains.splice(0, trains.length); // reset the data

  loadJSON(url, gotBart); // try to load json from url
}

// function to draw center bar
function bar(){
  push();
  fill(50);
  noStroke();

  rect(
    width/2,
    height/2,
    centerBar.width,
    centerBar.height,
    centerBar.round,
  );

  // draw centerBar text
  fill(100);
  textSize(centerBar.height*0.4);
  textAlign(LEFT, CENTER);
  text(stationName, 100, height/2);
  pop();
}

function gotStation(stn){
  stn = stn.root.stations.station;

  qtyPlatforms = stn.north_platforms.platform.length + stn.south_platforms.platform.length;
  print(qtyPlatforms);
}

// this function runs if the bart data is loaded
function gotBart(bart){
  stationName = bart.root.station[0].name; // pull full station name for reference in draw()
  var offset = (width - centerBar.width)/2;
  var space = centerBar.width/(qtyPlatforms+1);

  background(20); // clear old trains

  // draw tracks
  for (i = 0; i < qtyPlatforms; i++){
    stroke(15);
    strokeWeight(10);
    line(space * (i+1) + offset, 0, space * (i+1) + offset, height);
  }

  // push train objects into trains array
  for (i = 0; i < bart.root.station[0].etd.length; i++) {
    for (j = 0; j < bart.root.station[0].etd[i].estimate.length; j++){
      var train = bart.root.station[0].etd[i].estimate[j];

      trains.push({
          x: (space * parseInt(train.platform) + offset),
          y: (train.minutes * height / 120) + centerBar.height/2,
          w: pill.width,
          h: pill.height,
          round: pill.round,
          estimate: train.minutes,
          dir: train.direction,
          destination: bart.root.station[0].etd[i].destination,
          hexcolor: train.hexcolor,
          color: train.color,
      });
    }
  }

  // draw trains
  for (i = 0; i < trains.length; i++) {
    var train = trains[i];

    // mirror behavior for southbound trains
    if (train.dir === "South"){
      var flip = -1;
    } else {
      var flip = 1;
    }

    push();
    // draw train
    noStroke();
    fill(train.hexcolor);
    translate(0, height/2);
    rect(train.x, train.y * flip, train.w, train.h, train.round);

    // draw train text
    if (train.color === "YELLOW"){
      fill(0);
    } else {
      fill(255);
    }

    textAlign(CENTER, CENTER);
    textSize(pill.height*0.4);
    textStyle(BOLD);
    text(train.estimate + " min - " + train.destination, train.x, train.y * flip);
    pop();

    // draw centerBar
    bar();
  }
}

function draw() {
  bar();
}
