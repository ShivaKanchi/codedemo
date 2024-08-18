const numberOfLines = 500;
// Element
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
  }
}

class Effect {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  init() {
    this.particles.push(new Particle());
  }
}

class Line {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.history = [{ x: this.x, y: this.y }];
    this.lineWidth = Math.floor(Math.random() *  + 1);
    this.hue = Math.floor(Math.random() * 200 + 190 );
    this.maxLength = Math.floor(Math.random() * 100 + 2);
    this.lifeSpan = this.maxLength * 2;
    this.breakPoint = this.lifeSpan * 0.85;
    this.timer = 0;
    this.angle = 0;
    this.va = Math.random() * 0.5 - 0.25;
    this.curve = 1;
    this.vc = Math.random() * 0.5 - 0.25;
  }
  draw(context) {
    context.strokeStyle = "hsl(" + this.hue + ", 100%, 50%)";
    context.lineWidth = this.lineWidth;
    context.beginPath();
    context.moveTo(this.history[0].x, this.history[0].y);

    for (let i = 0; i < this.history.length; i++) {
      context.lineTo(this.history[i].x, this.history[i].y);
    }
    context.stroke();
  }
  update() {
    this.timer++;
    this.angle += this.va;
    this.curve += this.vc;
    if (this.timer < this.lifeSpan) {
      this.x += 0;
      this.y += 0.50;
      this.history.push({ x: this.x, y: this.y });
    
    } else if (this.history.length <= 1) {
      this.reset();
    } else {
      this.history.shift();
    }
  }
  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.history = [{ x: this.x, y: this.y }];
    this.timer = 0;
    this.angle = 0;
    this.curve = 0;
    this.va = Math.random() * 0.5 - 0.25;
  }
}

const linesArray = [];
for (let i = 0; i < numberOfLines; i++) {
  linesArray.push(new Line(canvas));
}

console.log(linesArray);
// linesArray.forEach((obj) => obj.draw(ctx));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  linesArray.forEach((obj) => {
    obj.draw(ctx);
    obj.update();
  });
  requestAnimationFrame(animate);
}
animate();
