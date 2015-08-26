var blockSizeX = 101;
var blockSizeY = 83;
var totalScore = 0;

var Chooser = function() {
    this.sprite = 'images/Selector.png';
}

Chooser.prototype.update = function() {

}

Chooser.prototype.render = function() {

}
Chooser.prototype.handleInput = function() {

}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y =  55 + Math.floor(Math.random() * 3) * blockSizeY;
    this.speed = Math.floor(Math.random() * 500) + 100;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > blockSizeX * 5) {
        this.x = 0;
        this.y =  55 + Math.floor(Math.random() * 3) * blockSizeY;
        this.speed = Math.floor(Math.random() * 500) + 100;
    }
}


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 2 * blockSizeX;
    this.y = 5 * blockSizeY - 20;
}

Player.prototype.update = function(dt) {
    if (this.y < blockSizeY-20) {
        this.x = 2 * blockSizeX;
        this.y = 5 * blockSizeY - 20;
        totalScore += 1;
    } else if (collisionDetect()) {
        this.x = 2 * blockSizeX;
        this.y = 5 * blockSizeY - 20;
        totalScore -= 1;
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x < blockSizeX) {
                this.x = this.x;
            } else {
                this.x = this.x - blockSizeX;
            }
            break;
        case 'up':
            if (this.y < blockSizeY - 20) {
                this.y = this.y;
            } else {
                this.y = this.y - blockSizeY;
            }
            break;
        case 'right':
            if (this.x > blockSizeX * 3) {
                this.x = this.x;
            } else {
                this.x = this.x + blockSizeX;
            }
            break;
        case 'down':
            if (this.y > blockSizeY * 4) {
                this.y = this. y;
            } else {
                this.y = this.y + blockSizeY;
            }
            break;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();

function generateEnemy(){
    var enemy = new Enemy();
    allEnemies.push(enemy);
    if (allEnemies.length > 3) {
        clearInterval(randomEnemy);
    }
}

generateEnemy();
var randomEnemy = setInterval(generateEnemy, 3000);

function collisionDetect() {
    var playerX = Math.floor(player.x / blockSizeX);
    var playerY = Math.floor(player.y / blockSizeY);
    for (var i = 0; i < allEnemies.length; i += 1) {
        var enemyX = Math.floor(allEnemies[i].x / blockSizeX);
        var enemyY = Math.floor((allEnemies[i].y) / blockSizeY);
        if (enemyX === playerX && enemyY === playerY) {
            return true;
        }
    }
}

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
