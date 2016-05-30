// This super class contains the elements that are common to the
// game Sprites
// @param xPos: number that represents the position in the X axi
// @param yPos: number that represents the position in the Y axi
// @param img: relative location of the sprite image
var SpriteObj = function(xPos,yPos,img){
    this.sprite = img;
    this.x = xPos;
    this.y = yPos;
};

// Enemies our player must avoid
var Enemy = function(x,y,id) {
    SpriteObj.call(this, x,y,'images/enemy-bug.png');
    this.constructor = Enemy;
    this.speed = (Math.random() * 5) + 1; //random number between 1 and 5
    this.id = id; // Test purpose

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (10*dt)+this.speed;

    if (this.x > 1000){
        this.resetEnemy();
    }

    // Ensure that now and then enemies are replaced
    if (enemyInd === maxNumEnemies){
        enemyInd = 0;
    }

};

Enemy.prototype.resetEnemy = function() {
    // Get a random y (this is used as an index of valid rows).
    this.y = validRows[Math.floor(Math.random() * 3)];
    // Get a random x.
    this.x = (Math.floor(Math.random() * 4) + 1) * -100;
    // Add the new enemy to allEnemies array.
    this.speed = (Math.random() * 5) + 1; //random number between 1 and 5
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    SpriteObj.call(this, x,y,'images/char-boy.png');
    this.constructor = Player;
    this.speed = 5;
}

Player.prototype.update = function() {

};

Player.prototype.handleInput = function() {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function initEnemies(){
    var maxNumEnemies = (Math.floor(Math.random() * 8) + 4);
    for (var i = 0; i < maxNumEnemies; i++){
        // Get a random y (this is used as an index of valid rows).
        var yRand = Math.floor(Math.random() * 2);
        // Get a random x.
        var xRand = (Math.floor(Math.random() * 4) + 1) * -100;
        // Add the new enemy to allEnemies array.
        allEnemies[i] = new Enemy(xRand,validRows[yRand],i);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var maxNumEnemies = 4;
var enemyInd = 0;

var player = new Player(50,145);
var validRows = [60,145,230];

initEnemies();


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
