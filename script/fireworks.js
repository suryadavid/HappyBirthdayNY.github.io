const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

/* ================= WARNA FIREWORKS ================= */
const colors = [
  "#ff4f9a", // pink terang
  "#ff85c1", // soft pink
  "#ffd166", // gold lembut
  "#ffffff", // putih biar kelihatan jelas
  "#ff9f1c"  // warm orange
];

/* ================= PARTICLE ================= */
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 3;

    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 1;
    this.gravity = 0.05;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.size = Math.random() * 2 + 1.5;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.alpha -= 0.015;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

/* ================= FIREWORK ================= */
class Firework {
  constructor() {
    this.x = Math.random() * w;
    this.y = Math.random() * h * 0.5 + h * 0.1;
    this.particles = [];
    const count = Math.random() * 40 + 60;

    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(this.x, this.y));
    }
  }

  update() {
    this.particles.forEach(p => p.update());
    this.particles = this.particles.filter(p => p.alpha > 0);
  }

  draw() {
    this.particles.forEach(p => p.draw());
  }
}

let fireworks = [];

/* ================= LOOP ================= */
function animate() {
  ctx.clearRect(0, 0, w, h);

  fireworks.forEach(f => {
    f.update();
    f.draw();
  });

  fireworks = fireworks.filter(f => f.particles.length > 0);

  requestAnimationFrame(animate);
}
animate();

/* ================= AUTO FIRE ================= */
setInterval(() => {
  // Tambahkan 2–3 firework sekaligus supaya lebih ramai tapi tetap ringan
  const count = Math.floor(Math.random() * 2) + 2;
  for (let i = 0; i < count; i++) {
    fireworks.push(new Firework());
  }
}, 1200);

/* ================= CLICK FIRE ================= */
canvas.addEventListener("click", e => {
  fireworks.push(new Firework());
});
