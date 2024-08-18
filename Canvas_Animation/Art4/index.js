const canvas = document.getElementById("canvasBoard");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = "black";
ctx.strokeStyle = "white";

class Particle {
  constructor(effect) {
    this.effect = effect;
    // this.raidus = Math.random() * 5 + 2;
    this.raidus = 2;
    this.x = this.raidus + Math.random() * (this.effect.width - this.raidus * 2);
    this.y = this.raidus + Math.random() * (this.effect.height - this.raidus * 2);
    this.velocityX = Math.random() * 4 - 2;
    this.velocityY = Math.random() * 4 - 2;
    // this.color = "hsl(" + Math.random() * 360 + ",100%,50%)";
  }
  draw(context) {
    // context.fillStyle = Math.floor(Math.random() * 2 - 0) == 0 ? "magenta" : "black";
    context.beginPath();
    context.arc(this.x, this.y, this.raidus, 0, Math.PI * 2);
    context.fill();
  }
  update() {
    this.x += this.velocityX;
    if (this.x > this.effect.width - this.raidus || this.x < this.raidus + 1) this.velocityX *= -1;

    this.y += this.velocityY;
    if (this.y > this.effect.height - this.raidus || this.y < this.raidus + 1) this.velocityY *= -1;
  }
}

class Effect {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = [];
    this.numberOfParticles = 399;
    this.createParticles();
  }
  createParticles() {
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }
  handleParticles(context) {
    this.connnectParticles(context);
    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.update();
    });
  }
  connnectParticles(context) {
    const maxDistance = 100;
    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a; b < this.particles.length; b++) {
        // Imagining a 90deg triangle with edges of particle a and b
        const dx = this.particles[a].x - this.particles[b].x;
        const dy = this.particles[a].y - this.particles[b].y;
        const distance = Math.hypot(dx, dy); //Pythagoras formula and getting hypothense
        if (distance < maxDistance) {
          context.save();
          const opacity = 1 - distance / maxDistance;
          context.globalAlpha = opacity;
          context.beginPath();
          context.moveTo(this.particles[a].x, this.particles[a].y);
          context.lineTo(this.particles[b].x, this.particles[b].y);
          context.stroke();
          context.restore();
        }
      }
    }
  }
}

const effect = new Effect(canvas);
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.handleParticles(ctx);
  requestAnimationFrame(animate);
}
animate();
