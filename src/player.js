export class Player {
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.image = document.getElementById('player');
        this.speed = 0;
        this.vy = 0;
        this.weight = 1;
    }
    update(input) {
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
        if (input.includes('w') && this.onGround()) this.vy -= 30;
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        // prevent from exceeding canvas boundaries
        //if (this.y < 0) this.y = 0;
        if (this.y > this.game.height - this.height) this.y = this.game.height - this.height;
        
    }
    draw(context){
        context.drawImage(this.image, 0, 0, this.width, this.height, 
            this.x, this.y, this.width, this.height);
    }
    onGround(){
        return this.y >= this.game.height - this.height;
    }
}