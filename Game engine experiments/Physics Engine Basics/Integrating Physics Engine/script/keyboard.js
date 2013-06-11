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
        var validKey = false;
        switch (event.which) {
            case 87: // Up
                keyboard.moveUp = true;
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
        }
        box2d.moveHero();
    },

    keyUpHandler: function (ev) {
        var validKey = false;
        switch (event.which) {
            case 87: // Up
                keyboard.moveUp = false;
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
        }
        box2d.moveHero();
    },
}