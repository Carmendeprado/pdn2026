
let furby

let lineBrushBool = false
let ellipseBrushBool = false
let imageBrushBool = false 


async function setup (){
	createCanvas(windowWidth, windowHeight)
	background(255)
	furby = await loadImage('furby.png')
	imageMode(CENTER)
}


 function draw (){
	
if (lineBrushBool == true){
	lineBrush ()
}
if (ellipseBrushBool == true){
	ellipseBrush()
}
if(imageBrushBool == true){
	imageBrush()
}
}

function lineBrush(){
	if(mouseIsPressed){
		stroke(random(255), random(255), random(255))
		line(pmouseX, pmouseY, mouseX, mouseY)
	}
}

function ellipseBrush(){
	if(mouseIsPressed){
		fill(random(255), random(255), random(255))
		ellipse(mouseX, mouseY, 20, 20)
	}
}

function imageBrush(){
	if(mouseIsPressed){
		image(furby, mouseX, mouseY, 15, 15)
	}
}

function keyPressed(){

	if(key =='l'){
		lineBrushBool = true
		ellipseBrushBool = false
		imageBrushBool = false
	}

	if(key =='e'){
		ellipseBrushBool = true
		imageBrushBool = false
		lineBrushBool = false
	}


	if(key =='f'){
		imageBrushBool = true
		ellipseBrushBool = false
		lineBrushBool = false
	}

	if(key =='c'){
		lineBrushBool = false
		ellipseBrushBool = false
		imageBrushBool = false
		background(255)
	}
}







