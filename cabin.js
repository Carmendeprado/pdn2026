let cabinBool = true
let spaceBool = false

function setup(){
	createCanvas(windowWidth, windowHeight)
}

function draw(){
	if(cabinBool == true){
		cabinScene()
	}
	if(spaceBool == true){
		spaceScene()
	}
}

function cabinScene(){
	background(135, 206, 235)

	fill(255, 223, 0)
	noStroke()
	circle(100, 100, 80)

	fill(120, 130, 140)
	triangle(100, 400, 300, 150, 500, 400)
	triangle(350, 400, 550, 200, 750, 400)

	fill(34, 139, 34)
	rect(0, 380, windowWidth, windowHeight)

	fill(139, 69, 19)
	rect(250, 280, 160, 120)

	fill(178, 34, 34)
	triangle(230, 280, 330, 200, 430, 280)

	fill(101, 67, 33)
	rect(310, 340, 40, 60)

	fill(220, 240, 255)
	square(270, 310, 30)

	fill(100, 100, 100)
	rect(380, 210, 20, 40)

	fill(230, 230, 230, 180)
	ellipse(390, 190, 25, 20)

	stroke(101, 67, 33)
	strokeWeight(12)
	line(650, 330, 650, 410)
	noStroke()

	fill(0, 100, 0)
	circle(650, 310, 80)
}

function spaceScene(){
	background(10, 10, 25)

	fill(255)
	noStroke()
	circle(150, 80, 4)
	circle(300, 150, 6)
	circle(500, 90, 5)
	circle(700, 200, 4)

	fill(138, 43, 226)
	circle(200, 220, 120)

	fill(160, 160, 180)
	rect(0, 350, windowWidth, windowHeight)

	fill(220, 220, 220)
	ellipse(550, 180, 120, 40)

	fill(0, 255, 255, 200)
	circle(550, 170, 40)

	fill(255, 50, 50)
	triangle(510, 190, 490, 210, 520, 195)
	triangle(590, 190, 610, 210, 580, 195)
}

function keyPressed(){
	if(key === 'c' || key === 'C'){
		cabinBool = true
		spaceBool = false
	}

	if(key === 'e' || key === 'E'){
		spaceBool = true
		cabinBool = false
	}
}