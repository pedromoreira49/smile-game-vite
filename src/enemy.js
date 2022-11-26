import Circle from './Circle.js';

export default class Enemy extends Circle {

  constructor (x, y, size, speed, color) {
    super(x, y, size, speed, color);
    this.line = 1;
  }

  moveEnemy (limits) {
    this.y += this.speed;
    this.enemyLimits(limits);
  }

  enemyLimits (limits) {
    if (this.y - this.size > limits.height) {
      this.y = 0 - this.size * 2;
      this.x = Math.random() * limits.width;
      this.color = "#" + ("00000" + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)).slice(-6)
    }
  }
}