var blockSizeX = 101,
    blockSizeY = 83,
    totalScore = 0,
    totalGem = 0,
    characterSelect = 0;

var playerStartX = 2 * blockSizeX,
    playerStartY = 5 * blockSizeY - 20;

var gemPosition = function() {
    this.x = Math.floor(Math.random() * 4) * blockSizeX;
    this.y = (Math.floor(Math.random() * 3) * blockSizeY) + 55;
}

var Chooser = function() {
    this.sprite = 'images/Selector.png';
    this.x = 0;
    this.y = 220;
}

Chooser.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Chooser.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x < blockSizeX) {
                this.x = this.x;
            } else {
                this.x = this.x - blockSizeX;
            }
            break;
        case 'right':
            if (this.x > blockSizeX * 3) {
                this.x = this.x;
            } else {
                this.x = this.x + blockSizeX;
            }
            break;
        case 'enter':
            characterSelect = Math.floor(this.x / blockSizeX) + 1;
            break;
    }
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
    this.sprite = '';
    this.x = playerStartX;
    this.y = playerStartY;
}

Player.prototype.update = function() {
    switch (characterSelect) {
        case 1:
            this.sprite = 'images/char-boy.png';
            break;
        case 2:
            this.sprite = 'images/char-cat-girl.png';
            break;
        case 3:
            this.sprite = 'images/char-horn-girl.png';
            break;
        case 4:
            this.sprite = 'images/char-pink-girl.png';
            break;
        case 5:
            this.sprite = 'images/char-princess-girl.png';
            break;
        default:
            this.sprite = 'images/char-boy.png';
            break;
    }
    if (this.y < blockSizeY-20) {
        this.x = playerStartX;
        this.y = playerStartY;
        totalScore += 1;
    } else if (collisionDetect(player, allEnemies)) {
        this.x = playerStartX;
        this.y = playerStartY;
        totalScore -= 1;
    } else if (collisionDetect(player, gem)) {
        totalGem += 1;
        gemPosition.apply(gem);
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

var Gem = function() {
    this.sprite = 'images/Gem Orange.png';
    gemPosition.apply(this);
}

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();
var chooser = new Chooser();
var gem = new Gem();

function generateEnemy(){
    var enemy = new Enemy();
    allEnemies.push(enemy);
    if (allEnemies.length > 2) {
        clearInterval(randomEnemy);
    }
}

generateEnemy();
var randomEnemy = setInterval(generateEnemy, 3000);

function collisionDetect(elementA, elementB) {
    var playerX = Math.floor(elementA.x / blockSizeX);
    var playerY = Math.floor(elementA.y / blockSizeY);
    if (Array.isArray(elementB)) {
        for (var i = 0; i < elementB.length; i += 1) {
            var enemyX = Math.floor(elementB[i].x / blockSizeX);
            var enemyY = Math.floor((elementB[i].y) / blockSizeY);
            if (enemyX === playerX && enemyY === playerY) {
                return true;
            }
        }
    } else {
        var enemyX = Math.floor(elementB.x / blockSizeX);
        var enemyY = Math.floor((elementB.y) / blockSizeY);
        if (enemyX === playerX && enemyY === playerY) {
            return true;
        }
    }

}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        13: 'enter',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    chooser.handleInput(allowedKeys[e.keyCode]);
});
