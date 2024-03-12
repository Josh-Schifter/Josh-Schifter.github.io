var sketchProc = function (processingInstance) {
    with (processingInstance) {
        var mult = 2;
        size(400 * mult, 450 * mult);
        frameRate(60);
        smooth();

        // END BOILERPLATE



        var Ball = function (config) {
            this.x = config.x * mult;
            this.y = config.y * mult;
            this.vx = 0;
            this.vy = 0;
            this.drag = 0.06 * mult;
            this.acceleration = 0.17 * mult;
            this.ax = 0;
            this.ay = 0;
            this.gravity = 0.2 * mult;
            this.radius = 5 * mult;
        };

        var keys = [];
        var Level = function (platforms, startX, startY, endX, endY, endWidth, endHeight) {
            this.platforms = platforms;
            this.startX = startX * mult;
            this.startY = startY * mult;
            this.endX = endX * mult;
            this.endY = endY * mult;
            this.endWidth = endWidth * mult;
            this.endHeight = endHeight * mult;
        };
        var Button = function (config) {
            this.buttonX = config.buttonX * mult;
            this.buttonY = config.buttonY * mult;
            this.buttonWidth = config.buttonWidth * mult;
            this.buttonHeight = config.buttonHeight * mult;
            this.color1 = config.color1;
            this.color2 = config.color2;
            this.color3 = config.color3;
            this.isPlayButton = config.isPlayButton;
            this.isLeft = config.isLeft;
            this.isRight = config.isRight;
            this.isUp = config.isUp;
            this.isRestartButton = config.isRestartButton;
        };
        var playButton = new Button({ buttonX: 127, buttonY: 177, buttonWidth: 120, buttonHeight: 40, color1: 4, color2: 255, color3: 0, isPlayButton: true });

        var rightButton = new Button({ buttonX: 72, buttonY: 420, buttonWidth: 57, buttonHeight: 20, isRight: true });

        var leftButton = new Button({ buttonX: 10, buttonY: 420, buttonWidth: 57, buttonHeight: 20, isLeft: true });

        var upButton = new Button({ buttonX: 328, buttonY: 420, buttonWidth: 57, buttonHeight: 20, isUp: true });

        var restartButton = new Button({ buttonX: 142, buttonY: 335, buttonWidth: 120, buttonHeight: 40, color1: 4, color2: 255, color3: 0, isRestartButton: true });

        var buttons = [playButton, rightButton, leftButton, upButton, restartButton];

        //Platforms
        var Platform = function (config) {
            this.x = config.x * mult;
            this.y = config.y * mult;
            this.width = config.width * mult;
            this.height = config.height * mult;
            this.moveLeft = false;
            this.moveUp = false;
            this.canKill = config.canKill;
            this.canMove = config.canMove;
        };
        Platform.prototype.draw = function () {
            if (this.canKill === false) {
                fill(4, 255, 0);
                rect(this.x, this.y, this.width, this.height);
            }
            else {
                fill(255, 36, 36);
                rect(this.x, this.y, this.width, this.height);
            }
        };

        var Platform1 = new Platform({ x: 0, y: 340, width: 63, height: 60, canKill: false });
        var Platform2 = new Platform({ x: 130, y: 340, width: 39, height: 60, canKill: false });
        var Platform3 = new Platform({ x: 244, y: 340, width: 39, height: 60, canKill: false });
        var Platform4 = new Platform({ x: 340, y: 280, width: 60, height: 60, canKill: false });
        var Platform5 = new Platform({ x: 229, y: 226, width: 60, height: 20, canKill: false });
        var Platform6 = new Platform({ x: 119, y: 187, width: 60, height: 20, canKill: false });
        var Platform7 = new Platform({ x: 19, y: 136, width: 60, height: 20, canKill: false });
        var Platform8 = new Platform({ x: 112, y: 72, width: 314, height: 20, canKill: false });
        var killPlatform1 = new Platform({ x: 209, y: 52, width: 60, height: 20, canKill: true });

        var Platform21 = new Platform({ x: 0, y: 340, width: 46, height: 60, canKill: false });
        var Platform22 = new Platform({ x: 280, y: 290, width: 60, height: 20, canKill: false, canMove: true });
        var Platform23 = new Platform({ x: 0, y: 240, width: 60, height: 20, canKill: false, canMove: true });
        var Platform24 = new Platform({ x: 175, y: 190, width: 60, height: 20, canKill: false, canMove: true });
        var Platform25 = new Platform({ x: 293, y: 140, width: 60, height: 20, canKill: false, canMove: true });
        var Platform26 = new Platform({ x: 78, y: 90, width: 60, height: 20, canKill: false, canMove: true });
        var killPlatform21 = new Platform({ x: 218, y: 40, width: 60, height: 20, canKill: true, canMove: true });

        var Platform31 = new Platform({ x: 0, y: 380, width: 20, height: 20, canKill: false });
        var Platform32 = new Platform({ x: 163, y: 360, width: 60, height: 20, canKill: false, canMove: true });
        var Platform33 = new Platform({ x: 380, y: 320, width: 20, height: 20, canKill: false });
        var Platform34 = new Platform({ x: 0, y: 260, width: 353, height: 20, canKill: false });
        var Platform35 = new Platform({ x: 0, y: 220, width: 20, height: 20, canKill: false });
        var Platform36 = new Platform({ x: 52, y: 160, width: 30, height: 20, canKill: false });
        var Platform37 = new Platform({ x: 155, y: 140, width: 30, height: 20, canKill: false });
        var Platform38 = new Platform({ x: 280, y: 140, width: 30, height: 20, canKill: false });
        var Platform39 = new Platform({ x: 380, y: 90, width: 20, height: 20, canKill: false });
        var Platform310 = new Platform({ x: 212, y: 26, width: 60, height: 10, canKill: false, canMove: true });
        var Platform311 = new Platform({ x: 0, y: 26, width: 30, height: 10, canKill: false });
        var killPlatform31 = new Platform({ x: 299, y: 340, width: 20, height: 20, canKill: true, canMove: true });
        var killPlatform32 = new Platform({ x: 116, y: 340, width: 20, height: 20, canKill: true, canMove: true });
        var killPlatform33 = new Platform({ x: 299, y: 240, width: 20, height: 20, canKill: true, canMove: true });
        var killPlatform34 = new Platform({ x: 116, y: 240, width: 20, height: 20, canKill: true, canMove: true });
        var killPlatform35 = new Platform({ x: 82, y: 160, width: 353, height: 20, canKill: true });
        var killPlatform36 = new Platform({ x: 0, y: 36, width: 353, height: 20, canKill: true });

        var platforms0 = [];
        var platforms1 = [Platform1, Platform2, Platform3, Platform4, Platform5, Platform6, Platform7, Platform8, killPlatform1];

        var platforms2 = [Platform21, Platform22, Platform23, Platform24, Platform25, Platform26, killPlatform21];

        var platforms3 = [Platform31, Platform32, Platform33, Platform34, Platform35, Platform36, Platform37, Platform38, Platform39, Platform310, Platform311, killPlatform31, killPlatform32, killPlatform33, killPlatform34, killPlatform35, killPlatform36];

        var platforms4 = [Platform31, Platform32, Platform33, Platform34, Platform35, Platform36, Platform37, Platform38, Platform39, Platform310, Platform311, killPlatform31, killPlatform32, killPlatform33, killPlatform34, killPlatform35, killPlatform36];

        var homeScreen = new Level(platforms0, 1, 1);
        var level1 = new Level(platforms1, 10, 340, 323, 35, 37, 37);
        var level2 = new Level(platforms2, 10, 340, 33, 16, 20, 20);
        var level3 = new Level(platforms3, 10, 380, 5, 5, 20, 20);
        var level4 = new Level(platforms4, 15, 15, 0, 360, 20, 20);
        var endScreen = new Level(platforms0, 500, 500);
        var levels = [homeScreen, level1, level2, level3, level4, endScreen];
        var currentLevel = 0;

        var blueBall = new Ball({ x: levels[currentLevel].startX, y: levels[currentLevel].startY });

        Level.applyChangeInLevels = function () {
            if (blueBall.x > levels[currentLevel].endX && blueBall.x < levels[currentLevel].endX + levels[currentLevel].endWidth && blueBall.y > levels[currentLevel].endY && blueBall.y < levels[currentLevel].endY + levels[currentLevel].endHeight) {
                currentLevel++;
                blueBall.x = levels[currentLevel].startX;
                blueBall.y = levels[currentLevel].startY;

                blueBall.vx = 0;
                blueBall.vy = 0;
            }
        };

        Level.drawTextAndEnd = function () {
            fill(128, 96, 74);
            rect(levels[currentLevel].endX, levels[currentLevel].endY, levels[currentLevel].endWidth, levels[currentLevel].endHeight);

            if (currentLevel === 0) {
                fill(0, 0, 0);
                textSize(32 * mult);
                text("The Adventures of Blue Ball", 0 * mult, 100 * mult, 400 * mult, 100 * mult);
                fill(0, 0, 0);
                text("Play", 156 * mult, 184 * mult, 100 * mult, 100 * mult);
                textSize(12 * mult);
                text("Made by Ben Schifter", 131 * mult, 345 * mult, 339 * mult, 100 * mult);
            }
            if (currentLevel === 1) {
                fill(0, 0, 0);
                text("Level 1: Platforms", 8 * mult, 259 * mult, 100 * mult, 100 * mult);
                text("Use Arrow Keys to Move", 8 * mult, 289 * mult, 100 * mult, 100 * mult);
                text("This Kills You!", 130 * mult, 39 * mult, 100 * mult, 100 * mult);
                text("Touch the Brown to Finish the Level", 208 * mult, 14 * mult, 211 * mult, 100 * mult);
            }
            if (currentLevel === 2) {
                fill(0, 0, 0);
                text("Level 2: Moving Platforms", 2 * mult, 288 * mult, 100 * mult, 100 * mult);
            }
            if (currentLevel === 3) {
                fill(0, 0, 0);
                text("Level 3: The Tower", 4 * mult, 298 * mult, 87 * mult, 100 * mult);
            }
            if (currentLevel === 4) {
                fill(0, 0, 0);
                text("Level 4: Reverse", 5 * mult, 3 * mult, 100 * mult, 100 * mult);
            }
            if (currentLevel === 5) {
                fill(0, 0, 0);
                textSize(40 * mult);
                text("The End...For Now", 29 * mult, 125 * mult, 438 * mult, 100 * mult);
                textSize(32 * mult);
                text("Restart", 149 * mult, 344 * mult, 271 * mult, 100 * mult);
                textSize(20 * mult);
                text("More Levels Coming Soon!", 76 * mult, 293 * mult, 271 * mult, 100 * mult);
                textSize(12 * mult);
            }
        };

        Button.prototype.draw = function () {
            if (this.isPlayButton === true) {
                if (currentLevel === 0) {
                    fill(this.color1, this.color2, this.color3);
                    rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
                    if (mouseX > this.buttonX && mouseX < this.buttonX + this.buttonWidth && mouseY > this.buttonY && mouseY < this.buttonY + this.buttonHeight) {
                        this.color1 = 37;
                        this.color2 = 130;
                    }
                    else {
                        this.color1 = 4;
                        this.color2 = 255;
                    }
                }
            }

            if (this.isRestartButton === true) {
                if (currentLevel === 5) {
                    fill(this.color1, this.color2, this.color3);
                    rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
                    if (mouseX > this.buttonX && mouseX < this.buttonX + this.buttonWidth && mouseY > this.buttonY && mouseY < this.buttonY + this.buttonHeight) {
                        this.color1 = 37;
                        this.color2 = 130;
                    }
                    else {
                        this.color1 = 4;
                        this.color2 = 255;
                    }
                }
            }
            if (this.isLeft === true || this.isRight === true || this.isUp === true) {
                if (currentLevel > 0) {
                    line(0 * mult, 400 * mult, 400 * mult, 400 * mult);
                    fill(0, 85, 255);
                    rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
                }
            }
        };

        Button.prototype.applyMouse = function () {
            if (mouseX > this.buttonX && mouseX < this.buttonX + this.buttonWidth && mouseY > this.buttonY && mouseY < this.buttonY + this.buttonHeight) {
                if (this.isPlayButton === true) {
                    currentLevel = 1;
                    blueBall.x = levels[currentLevel].startX;
                    blueBall.y = levels[currentLevel].startY;
                }

                if (this.isRestartButton === true) {
                    currentLevel = 0;
                }
                if (this.isRight === true) {
                    if (!keys.includes(RIGHT)) {
                        keys.push(RIGHT);
                    }
                }
                if (this.isLeft === true) {
                    if (!keys.includes(LEFT)) {
                        keys.push(LEFT);
                    }
                }
                if (this.isUp === true) {
                    if (!keys.includes(UP)) {
                        keys.push(UP);
                    }
                }
            }

        };

        Button.prototype.applyReleaseMouse = function () {
            if (this.isRight === true) {
                keys.splice(keys.RIGHT, 1);
            }
            if (this.isLeft === true) {
                keys.splice(keys.LEFT, 1);
            }
            if (this.isUp === true) {
                keys.splice(keys.UP, 1);
            }
        };
        Platform.prototype.applyMovement = function () {
            if (this.canMove === true) {
                if (this.moveLeft === true) {
                    this.x--;
                    if (blueBall.y > this.y - blueBall.radius && blueBall.y < this.y + 1 && blueBall.x > this.x && blueBall.x < this.x + this.width) {
                        blueBall.x--;
                    }
                }
                else {
                    this.x++;
                    if (blueBall.y > this.y - blueBall.radius && blueBall.y < this.y + 1 && blueBall.x > this.x && blueBall.x < this.x + this.width) {
                        blueBall.x++;
                    }
                }
                if (this.x + this.width > 400 * mult) {
                    this.moveLeft = true;
                }
                if (this.x < 0) {
                    this.moveLeft = false;
                }
            }

        };
        Ball.prototype.applyIntersect = function (platform) {
            if (platform.canKill === false && this.y > platform.y - this.radius && this.y < platform.y + 1 && this.x > platform.x && this.x < platform.x + platform.width) {
                this.y = platform.y - this.radius;
                this.vy = 0;
            }

            if (platform.canKill === true && this.y > platform.y - this.radius && this.y < platform.y + 1 && this.x > platform.x && this.x < platform.x + platform.width) {
                this.x = levels[currentLevel].startX;
                this.y = levels[currentLevel].startY;
                this.vx = 0;
                this.vy = 0;

            }
            if (platform.canKill === false && this.y > platform.y && this.y < platform.y + platform.height && this.x > platform.x - this.radius && this.x < platform.x + 1) {
                this.x = platform.x - this.radius;
                this.vx = 0;
            }

            if (platform.canKill === true && this.y > platform.y && this.y < platform.y + platform.height && this.x > platform.x - this.radius && this.x < platform.x + 1) {
                this.x = levels[currentLevel].startX;
                this.y = levels[currentLevel].startY;
                this.vx = 0;
                this.vy = 0;
            }

            if (platform.canKill === false && this.y > platform.y && this.y < platform.y + platform.height && this.x < platform.x + platform.width + this.radius && this.x > platform.x + platform.width - 1) {
                this.x = platform.x + platform.width + this.radius;
                this.vx = 0;
            }

            if (platform.canKill === true && this.y > platform.y && this.y < platform.y + platform.height && this.x < platform.x + platform.width + this.radius && this.x > platform.x + platform.width - 1) {
                this.x = levels[currentLevel].startX;
                this.y = levels[currentLevel].startY;
                this.vx = 0;
                this.vy = 0;
            }

            if (platform.canKill === false && this.x > platform.x && this.x < platform.x + platform.width && this.y < platform.y + platform.height + this.radius && this.y > platform.y + platform.height - 1) {
                this.y = platform.y + platform.height + this.radius;
                this.vy = 0;
            }

            if (platform.canKill === true && this.x > platform.x && this.x < platform.x + platform.width && this.y < platform.y + platform.height + this.radius && this.y > platform.y + platform.height - 1) {
                this.x = levels[currentLevel].startX;
                this.y = levels[currentLevel].startY;
                this.vx = 0;
                this.vy = 0;

            }
        };
        //Movement
        Ball.prototype.applyUserInput = function (platforms) {

            if (keys.includes(RIGHT)) {
                this.ax = this.acceleration;
            }
            else if (keys.includes(LEFT)) {
                this.ax = -this.acceleration;
            }
            else {
                this.ax = 0;
            }
            var intersect = false;
            for (var i = 0; i < platforms.length; i++) {
                if (keys.includes(UP) && this.y === platforms[i].y - this.radius && this.x > platforms[i].x && this.x < platforms[i].x + platforms[i].width) {
                    intersect = true;

                }
                if (intersect === true) {
                    this.ay = -6 * mult;
                }
                else {
                    this.ay = 0;
                }
            }
        };
        Ball.prototype.applyBorders = function () {
            if (this.x < this.radius) {
                this.x = this.radius;
                this.vx = 0;
            }
            if (this.x > 400 * mult - this.radius) {
                this.x = 400 * mult - this.radius;
                this.vx = 0;
            }
            if (this.y > 400 * mult) {
                this.x = levels[currentLevel].startX;
                this.y = levels[currentLevel].startY;
                this.vy = 0;
                this.vx = 0;
            }
        };
        //Applying Velocity and Drag
        Ball.prototype.applyGravity = function () {
            this.vy += this.gravity;
        };
        Ball.prototype.applyVelocity = function () {
            if (this.vx > 6) {
                this.vx = 6;
                this.x += this.vx;
            }
            else if (this.vx < 6) {
                this.x += this.vx;
            }

            if (this.vy > 6) {
                this.vy = 6;
                this.y += this.vy;
            }
            else if (this.vy < 6) {
                this.y += this.vy;
            }
        };
        Ball.prototype.applyAcceleration = function () {
            this.vx += this.ax;
            this.vy += this.ay;
        };
        Ball.prototype.applyDrag = function () {
            if (this.vx > 0) {
                if (this.vx < this.drag) {
                    this.vx = 0;
                } else {
                    this.vx -= this.drag;
                }
            }
            if (this.vx < 0) {
                if (this.vx > this.drag) {
                    this.vx = 0;
                } else {
                    this.vx += this.drag;
                }
            }
            if (this.vy > 0) {
                if (this.vy < this.drag) {
                    this.vy = 0;
                } else {
                    this.vy -= this.drag;
                }
            }
            if (this.vy < 0) {
                if (this.vy > this.drag) {
                    this.vy = 0;
                } else {
                    this.vy += this.drag;
                }
            }
        };
        Ball.prototype.draw = function () {
            fill(0, 98, 255);
            if (currentLevel > 0) {
                ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
            }
        };

        draw = function () {

            var level = levels[currentLevel];
            var platforms = level.platforms;

            for (var i = 0; i < platforms.length; i++) {
                blueBall.applyIntersect(platforms[i]);
            }

            blueBall.applyUserInput(platforms);
            blueBall.applyBorders();
            blueBall.applyGravity();
            blueBall.applyAcceleration();
            blueBall.applyDrag();
            blueBall.applyVelocity();
            for (var i = 0; i < platforms.length; i++) {
                platforms[i].applyMovement();
            }

            background(189, 253, 255);
            playButton.draw();
            restartButton.draw();

            Level.drawTextAndEnd();
            blueBall.draw();
            Level.applyChangeInLevels();
            for (var i = 0; i < platforms.length; i++) {
                platforms[i].draw();
            }
            rightButton.draw();
            leftButton.draw();
            upButton.draw();
        };

        mousePressed = function () {
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].applyMouse();
            }
        };

        mouseReleased = function () {
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].applyReleaseMouse();
            }
        };
        keyPressed = function () {
            if (!keys.includes(keyCode)) {
                keys.push(keyCode);
            }
        };

        keyReleased = function () {
            keys.splice(keys.indexOf(keyCode), 1);

        };

        // BEGIN BOILERPLATE

    }
}

var canvas = document.getElementById("canvas");
var processingInstance = new Processing(canvas, sketchProc);
