var keyboard = {
    moveLeft: false,
    moveRight: false,
    moveUp: false,
    usePowerUp: false,

    init: function () {
        $(document).keydown(keyboard.keyDownHandler);
        $(document).keyup(keyboard.keyUpHandler);
    },

    keyDownHandler: function (ev) {
        switch (event.which) {
            case 87: // Up
                keyboard.moveUp = true;
                break;
            case 65: // Left
                keyboard.moveLeft = true;
                break;
            case 68: // Right 
                keyboard.moveRight = true;
                break;
            case 16: // Shift 
                keyboard.usePowerUp = true;
                break;
        }

        ev.originalEvent.preventDefault();
    },

    keyUpHandler: function (ev) {
        switch (event.which) {
            case 87: // Up
                keyboard.moveUp = true;
                break;
            case 65: // Left
                keyboard.moveLeft = true;
                break;
            case 68: // Right 
                keyboard.moveRight = true;
                break;
            case 16: // Shift 
                keyboard.usePowerUp = true;
                break;
        }

        ev.originalEvent.preventDefault();
    },
}