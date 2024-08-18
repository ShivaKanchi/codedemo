class Particle {
  constructor(centerX, centerY, radius, angle) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.angle = angle;
    this.angularSpeed = Math.random() * 0.005 - 0.001;
    this.color = getRandomColor();
  }

  update() {
    this.angle += this.angularSpeed;
    this.x = this.centerX + this.radius * Math.cos(this.angle * (angleX + this.angle / angleX)); //65
    this.y = this.centerY + this.radius * Math.sin(this.angle * (angleY + this.angle / angleY)); //45
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1, 1, Math.PI * 2);
    ctx.fill();
  }
}

class ParticleSystem {
  constructor(centerX, centerY, numParticles, radius) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.particles = [];

    for (let i = 0; i < numParticles; i++) {
      const angle = i / numParticles / (Math.PI * 2);
      const particle = new Particle(centerX, centerY, radius, angle);
      this.particles.push(particle);
    }
  }

  update() {
    for (const particle of this.particles) {
      particle.update();
    }
  }

  draw() {
    for (const particle of this.particles) {
      particle.draw();
    }
  }
}
function animate() {
  particleSystem.update();
  particleSystem.draw();
  requestAnimationFrame(animate);
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const canvas = document.getElementById("canvasBoard");
let rangeEle = document.querySelector("input");
let rangeLabelEle = document.querySelector(".inputRange");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// let angleX = rangeEle.value;
let angleX = 65;
const angleY = angleX - 20;
var particleSystem = new ParticleSystem(canvas.width / 2, canvas.height / 2, 500, (canvas.width * 150) / canvas.height);

// rangeEle.addEventListener("change", (e) => {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   angleX = e.target.value;
//   // rangeLabelEle.innerHTML = rangeEle.value;
//   // particleSystem = new ParticleSystem(canvas.width / 2, canvas.height / 2, 500, (canvas.width * 150) / canvas.height);
// });
animate();
