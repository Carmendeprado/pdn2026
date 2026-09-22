let xPos 
let yPos 

let xSpeed = 2
let ySpeed = 2

let score = 0

let mouseDist

let ballSize = 20

let menuScreenBool = true
let startGameBool = false
let winGameBool = false

let furby

async function setup(){
	createCanvas(windowWidth, windowHeight)
	xPos = windowWidth/2
	yPos = windowHeight/2

	furby = await loadImage('furby.png')
	imageMode(CENTER)
	
}

function draw(){

	if(menuScreenBool == true){
		menuScreen()
	}
	if(startGameBool == true){
		startGame()
	}

	if(winGameBool == true){
		winGame()
	}

}

function menuScreen(){
	background(0)

	fill(255)
	text(20)
	text('Welcome to Furby Tag! Press the mouse to get started!', 10, 100)
	if(mouseIsPressed){
		menuScreenBool = false
		startGameBool = true
	}

}

function startGame(){
	background(0)

	noCursor()
	fill(255, 0, 0)
	ellipse(mouseX, mouseY, 10, 10)
	
	fill(255)
	textSize(20)
	text('Tag the ball with your mouse! Your score is ' + score + ' points!', 10, 30)

	//ellipse(xPos, yPos, ballSize, ballSize)
	image(furby, xPos, yPos, ballSize, ballSize)

	mouseDist = dist(mouseX, mouseY, xPos, yPos)

	xPos = xPos + xSpeed
	yPos = yPos + ySpeed

	if(xPos >= windowWidth - ballSize/2 || xPos <= ballSize/2){
		xSpeed = xSpeed * -1
		fill(random(255), random(255), random(255))
	}

	if(yPos >= windowHeight - ballSize/2 || yPos <= ballSize/2){
		ySpeed = ySpeed * -1
		fill(random(255), random(255), random(255))
	}

	if(mouseDist < ballSize/2){
		score++

		xPos = random(ballSize/2, windowWidth - ballSize/2)
		yPos = random(ballSize/2, windowHeight - ballSize/2)

		xSpeed = xSpeed * 1.2
		ySpeed = ySpeed * 1.2
	}

	if(score == 5){
		startGameBool = false 
		winGameBool = true
	}

}


function winGame(){
	background(0)

	fill(255)
	text(20)
	text('You Win!!', 10, 100)

	image(furby, windowWidth/2, windowHeight/2, 200, 200)
}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight);

}


