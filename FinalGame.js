let notifImg;
let notifX = [];
let notifY = [];
let notifVX = []; 
let notifVY = []; 

let maxLimit = 10;

// Timers
let gameTimer = 15; 
let spawnTimer = 0;
let baseSpawnInterval = 1200; 

// Particle system for Victory Fireworks
let fireworks = [];

async function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  
  notifImg = await loadImage('bell.png');
}

function draw() {
  // 1. MAIN GAME TIMER
  if (frameCount % 60 === 0 && gameTimer > 0 && notifX.length < maxLimit) {
    gameTimer--;
  }

  // 2. PROGRESSIVE DIFFICULTY
  let currentInterval = map(gameTimer, 15, 0, baseSpawnInterval, 400);

  if (gameTimer > 0 && notifX.length < maxLimit) {
    if (millis() - spawnTimer > currentInterval) {
      notifX.push(random(60, windowWidth - 60));
      notifY.push(random(60, windowHeight - 60));
      
      notifVX.push(random(-2, 2));
      notifVY.push(random(-2, 2));
      
      spawnTimer = millis();
    }
  }

  // 3. UPDATE POSITION AND BOUNCE
  for (let i = 0; i < notifX.length; i++) {
    notifX[i] += notifVX[i];
    notifY[i] += notifVY[i];

    if (notifX[i] < 35 || notifX[i] > windowWidth - 35) notifVX[i] *= -1;
    if (notifY[i] < 35 || notifY[i] > windowHeight - 35) notifVY[i] *= -1;
  }

  // 4. BACKGROUND LOGIC
  if (notifX.length >= maxLimit) {
    let pulse = map(sin(frameCount * 0.15), -1, 1, 100, 255);
    background(pulse, 20, 20); // Flashing alarm background on overload
  } else if (gameTimer === 0) {
    background(15, 25, 35); // Dark night sky for fireworks display
  } else {
    background(240); // Standard background
  }

  // Draw grid (only if game is ongoing)
  if (gameTimer > 0 && notifX.length < maxLimit) {
    stroke(200);
    strokeWeight(1);
    for (let x = 0; x < windowWidth; x += 30) {
      line(x, 0, x, windowHeight);
    }
  }

  // Draw moving notifications
  if (notifX.length < maxLimit && gameTimer > 0) {
    for (let i = 0; i < notifX.length; i++) {
      image(notifImg, notifX[i], notifY[i], 60, 60);
    }
  }

  // 5. STYLISH & DYNAMIC TIMER HUD
  if (gameTimer > 0 && notifX.length < maxLimit) {
    noStroke();
    let timerBgColor = color(30, 30, 30, 220);
    let timerTextColor = color(255);

    if (gameTimer <= 5) {
      let warnPulse = map(sin(frameCount * 0.2), -1, 1, 150, 255);
      timerBgColor = color(warnPulse, 50, 50, 230);
    }

    fill(timerBgColor);
    rectMode(CENTER);
    rect(windowWidth / 2, 45, 220, 50, 15);

    fill(timerTextColor);
    textAlign(CENTER, CENTER);
    textSize(22);
    textStyle(BOLD);
    text("TIME: " + gameTimer + "s", windowWidth / 2, 45);
    textStyle(NORMAL);

    textSize(13);
    fill(50);
    text("Active notifications: " + notifX.length + " / " + maxLimit, windowWidth / 2, 85);
    text("Dismiss moving notifications before overload!", windowWidth / 2, 105);
  }

  // 6. GAME OVER OR VICTORY FIREWORKS
  if (notifX.length >= maxLimit) {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(38);
    textStyle(BOLD);
    text("DIGITAL OVERLOAD!", windowWidth / 2, windowHeight / 2 - 20);
    textSize(22);
    text("GAME OVER", windowWidth / 2, windowHeight / 2 + 25);
    textStyle(NORMAL);
    textSize(16);
    text("Press 'r' to restart the game", windowWidth / 2, windowHeight / 2 + 75);

  } else if (gameTimer === 0) {
    // FIREWORKS SYSTEM
    if (frameCount % 20 === 0) {
      let launchX = random(windowWidth * 0.2, windowWidth * 0.8);
      let targetY = random(windowHeight * 0.2, windowHeight * 0.5);
      let fireworkColor = color(random(100, 255), random(100, 255), random(255));
      
      for (let i = 0; i < 40; i++) {
        let angle = random(TWO_PI);
        let speed = random(2, 6);
        fireworks.push({
          x: launchX,
          y: targetY,
          vx: cos(angle) * speed,
          vy: sin(angle) * speed,
          alpha: 255,
          color: fireworkColor
        });
      }
    }

    // Update and draw fireworks particles
    noStroke();
    for (let i = fireworks.length - 1; i >= 0; i--) {
      let p = fireworks[i];
      fill(red(p.color), green(p.color), blue(p.color), p.alpha);
      ellipse(p.x, p.y, 6, 6);
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 4; // Fade out effect

      if (p.alpha <= 0) {
        fireworks.splice(i, 1);
      }
    }

    // Victory Banner
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(42);
    textStyle(BOLD);
    text("YOU SURVIVED!", windowWidth / 2, windowHeight / 2 - 20);
    textSize(22);
    fill(100, 255, 150);
    text("Digital Wellness Achieved!", windowWidth / 2, windowHeight / 2 + 25);
    textStyle(NORMAL);
    textSize(16);
    fill(200);
    text("Press 'r' to play again", windowWidth / 2, windowHeight / 2 + 75);
  }
}

// 7. DISMISS OR PENALIZE ON MOUSE CLICK
function mouseClicked() {
  if (gameTimer > 0 && notifX.length < maxLimit) {
    let hit = false;

    for (let i = notifX.length - 1; i >= 0; i--) {
      if (dist(mouseX, mouseY, notifX[i], notifY[i]) < 35) {
        notifX.splice(i, 1);
        notifY.splice(i, 1);
        notifVX.splice(i, 1);
        notifVY.splice(i, 1);
        hit = true;
        break;
      }
    }

    if (!hit) {
      notifX.push(mouseX);
      notifY.push(mouseY);
      notifVX.push(random(-3, 3));
      notifVY.push(random(-3, 3));
    }
  }
}

// 8. PRESS 'R' TO RESTART
function keyPressed() {
  if (key === 'r' || key === 'R') {
    notifX = [];
    notifY = [];
    notifVX = [];
    notifVY = [];
    fireworks = [];
    gameTimer = 15;
    spawnTimer = millis();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}