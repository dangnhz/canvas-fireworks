import "./style.css";
import burst1 from "./sounds/burst1.mp3";
import lift3 from "./sounds/lift3.mp3";

const burstSound1 = new Audio(burst1);
const liftSound1 = new Audio(lift3);

function playSound(audio:any) {
  if (audio.paused) {
    audio.play();
  } else {
    audio.currentTime = 0;
  }
}

class SoundManager {
  play(type: string) {
    if (type == "lift") {
      playSound(liftSound1)
    }

    if (type == "burst") {
      playSound(burstSound1)
    }
  }
}

const btnSoundOn = document.querySelector('.sound-on');
const btnSoundOff = document.querySelector('.sound-off');
const btnSoundControl = document.querySelector('.sound-control');

const btnPlay = document.querySelector('.play');
const btnPause = document.querySelector('.pause');
const btnAutoPlay = document.querySelector('.play-pause');

let soundOn = false;
let isAutoPlay = true;

btnSoundControl?.addEventListener('click', () => {

  if (!soundOn) {
    btnSoundOn?.classList.add('active');
    btnSoundOff?.classList.remove('active');
    soundOn = true;
  } else {
    btnSoundOn?.classList.remove('active');
    btnSoundOff?.classList.add('active');
    soundOn = false;
  }

})

btnAutoPlay?.addEventListener('click', () => {

  if (!isAutoPlay) {
    btnPause?.classList.add('active');
    btnPlay?.classList.remove('active');
    isAutoPlay = true;
    startFireworks();
  } else {
    btnPause?.classList.remove('active');
    btnPlay?.classList.add('active');
    isAutoPlay = false;
    stopFireworks();
  }

})


const soundManager = new SoundManager();
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

export function randomIntegerNumber(a:number,b:number):number {
  return Math.floor(Math.random() * (a - b) + b);
}

function randomFloatNumber(a:number,b:number):number {
  return Math.random() * (a - b) + b;
}

const colorPallet:number[]= [330, 333, 1, 355, 8, 145, 180, 182, 200, 275, 310, 346, 327, 350];
class Particle {
  x: number;
  y: number;
  speed = Math.cos((Math.random() * Math.PI) / 2) * 5;
  size: number = randomFloatNumber(3, 7);
  angle: number = Math.random() * Math.PI * 2;
  vx = Math.cos(this.angle) * this.speed;
  vy = Math.sin(this.angle) * this.speed;
  gravity = 0.05;
  resistance = 0.998;
  shrink = randomFloatNumber(0.05 ,0.15);
  color: string;
  rainbowColor: string;
  isRainbow;

  constructor(x: number, y: number, hue:number, isRainbow:boolean ) {
    this.x = x;
    this.y = y;
    this.isRainbow = isRainbow;
    this.color = `hsla(${hue}, 100%, ${randomIntegerNumber(50, 70)}%, 1)`;
    this.rainbowColor = `hsla(${colorPallet[randomIntegerNumber(0, colorPallet.length -1)]}, ${randomIntegerNumber(80, 100)}%, ${randomIntegerNumber(10, 90)}%, 1)`;
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
    ctx!.fillStyle = this.isRainbow ? this.rainbowColor: this.color;
    ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx!.fill();
  }
}

class Bullet {
  x: number = canvas.width / 2;
  y: number = canvas.height;
  size: number = 2;
  color: string;
  targetX: number;
  targetY: number;
  velX: number;
  velY: number;
  angle: number;
  isExploded: boolean = false;
  hue:number;
  isRainbow:boolean

  constructor(x: number, y: number, color: string, hue:number, isRainbow:boolean) {
    this.color = color;
    this.targetX = x;
    this.targetY = y;
    this.angle = Math.atan2(
    this.targetX - canvas.width / 2,
    this.targetY - canvas.height
    );
    this.velX = Math.sin(this.angle);
    this.velY = Math.cos(this.angle);
    this.hue = hue;
    this.isRainbow= isRainbow;
  }

  update() {
    this.x += this.velX * 10;
    this.y += this.velY * 10;

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
        new Particle(this.targetX + Math.random() * 5, this.targetY, this.hue, this.isRainbow)
      );
    }
    if (soundOn) {
      soundManager.play('burst');
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
  canvas.addEventListener("click", (e) => {
    createBullet(e.clientX, e.clientY);
  });
}

function createBullet(x:number, y:number) {
    let hue = colorPallet[randomIntegerNumber(0, colorPallet.length - 1)];
    let color = `hsla(${hue}, 100%, 50%, 1)`
    bulletArray.push(
      new Bullet(x, y, color, hue,  Math.random() < 0.6 ? false : true )
    );
    if (soundOn) {
      soundManager.play('lift');
    }
}

let myInterval:any;

function startFireworks() {
  myInterval = setInterval(() => {
      createBullet(randomIntegerNumber(canvas.width * 0.25, canvas.width * 0.75), randomIntegerNumber(150, canvas.height / 3))
  }, 400)
}

function stopFireworks() {
  clearInterval(myInterval);
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopFireworks();
  } else {
    if(isAutoPlay) startFireworks()
  }
})

fire();
animate();
startFireworks();

