export class InputManager {
    constructor() {
        this.keys = {};
        
        window.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });
    }

    isPressed(key) {
        return this.keys[key.toLowerCase()] === true;
    }

    // Útil para teclas que só devem disparar uma vez ao carregar (ex: 'C' para câmara)
    consumeKey(key) {
        if (this.keys[key.toLowerCase()]) {
            this.keys[key.toLowerCase()] = false;
            return true;
        }
        return false;
    }
}
