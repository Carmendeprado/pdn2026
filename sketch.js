let eyeballHeight = 100;
let bgR = 222, bgG = 44, bgB = 172;
let img;

function preload() {
  img = loadImage('ojo.png');
}

function setup() {
  createCanvas(600, 700);
  rectMode(CENTER);
}

function draw() {
  background(bgR, bgG, bgB);
  
  image(img, 250, 100, 100, 100);

  // Línea original
  stroke(120, 40, 200);
  strokeWeight(15);
  line(50, 100, 500, 600);
  point(200, 300);

  fill(255);
  stroke(0);
  strokeWeight(2);
  ellipse(300, 350, 150, eyeballHeight);
  fill(0);
  ellipse(300, 350, 40, 40);
}

function mousePressed() {
  bgR = random(255);
  bgG = random(255);
  bgB = random(255);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    eyeballHeight += 10;
  } else if (keyCode === DOWN_ARROW){
    eyeballHeight -= 10;
  }
}