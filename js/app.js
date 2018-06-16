// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.positionY = [72 ,154 ,236]; // 60 140 220
    this.positionX = [-100, -200, -300, -400, -500, -600];
    this.x = this.positionX[Math.round(Math.random() * (5 - 0) + 0)]
    this.y = this.positionY[Math.round(Math.random() * (2 - 0) + 0)];
    this.speed = Math.random() * (150 - 50) + 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if(window.ctx.canvas.width < Math.round(this.x)) {
      if(allEnemies.length < maxEnemy) {
         allEnemies.splice(allEnemies.indexOf(this),1);
         allEnemies.push(new Enemy());
         //console.log(allEnemies.length);
       }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function() {
  this.sprite = 'images/char-cat-girl.png';
  this.x = 200;
  this.y = 400;
};

Player.prototype.update = function(dt) {
  for (let enemy of allEnemies) {
  // console.log(enemy);
  // console.log(enemy.x);
  //console.log((Math.round(enemy.x)));
    if(((Math.round(enemy.x)+55) >= Math.round(this.x) &&
        (Math.round(enemy.x)) <= Math.round(this.x) && (enemy.y == this.y)) ||
        (Math.round(enemy.x)) == Math.round(this.x) && (enemy.y == this.y) ||
        ((Math.round(enemy.x)) >= Math.round(this.x) &&
        (Math.round(enemy.x)-55) <= Math.round(this.x) &&
        (enemy.y == this.y))) {
          life -= 1;
          if(life == 2) {
            let elementLife = document.getElementById("life1");
            elementLife.classList.add("fa", "fa-heart-o");
          }
          if(life == 1) {
            elementLife = document.getElementById("life2");
            elementLife.classList.add("fa", "fa-heart-o");
          }
          if(life == 0) {
            elementLife = document.getElementById("life3");
            elementLife.classList.add("fa", "fa-heart-o");
          }
          if(life < 0) {
            player = new Player();
            let popup = document.getElementById("myPopup");
            popup.classList.remove("none-display");
          }
          else {
            player = new Player();
          }
          let play = document.getElementById("play").addEventListener("click", newGame);;
        }

    function newGame () {
      elementLife = document.getElementById("life1");
      elementLife.classList.remove("fa", "fa-heart-o");
      elementLife.classList.add("fa", "fa-heart");
      elementLife = document.getElementById("life2");
      elementLife.classList.remove("fa", "fa-heart-o");
      elementLife.classList.add("fa", "fa-heart");
      elementLife = document.getElementById("life3");
      elementLife.classList.remove("fa", "fa-heart-o");
      elementLife.classList.add("fa", "fa-heart");
      popup = document.getElementById("myPopup");
      popup.classList.add("none-display");
      life = 3;
      score = 0;
      scoreDisplay = "Score: " + score;
      document.getElementById("score").innerHTML = scoreDisplay;
      document.getElementById("finalScore").innerHTML = scoreDisplay;
    }
    // console.log(Math.round(this.x));
    // console.log(Math.round(enemy.x));
    // console.log(enemy.y);
    // console.log(this.y);
  }
  if(0 >= Math.round(this.y)) {
    if(((key.y-10) == this.y) && (key.x == this.x)) {
      player = new Player();
      score += 100;
      scoreDisplay = "Score: " + score;
      key = new Key();
      console.log(score);
      document.getElementById("score").innerHTML = scoreDisplay;
      document.getElementById("finalScore").innerHTML = scoreDisplay;
    }
    else if((key.y-10) == this.y){
      player = new Player();
    }
  }
//console.log("Player x: " + Math.round(this.x));
//console.log("Player y: " + Math.round(this.y));
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let Key = function() {
  this.sprite = 'images/Key.png';
  this.positionX = [0, 100, 200, 300, 400];
  this.x = this.positionX[Math.round(Math.random() * (4 - 0) + 0)];
  this.y = 0;
}

Key.prototype.update = function(dt) {
  console.log("Key");
};

Key.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [
  new Enemy(),
  new Enemy(),
  new Enemy(),
  new Enemy(),
  new Enemy(),
  new Enemy(),
  new Enemy(),
  new Enemy(),
  new Enemy(),
];
let player = new Player();
let maxEnemy = 10;
let score = 0;
let key = new Key();
let life = 3;
let finalScore = 0;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});

 Player.prototype.handleInput = function(move) {

  if(move === 'left' && this.x > 0 && this.x < 400 || move === 'left' && this.x == 400) {
    // console.log('left');
    this.x -= 100;
  }
  if(move === 'up' && this.y >0 && this.y < 400 || move === 'up' && this.y == 400) {
    // console.log('up');
    this.y  -= 82;
  }
  if(move === 'right' && this.x > 0 && this.x < 400 || move === 'right' && this.x == 0) {
    // console.log('right')
    this.x += 100;
  }
  if(move === 'down' && this.y >0 && this.y < 400 || move === 'down' && this.y == -10) {
    // console.log('down')
    this.y  += 82;
  }
 };
