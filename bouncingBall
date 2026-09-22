let xPos 
let yPos 

let xSpeed = 2
let ySpeed = 2


function setup(){
	createCanvas(windowWidth, windowHeight)
	xPos = windowWidth/2
	yPos = windowHeight/2
	

}


function draw(){
	background(0)
	ellipse(xPos, yPos, 100, 100)

	xPos = xPos + xSpeed
	yPos = yPos + ySpeed

	if(xPos >= windowWidth - 50 || xPos <= 50){
		xSpeed = xSpeed * -1
		fill(random(255), random(255), random(255))
	}

	if(yPos >= windowHeight -50 || yPos <= 50){
		ySpeed = ySpeed * -1
		fill(random(255), random(255), random(255))
	}

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

}


