// Element
const canvas = document.getElementById("canvasBoard");
const ctx = canvas.getContext("2d");
console.log(canvas, ctx);
// Dimension
canvas.width = 700;
canvas.height = 700;

// Global config
ctx.lineWidth = 10;
ctx.shadowOffsetX=2;
ctx.shadowOffsetY=2;
ctx.shadowColor='white';
// Linear gradient
const gradientCanva = ctx.createLinearGradient(
  0,
  0,
  canvas.width,
  canvas.height
);
gradientCanva.addColorStop("0.2", "red");
gradientCanva.addColorStop("0.3", "pink");
gradientCanva.addColorStop("0.4", "black");
gradientCanva.addColorStop("0.5", "purple");
gradientCanva.addColorStop("0.6", "green");
gradientCanva.addColorStop("0.7", "violet");
gradientCanva.addColorStop("0.8", "orange");
// ctx.strokeStyle=gradientCanva;

// Circle gradient
const radialGradientCanva = ctx.createRadialGradient(
  canvas.width * 0.5,
  canvas.height * 0.5,
  70,
  canvas.width * 0.5,
  canvas.height * 0.5,
  400
);
radialGradientCanva.addColorStop("0.2", "pink");
radialGradientCanva.addColorStop("0.5", "purple");
radialGradientCanva.addColorStop("0.8", "black");
// ctx.strokeStyle = radialGradientCanva;

// Canvas pattern
const patternImage =document.getElementById("patternImage");
const patternCanva = ctx.createPattern(patternImage,'no-repeat')
// ctx.strokeStyle =patternCanva;

// Blue Print
class Line {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.history = [{ x: this.x, y: this.y }];
    // this.endX = Math.random() * this.canvas.width;
    // this.endY = Math.random() * this.canvas.height;
    this.lineWidth = Math.floor(Math.random() * 15 + 1);
    this.hue = Math.floor(Math.random() * 360);

    // limit for lines
    this.maxLength = Math.floor(Math.random() * 150 + 10);

    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = 7;

    this.lifeSpan = this.maxLength * 2;
    this.timer = 0;
  }
  draw(context) {
    context.strokeStyle = "hsl(" + this.hue + ", 100%, 50%)";
    context.lineWidth = this.lineWidth;
    context.beginPath();
    context.moveTo(this.history[0].x, this.history[0].y);

    // sublines
    // for (let i = 0; i < 3; i++) {
    //   this.x = Math.random() * this.canvas.width;
    //   this.y = Math.random() * this.canvas.height;
    //   this.history.push({x:this.x,y:this.y})
    // }
    // mainline
    for (let i = 0; i < this.history.length; i++) {
      context.lineTo(this.history[i].x, this.history[i].y);
    }
    context.stroke();

    // context.lineTo(this.endX, this.endY);
  }
  update() {
    this.timer++;
    if (this.timer < this.lifeSpan) {
      // this.x = Math.random() * this.canvas.width;
      this.x += this.speedX + Math.random() * 20 - 10;
      // this.y = Math.random() * this.canvas.height;
      this.y += this.speedY + Math.random() * 20 - 10;

      this.history.push({ x: this.x, y: this.y });
      if (this.history.length > this.maxLength) {
        this.history.shift();
      }
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
  }
}

const linesArray = [];
const numberOfLines = 50;
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
  // updateline
  // linesArray.forEach((obj) =>);
  requestAnimationFrame(animate);
}
animate();

// Shapes
// top to bottom approach
// ctx.fillRect( X, Y, Width, Height)

// ctx.fillStyle = "red";
// ctx.fillRect(100, 150, 200, 150);
// ctx.lineWidth=10;
// ctx.strokeStyle='blue';
// ctx.strokeRect(100, 150, 200, 150);

// ctx.beginPath()
// ctx.moveTo(300,300);
// ctx.lineTo(350,400);
// ctx.stroke()
