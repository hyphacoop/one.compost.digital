let img, img1, img2;// Declare variable 'img'.
let x=2, count=0;

function setup() {
  createCanvas(1024, 1024);
  
  img = loadImage('Asset1.png');
  img1 = loadImage('BallF.png');
   img2 = loadImage('cowF.png');
  // img3 = loadImage('Asset1.png');
  // Load the image
}

function draw() {
  
  // Displays the image at its actual size at point (0,0)
  //background('#FFDD00');
  if(x%3==0&&x%5==0) 
  {
    if (count==1){
    image(img1, mouseX,mouseY);
   
    }
    
    if (count==2){
    image(img2, mouseX,mouseY);
   
    }
    
    /*if (count==3){
    image(img3, mouseX,mouseY);
   
    }*/
    
    if (count==0){
    image(img, mouseX,mouseY,100,100);
    }
    
    
    
    if(count>2) count=0;
  }
  if (mouseIsPressed){
    //background('#FFDD00');
    count++;
  }
  // Displays the image at point (0, height/2) at half size
  x++;//image(img, 0, height / 2, img.width / 2, img.height / 2);
}
