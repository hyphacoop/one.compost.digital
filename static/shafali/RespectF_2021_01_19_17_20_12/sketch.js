/*int fCount = 15*30;
int fDiv = 4;

void setup() {
  size(640, 640);  
  frameRate(30);
  smooth(4);
  noStroke();
  colorMode(HSB, 360, 100, 100, 100);
}

void draw() {
  if (frameCount > fCount) {
    frameCount = 0;
    noLoop();
  }
  println(frameCount);
  
  background(360);
  
  translate(width/2.0, height/2.0);
  float rad = width*0.35;
  
  blendMode(SUBTRACT);

  fill(360, 100, 100, 100); // red
  noiseSeed(1);
  blobCircle(rad);
  
  fill(135, 100, 100, 100); // green
  noiseSeed(2);
  blobCircle(rad);

  fill(225, 100, 100, 100); // blue
  noiseSeed(3);
  blobCircle(rad);


  // video
  //saveFrame("output/frame########.png");
  // gif
  if (frameCount % fDiv == 0) saveFrame("output/frame####.gif");
}

void blobCircle(float rad) {
  beginShape();
  for (float i = 0; i < 360; i += 1) {
    float x = sin(radians(i));
    float y = cos(radians(i));
    
    x += 0.45*(noise(x+frameCount/120.0)-0.5);
    y += 0.45*(noise(y+frameCount/120.0)-0.5);
    
    x *= rad;
    y *= rad;
    
    vertex(x, y);
  }
  endShape(CLOSE);
}*/
let fCount = 15*30;
let fDiv = 4;
let img;

function setup() {
  createCanvas(1024, 1024, WEBGL);
  //frameRate(30);
  //smooth(4);
  noStroke();
  colorMode(HSB, 360, 100, 100, 100);
  img = loadImage('RespectF.png');
}

function draw() {
  /*if (frameCount > fCount) {
    frameCount = 0;
    //noLoop();
  }*/
  background(255);
  
   //translate(width/2.0, height/2.0);
  let rad = width*0.4;
  
  //blendMode();
  //ellipse(100,100,100);

  fill('#b3fffc'); // red
  noiseSeed(1);
  blobCircle(rad);
  
  fill('#fb62f6');// green
  //fill('#f69679');
  noiseSeed(3);
  blobCircle(rad);

  fill('#f2ff49'); // blue
  //fill('#f69679');
  noiseSeed(5);
  blobCircle(rad);
  image(img,-512,-512);
}

function blobCircle(rad) {
  beginShape();
  for ( i = 0; i < 360; i += 1) {
    let x = sin(radians(i));
    let y = cos(radians(i));
    
    x += 0.45*(noise(x+mouseX/80.0)-0.5);
    y += 0.45*(noise(y+mouseX/80.0)-0.5);
    
    x *= rad;
    y *= rad;
    
    vertex(x, y);
  }
  endShape(CLOSE);
  
  
}
