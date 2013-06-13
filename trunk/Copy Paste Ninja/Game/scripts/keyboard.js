var keyboard = {
    moveLeft: false,
    moveRight: false,
    jump: false,
    usePowerUp: false,

    init: function () {
        $(document).keydown(keyboard.keyDownHandler);
        $(document).keyup(keyboard.keyUpHandler);
    },

    keyDownHandler: function (ev) {
        var validKey = false;
        switch (event.which) {
            case 87: // Up
                keyboard.jump = true;
                validKey = true;
                break;
            case 65: // Left
                keyboard.moveLeft = true;
                validKey = true;
                break;
            case 68: // Right 
                keyboard.moveRight = true;
                validKey = true;
                break;
            case 16: // Shift 
                keyboard.usePowerUp = true;
                validKey = true;
                break;
        }

        if (validKey) {
            ev.originalEvent.preventDefault();
            engine.updateInput(keyboard.moveLeft, keyboard.moveRight, keyboard.jump, keyboard.usePowerUp);
        }
    },

    keyUpHandler: function (ev) {
        var validKey = false;
        switch (event.which) {
            case 87: // Up
                keyboard.jump = false;
                validKey = true;
                break;
            case 65: // Left
                keyboard.moveLeft = false;
                validKey = true;
                break;
            case 68: // Right 
                keyboard.moveRight = false;
                validKey = true;
                break;
            case 16: // Shift 
                keyboard.usePowerUp = false;
                validKey = true;
                break;
        }

        if (validKey) {
            ev.originalEvent.preventDefault();
            engine.updateInput(keyboard.moveLeft, keyboard.moveRight, keyboard.jump, keyboard.usePowerUp);
        }
    },
}