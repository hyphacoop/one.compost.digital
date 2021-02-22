

var tileCount = 5;
var actRandomSeed = 0;

var circleAlpha=130;
var circleColor;
let img;

function setup() {
  createCanvas(1024, 1024);
  //noFill();
  noStroke();
  circleColor = color('#ec008c');
   img = loadImage('Bias.png');
}

function draw() {
  //translate(width / tileCount / 2, height / tileCount / 2);

  background(255);
  image(img,0,0);
  randomSeed(actRandomSeed);
  fill(circleColor);
  if(mouseX>512)
    {
  circleColor.setAlpha(mouseX-512);
       ellipse(512, 512, (mouseX-512)*1.55, (mouseX-512)*1.55);
    }
  else
    {
   circleColor.setAlpha(512-mouseX); 
       ellipse(512, 512, (512-mouseX)*1.55, (512-mouseX)*1.55);
    }
}

function mousePressed() {
  actRandomSeed = random(100000);
}

