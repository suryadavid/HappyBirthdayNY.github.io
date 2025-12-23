const flCanvas = document.getElementById("flowers");
const flCtx = flCanvas.getContext("2d");

function resizeFL() {
  flCanvas.width = window.innerWidth;
  flCanvas.height = window.innerHeight;
}
resizeFL();
window.addEventListener("resize", resizeFL);

let flowers = [];

class Flower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.petals = [];
    this.radius = 0;
    this.maxRadius = 25 + Math.random() * 20;
    this.life = 180;

    const petalCount = 8 + Math.floor(Math.random() * 4);
    const colors = ["#ff69b4", "#ffd1dc", "#ffffff"];

    for (let i = 0; i < petalCount; i++) {
      this.petals.push({
        angle: (Math.PI * 2 / petalCount) * i,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  update() {
    if (this.radius < this.maxRadius) {
      this.radius += 0.6; // efek mekar
    }
    this.life--;
  }

  draw() {
    this.petals.forEach(p => {
      const px = this.x + Math.cos(p.angle) * this.radius;
      const py = this.y + Math.sin(p.angle) * this.radius;

      flCtx.fillStyle = p.color;
      flCtx.globalAlpha = Math.min(this.life / 180, 1);

      flCtx.beginPath();
      flCtx.ellipse(px, py, 6, 12, p.angle, 0, Math.PI * 2);
      flCtx.fill();
    });

    // tengah bunga
    flCtx.fillStyle = "#ffd700";
    flCtx.beginPath();
    flCtx.arc(this.x, this.y, 4, 0, Math.PI * 2);
    flCtx.fill();

    flCtx.globalAlpha = 1;
  }
}

function flowerAnimate() {
  flCtx.clearRect(0, 0, flCanvas.width, flCanvas.height);

  if (Math.random() < 0.03) {
    flowers.push(
      new Flower(
        Math.random() * flCanvas.width,
        Math.random() * flCanvas.height * 0.8
      )
    );
  }

  flowers.forEach(f => {
    f.update();
    f.draw();
  });

  flowers = flowers.filter(f => f.life > 0);
  requestAnimationFrame(flowerAnimate);
}

flowerAnimate();
