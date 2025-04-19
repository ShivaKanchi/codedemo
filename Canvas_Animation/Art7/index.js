class PixelTrail {
  constructor(canvasElement) {
    this.trail = [];
    this.pixelSize = 25;
    this.currentPos = { x: 0, y: 0 };
    this.easingFactor = 0.15;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.isMoving = false;
    this.showCursor = true;
    const sketch = (p) => {
      this.p = p; // Store p5 instance
      p.setup = () => this.setup();
      p.draw = () => this.draw();
    };

    // Initialize p5 sketch if canvasElement exists
    if (canvasElement) {
      new p5(sketch, canvasElement);
    } else {
      console.log("No canvas found. PixelTrail not initialized.");
    }
    console.log(":: PixelTrail ::");
  }

  setup() {
    console.log("-- setup --");
    // this.p.createCanvas(800, 600);
    this.p.createCanvas(this.p.windowWidth, this.p.windowHeight);
    this.p.windowResized = () => {
      this.p.resizeCanvas(this.p.windowWidth, this.p.windowHeight);
    };

    this.pixelSize = Math.floor(this.p.width / 35); // 40x40 pixels
    // Could width / 15 (~53) enhance the trail?
    this.p.noStroke();
    this.p.noSmooth(); // Disable anti-aliasing for crisp pixels
    if (!this.showCursor) {
      this.p.noCursor(); // Hide cursor if showCursor is false
    }
    // Alternatively, uncomment below to hide cursor:
    // this.p.noCursor();
    this.initColors();
  }

  initColors() {
    // Define rainbow colors using p5 context
    this.rainbowColors = [
      this.p.color(255, 0, 0), // Red
      this.p.color(255, 165, 0), // Orange
      this.p.color(255, 255, 0), // Yellow
      this.p.color(0, 128, 0), // Green
      this.p.color(0, 0, 255), // Blue
      this.p.color(75, 0, 130), // Indigo
      this.p.color(128, 0, 128), // Violet
    ];
    // Define three shades per color
    this.shades = [
      [
        this.p.color(255, 100, 100),
        this.p.color(200, 50, 50),
        this.p.color(150, 0, 0),
      ], // Red
      [
        this.p.color(255, 200, 100),
        this.p.color(255, 165, 50),
        this.p.color(200, 120, 0),
      ], // Orange
      [
        this.p.color(255, 255, 150),
        this.p.color(255, 255, 0),
        this.p.color(200, 200, 0),
      ], // Yellow
      [
        this.p.color(100, 255, 100),
        this.p.color(0, 128, 0),
        this.p.color(0, 80, 0),
      ], // Green
      [
        this.p.color(100, 100, 255),
        this.p.color(0, 0, 255),
        this.p.color(0, 0, 150),
      ], // Blue
      [
        this.p.color(150, 100, 200),
        this.p.color(75, 0, 130),
        this.p.color(50, 0, 100),
      ], // Indigo
      [
        this.p.color(200, 100, 200),
        this.p.color(128, 0, 128),
        this.p.color(80, 0, 80),
      ], // Violet
    ];
  }

  calculateSteps(dist) {
    let steps = Math.floor(dist / this.pixelSize) + 1;
    if (dist > this.pixelSize) {
      steps += Math.floor(dist / this.pixelSize); // Denser for faster movement
    }
    return steps;
  }

  updateTrail(targetX, targetY, currentTime) {
    // Detect movement
    this.isMoving =
      Math.abs(targetX - this.lastMouseX) > 1 ||
      Math.abs(targetY - this.lastMouseY) > 1;
    this.lastMouseX = targetX;
    this.lastMouseY = targetY;

    // Apply easing
    if (this.isMoving) {
      this.currentPos.x += (targetX - this.currentPos.x) * this.easingFactor;
      this.currentPos.y += (targetY - this.currentPos.y) * this.easingFactor;
    }

    // Snap to grid
    let x = Math.round(this.currentPos.x / this.pixelSize) * this.pixelSize;
    let y = Math.round(this.currentPos.y / this.pixelSize) * this.pixelSize;

    // Add new position if moving and position changed
    if (
      this.isMoving &&
      (this.trail.length === 0 ||
        this.trail[this.trail.length - 1].x !== x ||
        this.trail[this.trail.length - 1].y !== y)
    ) {
      let time = this.p.millis();
      let colorIndex = Math.floor(
        ((time % 2000) / 2000) * this.rainbowColors.length
      );
      let shadeIndex = Math.floor(this.p.random(3));
      let pixelColor = this.shades[colorIndex][shadeIndex];
      this.trail.push({ x: x, y: y, time: time, color: pixelColor });
    }

    // Remove old positions
    this.trail = this.trail.filter((pos) => currentTime - pos.time < 2000);
    // Would 3 seconds show more of the trail?
  }

  drawTrail() {
    if (this.isMoving || this.trail.length > 0) {
      this.p.noStroke(); // Ensure no border on pixels
      for (let i = 0; i < this.trail.length - 1; i++) {
        let p1 = this.trail[i];
        let p2 = this.trail[i + 1];
        let dx = p2.x - p1.x;
        let dy = p2.y - p1.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let steps = this.calculateSteps(dist);
        for (let j = 0; j <= steps; j++) {
          let t = j / steps;
          let px = p1.x + t * dx;
          let py = p1.y + t * dy;
          px = Math.round(px / this.pixelSize) * this.pixelSize;
          py = Math.round(py / this.pixelSize) * this.pixelSize;
          this.p.fill(p1.color);
          this.p.rect(px, py, this.pixelSize, this.pixelSize);
          // Try for a "blob" effect:
          // this.p.ellipse(px + this.pixelSize/2, py + this.pixelSize/2, this.pixelSize, this.pixelSize);
        }
      }
      if (this.trail.length > 0) {
        this.p.fill(this.trail[this.trail.length - 1].color);
        this.p.rect(
          this.trail[this.trail.length - 1].x,
          this.trail[this.trail.length - 1].y,
          this.pixelSize,
          this.pixelSize
        );
      }
    }
  }

  draw() {
    // Clear canvas with solid black (no gradient background)
    this.p.background(0);
    // Could this.p.clear() be used for a transparent background?

    // Get target position
    let targetX =
      this.p.touches.length > 0 ? this.p.touches[0].x : this.p.mouseX;
    let targetY =
      this.p.touches.length > 0 ? this.p.touches[0].y : this.p.mouseY;

    // Update and draw trail
    this.updateTrail(targetX, targetY, this.p.millis());
    this.drawTrail();
  }
}

const canvasElement = document.getElementById("canvasBoard");
if (canvasElement) {
  new PixelTrail(canvasElement);
}
