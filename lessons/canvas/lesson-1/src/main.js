
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(ctx)

ctx.fillStyle = 'white';
ctx.fillRect(10, 10, 150, 100);

class Particle {
  constructor(effect) {
    this.effect = effect;
    this.x = Math.random() * this.effect.width;
    this.y = Math.random() * this.effect.height;
    this.radius = Math.random() * 5 + 2;
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = 'white';
    context.fill();
    context.closePath();
  }
}

class Effect {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particlesArray = [];
    this.numberOfParticles = 20;

  }
  createParticles() {
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particlesArray.push(new Particle(this));
    }
}
}

function animate() {}