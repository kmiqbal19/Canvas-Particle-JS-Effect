"use strict";
const canvas = document.getElementById("canvas-1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");
// Utils
const colors = ["red", "blue", "cyan", "orange", "limegreen"];
const genRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const getRandomColor = (colors) => {
  return colors[Math.floor(Math.random() * colors.length)];
};
// Mouse Position
const mouse = {
  x: undefined,
  y: undefined,
  radius: 100,
};
// Event Listeners
window.addEventListener("resize", function (e) {
  canvas.width = this.innerWidth;
  canvas.height = this.innerHeight;
  init();
});
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener("mouseout", (e) => {
  mouse.x = undefined;
  mouse.y = undefined;
});
// Particle Object Constructor
function Particle(x, y, radius, dx, dy, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.dx = dx;
  this.dy = dy;
  this.color = color;
  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  };
  this.update = () => {
    // Check if particle is still within canvas
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    // Check Collision Detection
    let distanceX = mouse.x - this.x;
    let distanceY = mouse.y - this.y;
    let distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
    if (distance < mouse.radius + this.radius) {
      if (mouse.x < this.x && this.x < canvas.width - this.radius * 10) {
        this.x += 10;
      }
      if (mouse.x > this.x && this.x > this.radius * 10) {
        this.x -= 10;
      }
      if (mouse.y < this.y && this.y < canvas.height - this.radius * 10) {
        this.y += 10;
      }
      if (mouse.y > this.y && this.y > this.radius * 10) {
        this.y -= 10;
      }
    }
    // General Velocity Increase
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };
}

// Initialize
let particles = [];
function init() {
  particles = [];
  let numberOfParticles = Math.floor((canvas.width * canvas.height) / 8000);
  for (let i = 0; i < numberOfParticles; i++) {
    let radius = Math.random() * 7 + 1;
    let x = Math.random() * innerWidth - 2 * radius;
    let y = Math.random() * innerHeight - 2 * radius;
    let dx = Math.random() * 3 - 1.5;
    let dy = Math.random() * 3 - 1.5;
    let color = getRandomColor(colors);
    particles.push(new Particle(x, y, radius, dx, dy, color));
  }
}
init();
// Animation
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => {
    particle.update();
  });
  connect();
}
animate();
// Check if particles are close enough to draw line between them
function connect() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      let x = particles[a].x - particles[b].x;
      let y = particles[a].y - particles[b].y;

      let distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
      if (distance < 100) {
        c.beginPath();
        c.lineWidth = 1;
        c.moveTo(particles[a].x, particles[a].y);
        c.lineTo(particles[b].x, particles[b].y);
        c.strokeStyle = "white";
        c.stroke();
      }
    }
  }
}
