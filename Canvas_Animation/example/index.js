const canvas = document.getElementById("canvasBoard");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Global Config
ctx.lineWidth = 1;
ctx.fillStyle = "white";
ctx.strokeStyle = "white";

// Blue Print
class Particle {
  constructor(effect) {
    this.effect = effect;

    // Each particle will have x & y
    this.x = Math.floor(Math.random() * this.effect.width);
    this.y = Math.floor(Math.random() * this.effect.height);

    // To move one pixel per frame + Direction & motion -ve & +ve
    this.speedX;
    this.speedY;
    this.speedModifier = Math.floor(Math.random() * 10 + 0);
    // To keep a track of position
    this.history = [{ x: this.x, y: this.y }];

    // Max number of segments
    this.maxLength = Math.floor(Math.random() * 500 + 10);

    // angle / Trigonometry
    this.angle = 0;
    this.timer = this.maxLength * 2;

    this.hue = Math.floor(Math.random() * 360 + 0);
    this.color = "hsl(" + this.hue + ", 100%, 50%)";

    // this.colors = ["#0f86b6", "#37cae5", "#f5db37", "#fbefc"];
    // this.colors = ["blue", "red"];
    // this.color = this.colors[Math.floor(Math.random() * this.colors.length + 0)];
  }
  draw(context) {
    // context.fillRect(this.x, this.y, 10, 10);

    // To Draw Lines
    context.beginPath();
    context.moveTo(this.history[0].x, this.history[0].y);
    for (let i = 0; i < this.history.length; i++) {
      context.lineTo(this.history[i].x, this.history[i].y);
    }
    context.strokeStyle = this.color;
    context.stroke();
  }
  update() {
    this.timer--;
    if (this.timer >= 1) {
      let x = Math.floor(this.x / this.effect.cellSize);
      let y = Math.floor(this.y / this.effect.cellSize);
      // Index of that angle value
      let index = y * this.effect.cols + x;

      this.angle = this.effect.flowField[index];

      this.speedX = Math.cos(this.angle);
      this.speedY = Math.sin(this.angle);

      this.x += this.speedX * this.speedModifier;
      this.y += this.speedY * this.speedModifier;

      this.history.push({ x: this.x, y: this.y });

      if (this.history.length > this.maxLength) {
        this.history.shift();
      }
    } else if (this.history.length > 1) {
      this.history.shift();
    } else {
      this.reset();
    }
  }
  reset() {
    this.x = Math.floor(Math.random() * this.effect.width);
    this.y = Math.floor(Math.random() * this.effect.height);
    this.history = [{ x: this.x, y: this.y }];
    this.timer = this.maxLength * 2;
  }
}

class Effect {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = [];
    this.numberOfParticles = 600;

    // Cells for grid
    this.cellSize = 10;
    this.rows;
    this.cols;
    this.flowField = [];
    this.curve = 3.6; // this.zoom =Math.random() * 0.09 + 0.05;
    this.zoom = 0.065;
    this.debug = false;
    this.init();

    this.canvas.addEventListener("click", (e) => {
      console.log("clicked", this.curve);
      this.curve = Math.floor(Math.random() * 100 - 1) / 1000;
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "d") this.debug = !this.debug;
    });

    window.addEventListener("resize", (e) => {
      console.log();
      this.resize(e.target.innerWidth, e.target.innerHeight);
    });
  }
  init() {
    // Create flow field
    this.rows = Math.floor(this.height / this.cellSize);
    this.cols = Math.floor(this.width / this.cellSize);
    this.flowField = [];
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        let angle = (Math.cos(c * this.zoom) + Math.sin(r * this.zoom)) * this.curve;
        this.flowField.push(angle);
      }
    }
    // Create Particles
    this.particles = [];
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }

  drawGrid(context) {
    context.save();
    context.strokeStyle = "red";
    context.lineWidth = 0.3;
    for (let c = 0; c < this.cols; c++) {
      context.beginPath();
      context.moveTo(this.cellSize * c, 0);
      context.lineTo(this.cellSize * c, this.height);
      context.stroke();
    }
    for (let r = 0; r < this.rows; r++) {
      context.beginPath();
      context.moveTo(0, this.cellSize * r);
      context.lineTo(this.width, this.cellSize * r);
      context.stroke();
    }
    context.restore();
  }
  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    // this.init()
  }
  render(context) {
    if (this.debug) this.drawGrid(context);
    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.update();
    });
  }
}

const effect = new Effect(canvas);
effect.init();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.render(ctx);
  requestAnimationFrame(animate);
}
animate();
