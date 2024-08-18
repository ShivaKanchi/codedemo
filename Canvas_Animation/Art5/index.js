const canvas = document.getElementById("canvasBoard");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = "red";
class Particle {
  constructor(effect) {
    this.effect = effect;
    this.raidus = Math.random() * 50 + 5;
    this.x = this.raidus + Math.random() * (this.effect.width - this.raidus * 2);
    this.y = this.raidus + Math.random() * (this.effect.height - this.raidus * 2);
    this.velocityX = Math.random() * 4 - 2;
    this.velocityY = Math.random() * 4 - 2;
  }
  draw(context) {
    context.fillStyle = "hsl(" + this.x * 0.5 + ",100%,50%)";
    context.beginPath();
    context.arc(this.x, this.y, this.raidus, 0, Math.PI * 2);
    context.fill();
    context.stroke();
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
    this.numberOfParticles = 100;
    this.createParticles();
  }
  createParticles() {
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }
  handleParticles(context) {
    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.update();
    });
  }
}

const effect = new Effect(canvas);
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.handleParticles(ctx);
  requestAnimationFrame(animate);
}
animate();
