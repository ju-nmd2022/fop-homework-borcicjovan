// Welcome!

function setup() {
  createCanvas(600, 650);
  frameRate(35);
  background(255, 255, 255);
}

// variables used
let state = "start";
let pengx = 550;
let pengy = -420;
let velocity = 1;
let acceleration = 0.2;
let wingAngle = 0;

// key functions

function keyPressed() {
  if (state === "start" && keyCode === 32) {
    state = "game";
  } else if (state === "lose" && keyCode === 32) {
    state = "game";
    pengx = 550;
    pengy = -420;
  } else if (state === "win" && keyCode === 32) {
    state = "game";
    pengx = 550;
    pengy = -420;
  }
}

// snow in the background, code taken from Garrit, just looped

let particles = [];

function createParticle() {
  const x = Math.random() * width;
  const y = Math.random() * height;
  const v = 0.2 + Math.random();
  return { x: x, y: y, velocity: v };
}

function drawParticle(particle) {
  push();
  translate(particle.x, particle.y);
  noStroke();
  fill(255, 255, 255, 140);
  ellipse(0, 0, 3);
  pop();
}

function updateParticle(particle) {
  particle.y = particle.y + particle.velocity;
  if (particle.y > height) {
    particle.y = 0;
  }
}

for (let i = 0; i < 500; i++) {
  const particle = createParticle();
  particles.push(particle);
}

// penguin drawing

function penguin(pengx, pengy) {
  push();

  translate(300, pengy);

  push();

  stroke(255, 255, 255);

  // body
  fill(110, 110, 110);
  ellipse(0, 400, 80, 100);

  // head
  fill(150, 150, 150);
  ellipse(0, 360, 50, 60);

  // wings
  fill(150, 150, 150);
  push();
  translate(-25, 400);
  rotate((sin(wingAngle) * PI) / 8);
  triangle(0, 0, -35, -30, -5, -40);
  pop();
  push();
  translate(25, 400);
  rotate((-sin(wingAngle) * PI) / 8);
  triangle(0, 0, 35, -30, 5, -40);
  pop();

  wingAngle += 0.1;

  pop();

  // belly
  fill(255);
  ellipse(0, 420, 50, 60);

  // eyes
  fill(255);
  ellipse(-15, 350, 10);
  ellipse(15, 350, 10);

  // beak
  fill(255, 215, 0);
  triangle(0, 370, -10, 340, 10, 340);

  // feet
  fill(255, 215, 0);
  triangle(-20, 453, -10, 438, -30, 438);
  triangle(20, 453, 10, 438, 30, 438);

  pop();
}

// ice gleciar drawing

function ice() {
  push();

  fill(0, 190, 255);
  stroke(255, 255, 255);
  strokeWeight(3);
  ellipse(0, 600, 180, 100);
  ellipse(50, 630, 180, 100);
  ellipse(550, 630, 180, 100);
  ellipse(600, 620, 80, 180);
  rect(0, 600, 700, 100);

  pop();
}

// first screen

function FirstScreen() {
  background(0, 0, 0);
  for (let particle of particles) {
    drawParticle(particle);
    updateParticle(particle);
  }

  ice(600, 600);

  push();

  fill(255, 255, 255);
  textSize(40);
  text("Press space to start 🧊", 140, 200);

  pop();

  push();

  fill(255, 255, 255);
  textSize(20);
  text("Press the up key to control the penguin. 🐧", 150, 250);

  pop();
}

// second screen

function SecondScreen() {
  background(0, 0, 0);
  for (let particle of particles) {
    drawParticle(particle);
    updateParticle(particle);
  }

  ice(600, 600);
  penguin(pengx, pengy, 0.4, keyIsDown(38));

  pengy = pengy + velocity;
  velocity = velocity + acceleration;

  if (keyIsDown(38)) {
    velocity = velocity - 0.5;
  }

  if (pengy >= 150 && velocity > 4) {
    velocity = 1;
    acceleration = 0.2;
    state = "lose";
  } else if (pengy >= 150 && velocity < 4) {
    velocity = 0;
    state = "win";
  }
}

// screen if they win

function Win() {
  background(0, 0, 0);
  for (let particle of particles) {
    drawParticle(particle);
    updateParticle(particle);
  }

  ice(600, 600);
  penguin(pengx, pengy, 0.4, keyIsDown(38));

  push();

  fill(80, 117, 175);
  textSize(60);
  text("DIDN'T DIE! 🤯", 130, 200);

  pop();

  push();

  fill(255, 255, 255);
  textSize(20);
  text("An overachiver? 😮‍💨 Play again.", 185, 250);

  pop();
}

// screen if they loose

function Lose() {
  background(0, 0, 0);
  for (let particle of particles) {
    drawParticle(particle);
    updateParticle(particle);
  }

  ice(600, 600);

  push();

  fill(255, 255, 255);
  textSize(35);
  text("GIRLIE... I did not make it... 🪦💔", 70, 200);

  pop();

  push();

  fill(255, 255, 255);
  textSize(20);
  text("Try again? 😮‍💨 Press space.", 185, 250);

  pop();
}

// making everything show up

function draw() {
  if (state === "start") {
    FirstScreen();
  } else if (state === "game") {
    SecondScreen();
  } else if (state === "win") {
    Win();
  } else if (state === "lose") {
    Lose();
  }
}
