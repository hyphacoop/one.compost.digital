 fCount = 220;
 fDiv = 5;
 let img;
 starting = 24.0;
 spread = 6.0;

function setup() {
  createCanvas(1024, 1024);
  //smooth(8);
  //frameRate(30);  
  img = loadImage('IGF.png');
  strokeWeight(2);
  noFill();
}

 
function draw() {
 /* if (frameCount > fCount) {
  frameCount = 0;
  noLoop();
  }*/
  //println(frameCount);

  background(255);
  image(img, 0,0);
  // first 100 frames out
  
  // next 200 frames in
   //step;
  /*if (frame <) 
    step = easeInExpo(mouseX, 0, 30, 40);
  else
    step = 20 - easeInExpo(mouseX, 0, 30, 180);
  //println(step);*/
  let m= map(mouseX,0,1024,0,220);
  if (m<50)
  step = easeInExpo(m,0,30,40);
  else
  step = 20 - easeInExpo(m, 0, 30, 150);  
  
   rad0 = starting * step/2.0;
  for ( n = 0; n < 3; n++) {
    push();
    
    translate(width/2.0, height/2.0+20);
    rotate(radians(-90*n));
    translate(120.0, 0);
    
    for ( i = 0; i < 8; i++) {
       rad = rad0 + i * step * spread;
       opa = 255.0 - map(rad, 0, width, 0, 255);
      stroke(229, 225,0, 70);
      ellipse(0, 0, rad, rad);  
    }
    
    pop();
  }
  
  //// video
  //if (frameCount >= 0) saveFrame("output/frame########.png");
  // gif
  //if (frameCount % fDiv == 0) saveFrame("output/frame####.gif");
}

function easeInExpo ( t,  b,  c,  d){
  return c * pow( 2, 10 * (t/d - 1) ) + b;
}
