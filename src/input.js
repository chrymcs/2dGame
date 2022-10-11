export class InputHandler {
    constructor() {
        this.keys = []; // contains only currently active keys
        window.addEventListener('keydown', e => {
            // if I click a button from below choices
            // that does not exist in keys array, add it.
            if ((   e.key === 's' || 
                    e.key === 'w' || 
                    e.key === 'a' ||
                    e.key === 'd' ||
                    e.key === ' ' ||
                    e.key === 'Shift' ||
                    e.key === 'Control'
                ) && this.keys.indexOf(e.key) === -1) 
            {
                this.keys.push(e.key);
            }
            console.log(e.key,this.keys);
        });
        window.addEventListener('keyup', e => {
            // when buttons are released, remove them from keys array
            if (    e.key === 's' ||
                    e.key === 'w' ||
                    e.key === 'a' ||
                    e.key === 'd' ||
                    e.key === ' ' ||
                    e.key === 'Shift' ||
                    e.key === 'Control'
                )
            {
                this.keys.splice(this.keys.indexOf(e.key), 1)
            }
            console.log(e.key,this.keys);
        });
    }
}