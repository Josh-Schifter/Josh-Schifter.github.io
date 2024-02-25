var sketchProc = function(processingInstance) {
    with (processingInstance) {
      size(400, 400); 
      frameRate(60);    
      smooth();
     
var restartX = 10;
var restartY = 340;
var Ball = function(config){
    this.x = config.x;
    this.y = config.y;
    this.vx = 0;
    this.vy = 0;
    this.drag = 0.06;
    this.acceleration = 0.17;
    this.ax = 0;
    this.ay = 0;
    this.gravity = 0.2;
};
var blueBall = new Ball ({x: restartX, y: restartY});
var keys = [];
var Level = function(platforms, startX, startY, endX, endY, endWidth, endHeight) {
    this.platforms = platforms;
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.endWidth = endWidth;
    this.endHeight = endHeight;
    
};
var Button = function(config) {
    this.buttonX = config.buttonX;
    this.buttonY = config.buttonY;
    this.buttonWidth = config.buttonWidth;
    this.buttonHeight = config.buttonHeight;
    this.color1 = config.color1;
    this.color2 = config.color2;
    this.color3 = config.color3;
};
var playButton = new Button({buttonX: 127, buttonY: 177, buttonWidth: 120, buttonHeight: 40, color1: 4, color2: 255, color3: 0});



//Platforms
var Platform = function(config) {
    this.x = config.x;
    this.y = config.y;
    this.width = config.width;
    this.height = config.height;
    this.moveLeft = false;
    this.moveUp = false;
    this.canKill = config.canKill;
    this.canMove = config.canMove;
};
Platform.prototype.draw = function() {
    if (this.canKill === false) {
        fill(4, 255, 0);
        rect(this.x, this.y, this.width, this.height);
    }
    else {
        fill(255, 36, 36);
        rect(this.x, this.y, this.width, this.height);
    }
};

Platform.prototype.applyMovement = function() {
    if (this.canMove === true) {
        if (this.moveLeft === true) {
            this.x --;
            if (blueBall.y > this.y - 5 && blueBall.y < this.y + 1 && blueBall.x > this.x &&             blueBall.x < this.x + this.width) {
                blueBall.x --;
            }
        }
        else {
            this.x ++;
            if (blueBall.y > this.y - 5 && blueBall.y < this.y + 1 && blueBall.x > this.x &&             blueBall.x < this.x + this.width) {
                blueBall.x ++;
            }
        }
        if (this.x + this.width > 400) {
            this.moveLeft = true;
        }
            if (this.x < 0) {
                this.moveLeft = false;
            }
    }
    
};

var Platform1 = new Platform ({x: 0, y: 340, width: 63, height: 60, canKill: false});
var Platform2 = new Platform ({x: 130, y: 340, width: 39, height: 60, canKill: false});
var Platform3 = new Platform ({x: 244, y: 340, width: 39, height: 60, canKill: false});
var Platform4 = new Platform ({x: 339, y: 280, width: 60, height: 60, canKill: false});
var Platform5 = new Platform({x: 229, y: 226, width: 60, height: 20, canKill: false});
var Platform6 = new Platform({x: 119, y: 187, width: 60, height: 20, canKill: false});
var Platform7 = new Platform({x: 19, y: 136, width: 60, height: 20, canKill: false});
var Platform8 = new Platform({x: 112, y: 72, width: 314, height: 20, canKill: false});
var killPlatform1 = new Platform ({x: 209, y: 52, width: 60, height: 20, canKill: true});

var Platform21 = new Platform({x: 0, y: 340, width: 46, height: 60, canKill: false});
var Platform22 = new Platform({x:280,y:290,width:60,height:20,canKill:false,canMove:true});
var Platform23 = new Platform({x:0,y:240,width:60,height:20,canKill:false,canMove:true});
var Platform24 = new Platform({x:175,y:190,width:60,height:20,canKill:false,canMove:true});
var Platform25 = new Platform({x:293,y:140,width:60,height:20,canKill:false,canMove:true});
var Platform26 = new Platform({x:78,y:90,width:60,height:20,canKill:false,canMove:true});
var killPlatform = new Platform({x:218,y:40,width:60,height:20,canKill:true,canMove:true});

var Platform31 = new Platform({x: 0, y: 340, width: 422, height: 60, canKill: false});
var Platform32 = new Platform({x:0,y:110,width:99,height:60, canKill: false});
var platforms0 = [];
var platforms1 = [Platform1, Platform2, Platform3, Platform4, Platform5, Platform6, Platform7, Platform8, killPlatform1];    
var platforms2 = [Platform21, Platform22, Platform23, Platform24, Platform25, Platform26, killPlatform];   
var platforms3 = [Platform31, Platform32];
var homeScreen = new Level(platforms0, 1, 1);
var level1 = new Level(platforms1, 128, 199, 323, 35, 37, 37);
var level2 = new Level(platforms2, 10, 340, 33, 25, 10, 10);
var level3 = new Level(platforms3, 10, 10, 10, 10, 10, 10);
var levels = [homeScreen, level1, level2, level3];
var currentLevel = 0;

Level.applyChangeInLevels = function() {
    if (blueBall.x > levels[currentLevel].endX && blueBall.x < levels[currentLevel].endX + levels[currentLevel].endWidth && blueBall.y > levels[currentLevel].endY && blueBall.y < levels[currentLevel].endY + levels[currentLevel].endHeight) {
            currentLevel ++;
            blueBall.x = levels[currentLevel].startX;
            blueBall.y = levels[currentLevel].startY;
            blueBall.vx = 0;
            blueBall.vy = 0;
        }
};
Level.drawTextAndEnd = function() {
    fill(128, 96, 74);
    rect(levels[currentLevel].endX, levels[currentLevel].endY, levels[currentLevel].endWidth, levels[currentLevel].endHeight);
    if (currentLevel === 0) {
        fill(0, 0, 0);
        textSize(32);
        text("The Adventures of Blue Ball", 0, 100, 400, 100);
        fill(0, 0, 0);
        text("Play", 156, 184, 100, 100);
        textSize(12);
        text("Made by Ben Schifter", 131, 345, 339, 100);
    }
    if (currentLevel === 1) {
        fill(0, 0, 0);
        text("Level 1: Platforms", 8, 259, 100, 100);
        text("Use Arrow Keys to Move", 8, 289, 100, 100);
        text("This Kills You!", 130, 39, 100, 100);
        text("Touch the Brown to Finish the Level", 208, 14, 211, 100);
    }
    if (currentLevel === 2) {
        fill(0, 0, 0);
        text("Level 2: Moving Platforms", 2, 288, 100, 100);
    }

};
Button.prototype.draw = function() {
    if(currentLevel === 0) {
        fill(this.color1, this.color2, this.color3);
        rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
    }
};

Button.prototype.applyMouse = function() {
    if (currentLevel === 0 && mouseX > this.buttonX && mouseX < this.buttonX + this.buttonWidth && mouseY > this.buttonY && mouseY < this.buttonY + this.buttonHeight) {
        this.color1 = 37;
        this.color2 = 130;
        if (mouseIsPressed) {
            currentLevel = 1;
        }
    }
    else {
        playButton.color1 = 4;
        playButton.color2 = 255;
    }
};

Ball.prototype.applyIntersect = function(platform) {
    if (platform.canKill === false && this.y > platform.y - 5 && this.y < platform.y + 1 && this.x > platform.x && this.x < platform.x + platform.width) {
        this.y = platform.y - 5;
        this.vy = 0;
    } 
    
    if (platform.canKill === true && this.y > platform.y - 5 && this.y < platform.y + 1 && this.x > platform.x && this.x < platform.x + platform.width) {
        this.x = restartX;
        this.y = restartY;
        this.vx = 0;
        this.vy = 0;
        
    } 
    if (platform.canKill === false && this.y > platform.y && this.y < platform.y + platform.height && this.x > platform.x - 5 && this.x < platform.x + 1) {
            this.x = platform.x - 5;
            this.vx = 0;
        }
        
    if (platform.canKill === true && this.y > platform.y && this.y < platform.y + platform.height && this.x > platform.x - 5 && this.x < platform.x + 1) {
            this.x = restartX;
            this.y = restartY;
            this.vx = 0;
            this.vy = 0;
        }
        
    if (platform.canKill === false && this.y > platform.y && this.y < platform.y + platform.height && this.x < platform.x + platform.width + 5 && this.x > platform.x + platform.width - 1) {
            this.x = platform.x + platform.width + 5;
            this.vx = 0;
        }
        
    if (platform.canKill === true && this.y > platform.y && this.y < platform.y + platform.height && this.x < platform.x + platform.width + 5 && this.x > platform.x + platform.width - 1) {
            this.x = restartX;
            this.y = restartY;
            this.vx = 0;
            this.vy = 0;
        }
        
    if (platform.canKill === false && this.x > platform.x && this.x < platform.x + platform.width && this.y < platform.y + platform.height + 5 && this.y > platform.y + platform.height - 1) {
        this.y = platform.y + platform.height + 5;
        this.vy = 0;
    }
    
    if (platform.canKill === true && this.x > platform.x && this.x < platform.x + platform.width && this.y < platform.y + platform.height + 5 && this.y > platform.y + platform.height - 1) {
        this.x = restartX;
        this.y = restartY;
        this.vx = 0;
        this.vy = 0;
        
    }
};
//Movement
Ball.prototype.applyUserInput = function(platforms) {
    
    if (keys.includes(RIGHT)) {
        
        this.ax = this.acceleration;
    }
    else if (keys.includes(LEFT)) {
            this.ax = -this.acceleration;
        }
    else  {
        this.ax = 0;
        }
        var intersect = false;
    for (var i = 0; i < platforms.length; i++){
        if (keys.includes(UP) && this.y === platforms[i].y - 5 && this.x > platforms[i].x &&           this.x < platforms[i].x + platforms[i].width) {
            intersect = true;
            
        }
        if(intersect === true){
            this.ay = -6;  
        }
        else {
            this.ay = 0;
        }
    }
};
Ball.prototype.applyBorders = function() {
    if (this.x < 5) {
        this.x = 5;
        this.vx = 0;
    }
    if (this.x > 395) {
        this.x = 395;
        this.vx = 0;
    }
    if (this.y > 400) {
        this.x = restartX;
        this.y = restartY;
        this.vy = 0;
        this.vx = 0;
    }
};
//Applying Velocity and Drag
Ball.prototype.applyGravity = function() {
    this.vy += this.gravity;
};
Ball.prototype.applyVelocity = function() {
    this.x += this.vx;
    this.y += this.vy;
};
Ball.prototype.applyAcceleration = function() {
    this.vx += this.ax;
    this.vy += this.ay;
};
Ball.prototype.applyDrag = function() {
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
Ball.prototype.draw = function() {
    fill(0, 98, 255);
    if (currentLevel > 0) {
        ellipse (this.x,this.y,10,10);
    }
};

draw = function() {
    
    var level = levels[currentLevel];
    var platforms = level.platforms;
    
    
    for (var i = 0; i < platforms.length; i++) {
        blueBall.applyIntersect(platforms[i]);
    }
    Level.applyChangeInLevels();
    playButton.applyMouse();
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
    Level.drawTextAndEnd();
    blueBall.draw();
    for (var i = 0; i < platforms.length; i++) {
        platforms[i].draw();
    }
};

keyPressed = function() {
    if (keys.includes(keyCode)) {
        
    }
    else {
    keys.push(keyCode);
    }
};

keyReleased = function() {
    keys.splice(keys.indexOf(keyCode), 1);
    
};

  }
}

  var canvas = document.getElementById("canvas"); 
  var processingInstance = new Processing(canvas, sketchProc);
