import {Player} from './player.js';
import {InputHandler} from './input.js';
import {Background} from './background.js';
import {FlyingEnemy} from './enemies.js';

window.addEventListener('load',function(){

    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;

    class Game {
        constructor(width, height){
            this.width=width;
            this.height=height;
            this.groundMargin = 80;
            this.speed = 0;
            this.maxSpeed = 4;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler();
            // array with all currently active enemy objects
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
        }
        update(deltaTime){
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            // handle enemies
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
                if (enemy.markedForDeletion) {
                    this.enemies.splice(this.enemies.indexOf(enemy),1);
                }
            });
        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
        }
        addEnemy() {
            this.enemies.push(new FlyingEnemy(this));
            //console.log(this.enemies);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    console.log(game);

    let lastTime = 0; // holds the value of timestamp from the previous loop 

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime; // how long each frame stays on the screen before it gets redrawn
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    /* timeStamp gets auto-generated only when it's called
    by requestAnimationFrame on line 37.
    So, for the 1st initial call of the animate function,
    i have to pass it some value for timestamp.
    */
    animate(0);

});