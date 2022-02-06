import "./style.css";

const canvas = <HTMLCanvasElement>document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let bulletArray: Bullet[] = [];
let fireworks: Particle[] = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Particle {
  x: number;
  y: number;
  speed = Math.cos((Math.random() * Math.PI) / 2) * 5;
  size: number = Math.random() * (6 - 2) + 2;
  color: string = `hsla(${Math.random() * 400 + 12}, 100%, 60%, 1)`;
  angle: number = Math.random() * Math.PI * 2;
  vx = Math.cos(this.angle) * this.speed;
  vy = Math.sin(this.angle) * this.speed;
  gravity = 0.05;
  resistance = 0.998;
  shrink = Math.random() * (0.15 - 0.05) + 0.05;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  update() {
    this.vx *= this.resistance;
    this.vy *= this.resistance;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;

    if (this.size > 0.2) {
      this.size -= this.shrink;
    }
  }

  draw() {
    ctx!.beginPath();
    ctx!.fillStyle = this.color;
    ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx!.fill();
  }
}

class Bullet {
  x: number = canvas.width / 2;
  y: number = canvas.height;
  size: number = 2.5;
  color: string;
  targetX: number;
  targetY: number;
  velX: number;
  velY: number;
  angle: number;
  isExploded: boolean = false;

  constructor(x: number, y: number, color: string) {
    this.color = color;
    this.targetX = x;
    this.targetY = y;
    this.angle = Math.atan2(
    this.targetX - canvas.width / 2,
    this.targetY - canvas.height
    );
    this.velX = Math.sin(this.angle);
    this.velY = Math.cos(this.angle);
  }

  update() {
    this.x += this.velX * 12;
    this.y += this.velY * 12;

    if (this.y <= this.targetY + 5) {
      this.explode();
    }
  }

  draw() {
    ctx!.beginPath();
    ctx!.fillStyle = this.color;
    ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx!.fill();
  }

  explode() {
    let number = Math.random() * (300 - 150) + 150;
    for (let i = 1; i < number; i++) {
      fireworks.push(
        new Particle(this.targetX + Math.random() * 5, this.targetY)
      );
    }
    this.isExploded = true;
  }
}

function drawParticle() {
  for (let i = 0; i < fireworks.length; i++) {
    fireworks[i].draw();
    fireworks[i].update();

    if (fireworks[i].size <= 0.2) {
      fireworks.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx!.fillStyle = "hsla(0, 0%, 0% ,0.2)";
  ctx!.fillRect(0, 0, canvas.width, canvas.height);
  if (bulletArray?.length > 0) {
    for (let i = 0; i < bulletArray.length; i++) {
      bulletArray[i].update();
      bulletArray[i].draw();
      if (bulletArray[i].isExploded) {
        bulletArray.splice(i, 1);
        i--;
      }
    }
  }

  drawParticle();

  requestAnimationFrame(animate);
}

function fire() {
  document.addEventListener("click", (e) => {
    let number = Math.random() * 360;

    bulletArray.push(
      new Bullet(e.clientX, e.clientY, `hsla(${number}, 100%, 60%, 1)`)
    );
  });
}

fire();
animate();