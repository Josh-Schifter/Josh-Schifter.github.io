var sketchProc = function(processingInstance) {
    with (processingInstance) {
      size(400, 400); 
      frameRate(60);    
      smooth();
     
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
var keys = [];
var blueBall = new Ball ({x: 269, y: 105});

Ball.prototype.draw = function() {
    fill(0, 98, 255);
    ellipse (this.x,this.y,10,10);
};
//Platforms
var Platform = function(config) {
    this.x = config.x;
    this.y = config.y;
    this.width = config.width;
    this.height = config.height;
    
};
Platform.prototype.draw = function() {
    fill(4, 255, 0);
    rect(this.x, this.y, this.width, this.height);
};

var bigPlatform = new Platform ({x: 0, y: 200, width: 139, height: 100});
var bigPlatform2 = new Platform ({x: 239, y: 200, width: 160, height: 100});
var platforms = [bigPlatform, bigPlatform2];


Ball.prototype.applyIntersect = function(platform) {
    if (this.y > platform.y - 5 && this.y < platform.y + 1 && this.x > platform.x && this.x < platform.x + platform.width) {
        this.y = platform.y - 5;
        this.vy = 0;
    } 
};    

    /*if (this.y > bigPlatform.y && this.y < bigPlatform.y + bigPlatform.height && this.x > bigPlatform.x && this.x < bigPlatform.x + bigPlatform.width ) {
            this.x = bigPlatform.x - 5;
            println("y");
        }*/

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
        this.x = 269;
        this.y = 105;
        this.vy = 0;
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

draw = function() {
    
    for (var i = 0; i < platforms.length; i++) {
        blueBall.applyIntersect(platforms[i]);
    }
    
    blueBall.applyUserInput(platforms);
    blueBall.applyBorders();
    blueBall.applyGravity();
    blueBall.applyAcceleration();
    blueBall.applyDrag();
    blueBall.applyVelocity();
    
    background(189, 253, 255);
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
