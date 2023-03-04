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

// put into draw
function draw() {
  background(0, 0, 0);
  for (let particle of particles) {
    drawParticle(particle);
    updateParticle(particle);
  }
}
