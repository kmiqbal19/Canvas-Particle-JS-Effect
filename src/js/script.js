"use strict";
const canvas = document.getElementById("canvas-1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");
// Utils
const genRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
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
    // if (distance < mouse.radius + this.radius) {
    //   console.log("collided");
    // }
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
  let numberOfParticles = Math.floor((canvas.width * canvas.height) / 9000);
  for (let i = 0; i < numberOfParticles; i++) {
    let radius = Math.random() * 5 + 1;
    let x = Math.random() * innerWidth - 2 * radius;
    let y = Math.random() * innerHeight - 2 * radius;
    let dx = Math.random() * 3 - 1.5;
    let dy = Math.random() * 3 - 1.5;
    let color = "blue";
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
}
animate();
