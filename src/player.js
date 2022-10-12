import {Sitting, Running, Jumping, Falling} from './playerStates.js';

export class Player {
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById('player');
        
        this.frameX = 0; // index of horizontal frame
        this.frameY = 0; // vertical position in the spritesheet
        // different rows have different number of frames
        // i want to rotate between frame 0 and max frame on that row
        // e.g. sitting and running states have different number of frames.
        this.maxFrame;

        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;

        this.speed = 0;
        this.vy = 0;
        this.weight = 1;
        this.states = [new Sitting(this), new Running(this), 
            new Jumping(this), new Falling(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
    }
    update(input, deltaTime) {
        this.currentState.handleInput(input);
        // horizontal movement
        this.x += this.speed;
        if (input.includes('d')) this.speed = 10;
        else if (input.includes('a')) this.speed = -10;
        else this.speed = 0;
        // prevent from exceeding canvas boundaries
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        
        // vertical movement (jump)
        // i want player to be able to jump only when he's on the ground.
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;

        // sprite animation

        // below code will result in very high speed movement, losing frames.
        /* if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = 0; */
        
        // How to control fps of sprite animation independently of the fps of the entire game?
        // animate dog sprite at 20 fps, while the game is still update in 60 fps
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }
    draw(context){
        context.drawImage(this.image, 
            this.frameX*this.width, this.frameY*this.height,
            this.width, this.height, 
            this.x, this.y, this.width, this.height);
    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
}