var sketchProc = function(processingInstance) {
    with (processingInstance) {
      size(600, 600); 
      frameRate(60);    
      smooth();
      
  textFont(createFont("verdana"));
  
  {
      //Key|Button stuff
      var clicked = false;
      var hover = false;
      var keys = [];
      keyPressed = function () {
          keys[keyCode] = true;
      };
      keyReleased = function () {
          keys[keyCode] = false;
      };
      mouseClicked = function () {
          clicked = true;
      };
  } //Keys/Mouse
  
  var Game = function(config) {
      this.page = "home";
      this.base = 570;
      
      this.titleFont = createFont("arial black");
      
      this.frequencyMax = 240;
      this.frequencyMin = 100;
      this.frequency = this.frequencyMax;
      this.frequencyTimer = 0;
      
      this.colors = [
          { //red
              back: color(205, 20, 54),
              front: color(237, 64, 66),
              brick: color(244, 120, 82)
          },
          { //blue
              back: color(84, 133, 229),
              front: color(94, 148, 255),
              brick: color(126, 169, 255)
          },
          { //green
              back: color(125, 181, 169),
              front: color(139, 201, 77),
              brick: color(162, 212, 113)
          },
          { //purple
              back: color(144, 101, 229),
              front: color(160, 113, 225),
              brick: color(179, 141, 255)
          }
      ];
      this.theme = 0;
      
      this.bricksRepository = [];
      this.bricks = [];
      this.brickPieces = [];
      
      this.enemiesRepository = [];
      this.enemies = [];
      
      this.bombsRepository = [];
      this.bombs = [];
      this.bombPiecesRepository = [];
      this.bombPieces = [];
      
      this.medkitsRepository = [];
      this.medkits = [];
      
      this.clouds = [];
      this.rain = [];
      this.drops = 0;
      
      this.storm = 0;
      
      this.score = 0;
      this.highscore = 0;
      this.health = 100;
      
      this.shake = 0;
      this.shakedown = 0.2;
      
      this.bombPieceCoords = [
          {
              x: 0,
              y: 0
          },
          {
              x: -0.5,
              y: 0 
          },
          {
              x: 0.5,
              y: 0 
          },
          {
              x: 0,
              y: -0.5 
          },
          {
              x: 0,
              y: 0.5 
          },
          {
              x: 0.25,
              y: 0.25 
          },
          {
              x: 0.25,
              y: -0.25 
          },
          {
              x: -0.25,
              y: 0.25 
          },
          {
              x: -0.25,
              y: -0.25 
          }
      ];
      
      this.leaderboardArr = [
          {
              user: "James (@James9075)",
              score: 4578
          },
          {
              user: "Dan Findley (@dantheother)",
              score: 3527
          },
          {
              user: "Could be you",
              score: 0
          },
          {
              user: "Could be you",
              score: 0
          },
          {
              user: "Could be you",
              score: 0
          },
          {
              user: "Could be you",
              score: 0
          },
          {
              user: "Could be you",
              score: 0
          },
          {
              user: "Could be you",
              score: 0
          },
          {
              user: "Could be you",
              score: 0
          },
          {
              user: "Could be you",
              score: 0
          }
      ];
      this.leaderboardArr.sort(function(a, b) {
         return b.score - a.score; 
      });
  };
  var game = new Game({});
  
  {
      var Button = function (config) {
          this.pos = config.pos || new PVector(0, 0);
          this.size = config.size || 70;
          this.content = config.content || "Home";
          this.page = config.page || "home";
          this.textSize = config.textSize || this.size / 5;
          this.borderColor = color(12, 31, 3, 20);
          this.backColor = game.colors[game.theme].back;
          this.textColor = color(245, 242, 242);
          this.backColorHover = game.colors[game.theme].front;
          this.textColorHover = color(245, 242, 242);
          this.growth = 0;
      };
  
      Button.prototype.draw = function () {
          pushStyle();
          textAlign(CENTER, CENTER);
          textSize(this.textSize + (this.growth * 0.1));
          noStroke();
  
          //shadow
          fill(20, 20, 20, 30);
          ellipse(this.pos.x, this.pos.y + this.size * 0.52, (this.size + this.growth) * 0.8, (this.size + this.growth) * 0.3);
  
          //circles
          if (dist(mouseX, mouseY, this.pos.x, this.pos.y) <= this.size / 2) { //hover
              this.growth = constrain(this.growth + 0.5, 0, 10);
              if (clicked) {
                  game.page = this.page;
                  if(game.page === "home") {
                      game.player.x = 300;
                      game.player.y = game.base;
                      game.boss.x = 280;
                      game.boss.y = 54;
                  }
                  if(game.page === "play" || game.page === "replay") {
                      game.reset();
                  }
              }
  
              fill(this.backColorHover);
              stroke(this.borderColor);
              ellipse(this.pos.x, this.pos.y, this.size + this.growth, this.size + this.growth);
              fill(this.textColorHover);
              switch(this.content) {
                  case "Play":
                      triangle(this.pos.x + this.size*0.25, this.pos.y, this.pos.x - this.size*0.15, this.pos.y - this.size*0.25, this.pos.x - this.size*0.15, this.pos.y + this.size*0.25);
                      break;
                  case "How":
                      pushStyle();
                          textSize(this.size*0.6);
                          text("?", this.pos.x, this.pos.y);
                      popStyle();
                      break;
                  case "Story":
                      pushStyle();
                          noFill();
                          stroke(this.textColorHover);
                          strokeWeight(4);
                          line(this.pos.x-this.size*0.23, this.pos.y-this.size*0.2, this.pos.x+this.size*0.23, this.pos.y-this.size*0.2);
                          line(this.pos.x-this.size*0.23, this.pos.y, this.pos.x+this.size*0.23, this.pos.y);
                          line(this.pos.x-this.size*0.23, this.pos.y+this.size*0.2, this.pos.x+this.size*0.23, this.pos.y+this.size*0.2);
                      popStyle();
                      break;
                  case "Themes":
                      arc(this.pos.x, this.pos.y, this.size + this.growth, this.size + this.growth, radians(271), radians(450));
                      break;
                  case "Back":
                      pushStyle();
                      beginShape();
                          vertex(this.pos.x+this.size*0.25, this.pos.y); //1
                          vertex(this.pos.x+this.size*0.25, this.pos.y+this.size*0.25); //2
                          vertex(this.pos.x+this.size*0.07, this.pos.y+this.size*0.25); //3
                          vertex(this.pos.x+this.size*0.07, this.pos.y+this.size*0.12); //4
                          vertex(this.pos.x-this.size*0.07, this.pos.y+this.size*0.12); //5
                          vertex(this.pos.x-this.size*0.07, this.pos.y+this.size*0.25); //6
                          vertex(this.pos.x-this.size*0.25, this.pos.y+this.size*0.25); //7
                          vertex(this.pos.x-this.size*0.25, this.pos.y); //8
                          vertex(this.pos.x, this.pos.y-this.size*0.2); //9
                          vertex(this.pos.x+this.size*0.25, this.pos.y); //10
                      endShape();
                      noFill();
                      stroke(this.textColorHover);
                      strokeWeight(this.size*0.05);
                      line(this.pos.x-this.size*0.27, this.pos.y-this.size*0.05, this.pos.x, this.pos.y-this.size*0.27);
                      line(this.pos.x+this.size*0.27, this.pos.y-this.size*0.05, this.pos.x, this.pos.y-this.size*0.27);
                      line(this.pos.x+this.size*0.15, this.pos.y-this.size*0.19, this.pos.x+this.size*0.15, this.pos.y-this.size*0.25);
                      popStyle();
                      break;
                  case "Leaderboard":
                      pushStyle();
                          noFill();
                          stroke(this.textColorHover);
                          strokeWeight(this.size * 0.14);
                          strokeCap(SQUARE);
                          
                          line(this.pos.x, this.pos.y + this.size * 0.25, this.pos.x, this.pos.y - this.size * 0.3);
                          line(this.pos.x - this.size * 0.2, this.pos.y + this.size * 0.25, this.pos.x - this.size * 0.2, this.pos.y - this.size * 0.1);
                          line(this.pos.x + this.size * 0.2, this.pos.y + this.size * 0.25, this.pos.x + this.size * 0.2, this.pos.y - this.size * 0.2);
                      popStyle();
                      break;
                  case "Replay":
                      pushStyle();
                          noFill();
                          stroke(this.textColorHover);
                          strokeWeight(5);
                          pushMatrix();
                              translate(this.pos.x, this.pos.y);
                              rotate(radians(frameCount * 5));
                              arc(0, 0, this.size * 0.6, this.size * 0.6, 0, radians(275));
                              noStroke();
                              fill(this.textColorHover);
                              translate(this.size * 0.30, -this.size * 0.18);
                              rotate(radians(-70));
                              triangle(0, -this.size * 0.1, -this.size * 0.14, -this.size * 0.3, this.size * 0.14, -this.size * 0.3);
                          popMatrix();
                      popStyle();
                      break;
                  default:
                      text(this.content, this.pos.x, this.pos.y);
              }
          }
          else { //not hover
              this.growth = constrain(this.growth - 0.5, 0, 10);
              fill(this.backColor);
              stroke(this.borderColor);
              strokeWeight(2);
              noStroke();
              ellipse(this.pos.x, this.pos.y, this.size + this.growth, this.size + this.growth);
              fill(this.textColor);
              switch(this.content) {
                  case "Play":
                      triangle(this.pos.x + this.size*0.25, this.pos.y, this.pos.x - this.size*0.15, this.pos.y - this.size*0.25, this.pos.x - this.size*0.15, this.pos.y + this.size*0.25);
                      break;
                  case "How":
                      pushStyle();
                          textSize(this.size*0.6);
                          text("?", this.pos.x, this.pos.y);
                      popStyle();
                      break;
                  case "Story":
                      pushStyle();
                          noFill();
                          stroke(this.textColor);
                          strokeWeight(4);
                          line(this.pos.x-this.size*0.23, this.pos.y-this.size*0.2, this.pos.x+this.size*0.23, this.pos.y-this.size*0.2);
                          line(this.pos.x-this.size*0.23, this.pos.y, this.pos.x+this.size*0.23, this.pos.y);
                          line(this.pos.x-this.size*0.23, this.pos.y+this.size*0.2, this.pos.x+this.size*0.23, this.pos.y+this.size*0.2);
                      popStyle();
                      break;
                  case "Themes":
                      arc(this.pos.x, this.pos.y, this.size, this.size, radians(271), radians(450));
                      break;
                  case "Back":
                      pushStyle();
                      beginShape();
                          vertex(this.pos.x+this.size*0.25, this.pos.y); //1
                          vertex(this.pos.x+this.size*0.25, this.pos.y+this.size*0.25); //2
                          vertex(this.pos.x+this.size*0.07, this.pos.y+this.size*0.25); //3
                          vertex(this.pos.x+this.size*0.07, this.pos.y+this.size*0.12); //4
                          vertex(this.pos.x-this.size*0.07, this.pos.y+this.size*0.12); //5
                          vertex(this.pos.x-this.size*0.07, this.pos.y+this.size*0.25); //6
                          vertex(this.pos.x-this.size*0.25, this.pos.y+this.size*0.25); //7
                          vertex(this.pos.x-this.size*0.25, this.pos.y); //8
                          vertex(this.pos.x, this.pos.y-this.size*0.2); //9
                          vertex(this.pos.x+this.size*0.25, this.pos.y); //10
                      endShape();
                      noFill();
                      stroke(this.textColor);
                      strokeWeight(this.size*0.05);
                      line(this.pos.x-this.size*0.27, this.pos.y-this.size*0.05, this.pos.x, this.pos.y-this.size*0.27);
                      line(this.pos.x+this.size*0.27, this.pos.y-this.size*0.05, this.pos.x, this.pos.y-this.size*0.27);
                      line(this.pos.x+this.size*0.15, this.pos.y-this.size*0.19, this.pos.x+this.size*0.15, this.pos.y-this.size*0.25);
                      popStyle();
                      break;
                  case "Leaderboard":
                      pushStyle();
                          noFill();
                          stroke(this.textColor);
                          strokeWeight(this.size * 0.14);
                          strokeCap(SQUARE);
                          
                          line(this.pos.x, this.pos.y + this.size * 0.25, this.pos.x, this.pos.y - this.size * 0.3);
                          line(this.pos.x - this.size * 0.2, this.pos.y + this.size * 0.25, this.pos.x - this.size * 0.2, this.pos.y - this.size * 0.1);
                          line(this.pos.x + this.size * 0.2, this.pos.y + this.size * 0.25, this.pos.x + this.size * 0.2, this.pos.y - this.size * 0.2);
                      popStyle();
                      break;
                  case "Replay":
                      pushStyle();
                          noFill();
                          stroke(this.textColor);
                          strokeWeight(5);
                          pushMatrix();
                              translate(this.pos.x, this.pos.y);
                              rotate(radians(sin(radians(frameCount * 5)) * 20));
                              arc(0, 0, this.size * 0.6, this.size * 0.6, 0, radians(275));
                              noStroke();
                              fill(this.textColor);
                              translate(this.size * 0.30, -this.size * 0.18);
                              rotate(radians(-70));
                              triangle(0, -this.size * 0.1, -this.size * 0.14, -this.size * 0.3, this.size * 0.14, -this.size * 0.3);
                          popMatrix();
                      popStyle();
                      break;
                  default:
                      text(this.content, this.pos.x, this.pos.y);
              }
          }
  
          popStyle();
      };
  } //Buttons
  
  var Block = function(config) {
      this.x = config.x || 0;
      this.y = config.y || 0;
      this.w = config.w || 40;
      this.h = config.h || 40;
      this.vx = random(-2, 2);
      this.vy = random(-5, -3);
      this.gravity = 0.3;
      this.used = config.used || false;
      this.timer = 300;
      this.opacity = 255;
      this.shaking = false;
      
      this.draw = function() {
          //override this function
      };
      
      this.run = function() {
          this.update();
          this.draw();
      };
  };
  Block.prototype.init = function() {
      this.x = game.boss.x + game.boss.w * 0.5 - this.w * 0.5;
      this.y = game.boss.y + game.boss.h * 0.5 - this.h * 0.5;
      this.vy = random(-5, -3);
      this.vx = random(-2, 2);
      this.opacity = 255;
      this.y += this.vy;
      this.timer = 300;
  };
  Block.prototype.update = function() {
      this.x += this.vx;
      this.vy += this.gravity;
      this.y = constrain(this.y + this.vy, -100, game.base - this.h);
  };
  
  var BrickPiece = function (config) {
      Block.call(this, config);
      
      this.image = config.image;
  
      this.draw = function() {
          noStroke();
          
          pushMatrix();
              translate(this.x, this.y);
          
              image(this.image, 0, 0, this.w, this.h);
          
          popMatrix();
      };
      
      this.run = function() {
          this.update();
          this.draw();
      };
  };
  BrickPiece.prototype = Object.create(Block.prototype);
  BrickPiece.prototype.init = function() {
      Block.prototype.init.call(this);
  };
  BrickPiece.prototype.update = function() {
      Block.prototype.update.call(this);
  };
  
  var Brick = function (config) {
      Block.call(this, config);
  
      this.draw = function() {
          noStroke();
          
          pushMatrix();
              translate(this.x, this.y);
          
              image(game.images.brick, 0, 0, this.w, this.h);
          
          popMatrix();
      };
      
      this.run = function() {
          this.update();
          this.draw();
      };
      
  };
  Brick.prototype = Object.create(Block.prototype);
  Brick.prototype.init = function() {
      Block.prototype.init.call(this);
  };
  Brick.prototype.update = function() {
      Block.prototype.update.call(this);
  };
  Brick.prototype.getImage = function() {
      noStroke();
      
      pushMatrix();
          translate(this.x, this.y);
      
          fill(game.colors[game.theme].back, this.opacity);
          rect(0, 0, this.w, this.h);
          
          fill(game.colors[game.theme].front, this.opacity);
          rect(this.w * 0.1, this.h * 0.1, this.w * 0.8, this.h * 0.8);
          
          fill(game.colors[game.theme].brick, this.opacity);
          rect(this.w * 0.25, this.h * 0.25, this.w * 0.3, this.h * 0.15);
          rect(this.w * 0.45, this.h * 0.65, this.w * 0.3, this.h * 0.15);
          
          if(this.timer < 300) {
              pushStyle();
                  fill(0);
                  textAlign(CENTER, CENTER);
                  textSize(12);
                  text(this.timer, this.w * 0.5, this.h * 0.5);
              popStyle();
          }
      
      popMatrix();
  };
  
  var Enemy = function (config) {
      Block.call(this, config);
      
      this.moving = false;
      this.dir = 0;
      this.flip = -1;
      this.scale = 1;
      
      this.hit = false;
      this.angle = 0;
      
      this.image = config.image;
  
      this.draw = function() {
          noStroke();
          
          pushMatrix();
              translate(this.x + this.w * 0.5, this.y + this.h * 0.5);
              scale(this.flip * this.scale, this.scale);
              if(this.hit) {
                  rotate(radians(this.angle++));
              }
              translate(-this.w * 0.5, -this.h * 0.5);
              
              if(this.vx < 0) {
                  this.flip = 1;
                  image(this.image, 0, 0, this.w, this.h);
              }
              else {
                  this.flip = -1;
                  image(this.image, 0, 0, this.w, this.h);
              }
          popMatrix();
      };
      
      this.run = function() {
          this.update();
          this.draw();
      };
      
  };
  Enemy.prototype = Object.create(Block.prototype);
  Enemy.prototype.init = function() {
      Block.prototype.init.call(this);
      this.moving = false;
      this.hit = false;
      this.angle = 0;
  };
  Enemy.prototype.update = function() {
      //Block.prototype.update.call(this);
      this.x += this.vx;
      this.vy += this.gravity;
      if(this.hit === false) {
          this.y = constrain(this.y + this.vy, -100, game.base - this.h);
      }
      else {
          this.y += this.vy;
      }
  };
  
  var Bomb = function (config) {
      Block.call(this, config);
      
      this.corner = 50;
      this.wick = this.h * 0.5;
      this.hitRadius = 200;
      
      this.draw = function() {
          noStroke();
          
          pushMatrix();
              translate(this.x + this.w * 0.5, this.y + this.h * 0.5);
              
              pushStyle();
                  noFill();
                  stroke(240, 240, 240);
                  strokeWeight(2);
                  line(0, -this.h * 0.5 - this.wick, 0, -this.h * 0.5);
                  
                  if(this.wick > 0) {
                      noStroke();
                      fill(242, 49, 24);
                      ellipse(0, -this.h * 0.5 - this.wick, random(6, 12), random(6, 12));
                      fill(250, 136, 15);
                      ellipse(0, -this.h * 0.5 - this.wick, random(4, 8), random(4, 8));
                  }
                  
                  noStroke();
                  fill(46, 44, 43);
  
                  rect(-this.w * 0.1, -this.h * 0.6, this.w * 0.2, this.h * 0.2);
                  ellipse(0, 0, this.w, this.h);
  
                  fill(100, 100, 100, 20);
                  ellipse(0, 0, this.hitRadius, this.hitRadius);
              popStyle();
          popMatrix();
      };
      
      this.run = function() {
          this.update();
          this.draw();
      };
      
  };
  Bomb.prototype = Object.create(Block.prototype);
  Bomb.prototype.init = function() {
      Block.prototype.init.call(this);
      this.wick = this.h * 0.5;
  };
  Bomb.prototype.update = function() {
      Block.prototype.update.call(this);
  };
  
  var BombPiece = function (config) {
      Block.call(this, config);
      
      this.rotation = true;
  
      this.draw = function() {
          noStroke();
          
          pushMatrix();
              translate(this.x + this.w * 0.5, this.y + this.h * 0.5);
              if(this.rotation) {
                  rotate(radians(frameCount));
              }
              translate(-this.w * 0.5, -this.h * 0.5);
              
              pushStyle();
                  fill(46, 44, 43, this.opacity);
                  rect(0, 0, this.w, this.h);
              popStyle();
          popMatrix();
      };
      
      this.run = function() {
          this.update();
          this.draw();
      };
      
  };
  BombPiece.prototype = Object.create(Block.prototype);
  BombPiece.prototype.init = function(x, y) {
      this.x = x;
      this.y = y;
      this.vy = random(-10, -5);
      this.vx = random(-5, 5);
      this.opacity = 255;
      this.y += this.vy;
      this.rotation = true;
  };
  BombPiece.prototype.update = function() {
      Block.prototype.update.call(this);
  };
  
  var MedKit = function (config) {
      Block.call(this, config);
      
      this.draw = function() {
          noStroke();
          
          pushMatrix();
              translate(this.x, this.y);
              
              pushStyle();
                  fill(255, 255, 255);
                  rect(0, 0, this.w, this.h);
                  fill(240, 65, 65);
                  ellipse(this.w * 0.5, this.h * 0.5, this.w * 0.8, this.h * 0.8);
                  fill(255, 255, 255);
                  rectMode(CENTER);
                  rect(this.w * 0.5, this.h * 0.5, this.w * 0.5, this.h * 0.2);
                  rect(this.w * 0.5, this.h * 0.5, this.w * 0.2, this.h * 0.5);
  
                  if(this.timer < 300) {
                      pushStyle();
                          fill(255);
                          textAlign(CENTER, CENTER);
                          textSize(12);
                          text(this.timer, 0, 0);
                      popStyle();
                  }
              popStyle();
          
          popMatrix();
      };
      
      this.run = function() {
          this.update();
          this.draw();
      };
      
  };
  MedKit.prototype = Object.create(Block.prototype);
  MedKit.prototype.init = function() {
      Block.prototype.init.call(this);
      this.x = random(0, width - this.w);
      this.y = -this.h;
      this.vx = 0;
  };
  MedKit.prototype.update = function() {
      Block.prototype.update.call(this);
  };
  
  var Building = function(config) {
      this.x = config.x;
      this.y = config.y;
      this.w = config.w;
      this.h = config.h;
      this.scale = config.scale || 1;
  
      this.theme = 0;
      
      this.back = game.colors[game.theme].back;
      this.front = game.colors[game.theme].front;
      this.brick = game.colors[game.theme].brick;
      
      this.window = function(x, y) {
          noStroke();
  
          pushMatrix();
              translate(x, y);
              fill(255, 255, 255);
              rect(0, 0, this.w * 0.18, this.h * 0.15);
              fill(28, 172, 172);
              rect(0, 0, this.w * 0.15, this.h * 0.135);
              
              //shading in window
              fill(160, 218, 218);
              beginShape();
                  vertex(-this.w * 0.075, -this.h * 0.041);
                  vertex(-this.w * 0.029, -this.h * 0.067);
                  vertex(this.w * 0.075, -this.h * 0.067);
                  vertex(this.w * 0.075, -this.h * 0.050);
                  vertex(-this.w * 0.075, this.h * 0.040);
              endShape(CLOSE);
              beginShape();
                  vertex(-this.w * 0.075, this.h * 0.055);
                  vertex(this.w * 0.075, -this.h * 0.034);
                  vertex(this.w * 0.075, this.h * 0.006);
                  vertex(-this.w * 0.030, this.h * 0.069);
                  vertex(-this.w * 0.075, this.h * 0.069);
              endShape(CLOSE);
              
              fill(255, 255, 255);
              rect(0, 0, this.w * 0.015, this.h * 0.15);
              
              //sill
              fill(this.brick);
              rect(0, this.h * 0.085, this.w * 0.2, this.h * 0.02);
              
              //shadow under sill
              fill(this.back, 150);
              rect(0, this.h * 0.12, this.w * 0.18, this.h * 0.05);
          popMatrix();
      };
      
      this.balcony = function(x, y, s) {
          noStroke();
  
          pushMatrix();
              translate(x, y);
              scale(s, 1);
              fill(this.front);
              rect(-this.w * 0.225, 0, this.w * 0.15, this.h * 0.025);
              fill(this.back);
              rect(-this.w * 0.275, 0, this.w * 0.075, this.h * 0.025);
              fill(182, 144, 193);
              rect(-this.w * 0.225, -this.h * 0.07, this.w * 0.15, this.h * 0.01);
              rect(-this.w * 0.168, -this.h * 0.039, this.w * 0.01, this.h * 0.052);
              rect(-this.w * 0.204, -this.h * 0.039, this.w * 0.01, this.h * 0.052);
              rect(-this.w * 0.244, -this.h * 0.039, this.w * 0.01, this.h * 0.052);
          popMatrix();
              
      };
      
      this.draw = function() {
          background(0, 0, 0, 0);
          
          pushMatrix();
              translate(this.x, this.y);
              scale(this.scale);
              pushStyle();
                  rectMode(CENTER);
                  noStroke();
                  
                  //balconies
                  //right
                  this.balcony(this.w * 0.8, -this.h * 0.770, 1);
                  this.balcony(this.w * 0.8, -this.h * 0.520, 1);
                  this.balcony(this.w * 0.8, -this.h * 0.270, 1);
                  //left
                  this.balcony(-this.w * 0.8, -this.h * 0.770, -1);
                  this.balcony(-this.w * 0.8, -this.h * 0.520, -1);
                  this.balcony(-this.w * 0.8, -this.h * 0.270, -1);
                  
                  //back of building
                  fill(this.back);
                  rect(0, -this.h * 0.5, this.w, this.h);
                  
                  //front of building
                  fill(this.front);
                  rect(0, -this.h * 0.475, this.w * 0.9, this.h * 0.94);
                  
                  //top of building
                  fill(this.front);
                  rect(0, -this.h * 1.02, this.w * 1.1, this.h * 0.04);
                  
                  //windows
                  //top row
                  this.window(-this.w * 0.25, -this.h * 0.85);
                  this.window(0, -this.h * 0.85);
                  this.window(this.w * 0.25, -this.h * 0.85);
                  
                  //middle row
                  this.window(-this.w * 0.25, -this.h * 0.6);
                  this.window(0, -this.h * 0.6);
                  this.window(this.w * 0.25, -this.h * 0.6);
                  
                  //bottom row
                  this.window(-this.w * 0.25, -this.h * 0.35);
                  this.window(0, -this.h * 0.35);
                  this.window(this.w * 0.25, -this.h * 0.35);
                  
                  //door
                  fill(255, 255, 255);
                  rect(0, -this.h * 0.08, this.w * 0.2, this.h * 0.16);
                  fill(28, 172, 172);
                  rect(0, -this.h * 0.08, this.w * 0.18, this.h * 0.15);
                  fill(this.brick);
                  rect(0, -this.h * 0.16, this.w * 0.3, this.h * 0.025);
                  fill(this.front, 120);
                  rect(0, -this.h * 0.135, this.w * 0.3, this.h * 0.025);
                  
                  //shadow on door
                  fill(160, 218, 218);
                  beginShape();
                      vertex(-this.w * 0.087, 0);
                      vertex(this.w * 0.089, -this.h * 0.116);
                      vertex(this.w * 0.089, -this.h * 0.095);
                      vertex(-this.w * 0.058, 0);
                  endShape(CLOSE);
                  triangle(-this.w * 0.038, 0, this.w * 0.089, -this.h * 0.081, this.w * 0.089, 0);
                  
                  //bottom of building
                  fill(this.back);
                  rect(0, 0, this.w * 1.1, this.h * 0.02);
                  
                  //sides of building
                  for(var i = 0; i < 15; i++) {
                      //right
                      fill(this.front);
                      rect(this.w * 0.475, -this.h * 0.06 - i * 30, this.w * 0.05, this.h * 0.02);
                      fill(this.brick);
                      rect(this.w * 0.485, -this.h * 0.045 - i * 30, this.w * 0.07, this.h * 0.03);
                      
                      //left
                      fill(this.front);
                      rect(-this.w * 0.475, -this.h * 0.06 - i * 30, this.w * 0.05, this.h * 0.02);
                      fill(this.brick);
                      rect(-this.w * 0.485, -this.h * 0.045 - i * 30, this.w * 0.07, this.h * 0.03);
                  }
                  
                  //top squares
                  fill(this.brick);
                  rect(this.w * 0.485, -this.h * 0.984, this.w * 0.07, this.h * 0.03);
                  rect(-this.w * 0.485, -this.h * 0.984, this.w * 0.07, this.h * 0.03);
                  
                  //bricks (random)
                  fill(this.brick);
                  rect(this.w * 0.395, -this.h * 0.923, this.w * 0.055, this.h * 0.0175);
                  rect(this.w * 0.395, -this.h * 0.702, this.w * 0.055, this.h * 0.0175);
                  rect(this.w * 0.355, -this.h * 0.089, this.w * 0.055, this.h * 0.0175);
                  rect(this.w * 0.313, -this.h * 0.133, this.w * 0.055, this.h * 0.0175);
                  rect(this.w * 0.228, -this.h * 0.060, this.w * 0.055, this.h * 0.0175);
                  rect(this.w * -0.328, -this.h * 0.073, this.w * 0.055, this.h * 0.0175);
                  rect(this.w * -0.182, -this.h * 0.094, this.w * 0.055, this.h * 0.0175);
                  rect(this.w * -0.354, -this.h * 0.164, this.w * 0.055, this.h * 0.0175);
                  rect(this.w * 0.125, -this.h * 0.204, this.w * 0.055, this.h * 0.0175);
                  rect(this.w * -0.125, -this.h * 0.416, this.w * 0.055, this.h * 0.0175);
                  rect(this.w * -0.125, -this.h * 0.639, this.w * 0.055, this.h * 0.0175);
                  rect(this.w * -0.125, -this.h * 0.908, this.w * 0.055, this.h * 0.0175);
                  rect(this.w * -0.398, -this.h * 0.845, this.w * 0.055, this.h * 0.0175);
                  rect(this.w * 0.126, -this.h * 0.721, this.w * 0.055, this.h * 0.0175);
              popStyle();
          popMatrix();
      };
  };
  var Boss = function(config) {
      this.x = config.x;
      this.y = config.y;
      this.w = 92;
      this.h = 98;
      this.flip = -1;
      this.dir = 1;
      this.vx = 1;
      this.scale = 1;
      
      this.image = config.image;
      
      this.getImage = function() {
          pushMatrix();
              translate(11, 10);
              scale(1.2);
              
              noStroke();
              
              //leg back
              fill(0, 23, 33);
              rect(14, 49, 13, 23);
              //arm back
              fill(0, 135, 144);
              rect(-8, 17, 15, 37, 50);
              //antenna back
              fill(95, 191, 231);
              rect(5, -8, 11, 22, 50);
              //body
              fill(15, 51, 66);
              rect(0, 0, 60, 60, 20);
              //leg front
              rect(34, 49, 13, 23);
              //eyes
              fill(206, 220, 73);
              rect(10, 10, 9, 4, 50);
              rect(28, 10, 9, 4, 50);
              //mouth
              fill(1, 176, 174);
              rect(4, 21, 43, 20, 5);
              //arm front
              rect(52, 17, 15, 37, 50);
              //antenna front
              fill(168, 210, 233);
              rect(41, -8, 11, 22, 50);
              //teeth
              fill(94, 198, 217);
              //teeth top
              for(var i = 0; i < 5; i++) {
                  rect(8 + i * 7, 21, 5, 6, 0, 0, 50, 50);
                  rect(8 + i * 7, 35, 5, 6, 50, 50, 0, 0);
              }
          popMatrix();
      };
      
      this.update = function() {
          this.x += this.vx * this.dir;
          
          if(this.x < 180 || this.x + this.w > 420) {
              this.dir*= -1;
              this.flip*= -1;
          }
      };
      
      this.draw = function() {
          noStroke();
          
          pushMatrix();
              translate(this.x + this.w * 0.5, this.y + this.h * 0.5);
              scale(this.flip * this.scale, this.scale);
              translate(-this.w * 0.5, -this.h * 0.5);
          
              image(this.image, 0, 0, this.w, this.h);
          popMatrix();
      };
      
      this.run = function() {
          this.update();
          this.draw();
      };
  };
  var Player = function(config) {
      this.x = config.x;
      this.y = config.y;
      this.w = config.w;
      this.h = config.h;
      this.vx = 0;
      this.vy = 0;
      this.vamount = 0.5;
      this.vmax = 8;
      this.friction = 10;
      this.gravity = 0.5;
      this.dir = 0;
      this.jump = true;
      
      this.flip = -1;
      this.scale = 1;
      
      this.hitboxTop = {};
      this.hitboxBottom = {};
      
      this.imageFront = config.imageFront;
      this.imageSide = config.imageSide;
      
      this.getImageFront = function() {
          pushMatrix();
              translate(7, 1);
              scale(0.70);
  
              //ears
              noStroke();
              fill(238, 146, 125);
              rect(-8, 25, 96, 10, 20);
              //face dark
              fill(244, 174, 138);
              rect(0, 0, 80, 50, 20);
              //face light
              fill(246, 192, 156);
              rect(0, 0, 80, 40, 20);
              //glasses
              fill(30, 64, 73);
              rect(-3, 15, 86, 10);
              ellipse(22, 20, 30, 30);
              ellipse(58, 20, 30, 30);
              //inner eyes
              fill(255, 255, 255);
              ellipse(22, 20, 15, 15);
              ellipse(58, 20, 15, 15);
              fill(164, 206, 58);
              arc(22, 20, 15, 15, radians(-31), radians(150));
              arc(58, 20, 15, 15, radians(-31), radians(150));
              //mouth
              fill(241, 106, 107);
              rect(30, 36, 20, 6, 50);
              //body
              fill(241, 103, 57);
              rect(17, 50, 46, 25, 0, 0, 50, 50);
              //legs
              rect(25, 73, 12, 24);
              rect(43, 73, 12, 24);
              //feet
              fill(30, 64, 73);
              rect(25, 90, 12, 7);
              rect(43, 90, 12, 7);
              //belt
              rect(17, 57, 46, 9);
              //belt buttons
              rect(36, 54, 9, 16, 50);
              rect(26, 54, 9, 16, 50);
              rect(46, 54, 9, 16, 50);
              fill(164, 206, 58);
              rect(38, 56, 5, 12, 50);
              rect(28, 56, 5, 12, 50);
              rect(48, 56, 5, 12, 50);
              fill(255, 255, 255);
              rect(39, 58, 2, 5, 50);
              rect(29, 58, 2, 5, 50);
              rect(49, 58, 2, 5, 50);
              //arms
              fill(246, 192, 156);
              rect(7, 51, 10, 32, 5, 0, 0, 50);
              rect(63, 51, 10, 32, 0, 5, 50, 0);
          popMatrix();
      };
  
      this.getImageSide = function() {
          pushMatrix();
              translate(7, 1);
              scale(0.70);
  
              //ears
              noStroke();
              fill(238, 146, 125);
              rect(-6, 25, 96, 10, 20);
              //face dark
              fill(244, 174, 138);
              rect(0, 0, 80, 50, 20);
              //face light
              fill(246, 192, 156);
              rect(0, 0, 80, 40, 20);
              //glasses
              fill(30, 64, 73);
              rect(-3, 15, 86, 10);
              ellipse(14, 20, 30, 30);
              ellipse(50, 20, 30, 30);
              //inner eyes
              fill(255, 255, 255);
              ellipse(14, 20, 15, 15);
              ellipse(50, 20, 15, 15);
              fill(164, 206, 58);
              arc(14, 20, 15, 15, radians(-31), radians(150));
              arc(50, 20, 15, 15, radians(-31), radians(150));
              //mouth
              fill(241, 106, 107);
              rect(22, 36, 20, 6, 50);
              //arm behind
              fill(237, 146, 125);
              rect(12, 51, 12, 32, 5, 0, 0, 50);
              //leg behind
              fill(222, 34, 48);
              rect(25, 73, 12, 24);
              //body
              fill(241, 103, 57);
              rect(17, 50, 46, 25, 0, 0, 50, 50);
              //legs
              rect(43, 73, 12, 24);
              //feet
              fill(30, 64, 73);
              rect(25, 90, 12, 7);
              rect(43, 90, 12, 7);
              //belt
              rect(17, 57, 46, 9);
              //belt buttons
              rect(32, 54, 9, 16, 50);
              rect(22, 54, 9, 16, 50);
              rect(42, 54, 9, 16, 50);
              fill(164, 206, 58);
              rect(34, 56, 5, 12, 50);
              rect(24, 56, 5, 12, 50);
              rect(44, 56, 5, 12, 50);
              fill(255, 255, 255);
              rect(35, 58, 2, 5, 50);
              rect(25, 58, 2, 5, 50);
              rect(45, 58, 2, 5, 50);
              //arms
              fill(246, 192, 156);
              rect(56, 51, 12, 32, 5, 5, 50, 0);
          popMatrix();
      };
  
      this.move = function() {
          if (this.x === 0) {
              this.vx = this.vamount;
          }
          else if (this.x === width - this.w) {
              this.vx = -this.vamount;
          }
          else if(keys[LEFT] || keys[65]) { //Left arrow or A
              this.vx -= this.vamount;
              this.dir = -1;
          }
          else if(keys[RIGHT] || keys[68]) { //Right arrow or D
              this.vx += this.vamount;
              this.dir = 1;
          }
          else if(this.dir === 1) {
              this.vx = constrain(this.vx - this.vamount * this.dir, 0, this.friction);
          }
          else if(this.dir === -1) {
              this.vx = constrain(this.vx - this.vamount * this.dir, -this.friction, 0);
          }
  
          if((keys[UP] || keys[87]) && this.jump) { //Up arrow or W
                  this.vy = -11;
                  this.jump = false;
          }
          else {
              if(this.vy > 0.15) {
                  this.jump = false;
              }
              
              if(this.y + this.h === game.base) {
                  this.jump = true;
              } 
          }
      };
      
      this.update = function() {
          this.vy += this.gravity;
          this.vx = constrain(this.vx, -this.vmax, this.vmax);
          this.y = constrain(this.y + this.vy, 0, game.base - this.h);
          this.x = constrain(this.x + this.vx, 0, width - this.w);
      };
      
      this.draw = function() {
          noStroke();
          
          pushMatrix();
              translate(this.x + this.w * 0.5, this.y + this.h * 0.5);
              scale(this.flip * this.scale, this.scale);
              translate(-this.w * 0.5, -this.h * 0.5);
              
              if(this.vx === 0 || this.x <= 5 || this.x + this.w >= width - 5) {
                  image(this.imageFront, 0, 0, this.w, this.h);
              }
              else if(this.vx < 0) {
                  this.flip = 1;
                  image(this.imageSide, 0, 0, this.w, this.h);
              }
              else {
                  this.flip = -1;
                  image(this.imageSide, 0, 0, this.w, this.h);
              }
          popMatrix();
      };
      
      this.run = function() {
          this.move();
          this.update();
          this.draw();
      };
  };
  var Cloud = function(config) {
      this.x = config.x;
      this.y = config.y;
      this.vx = config.vx;
      this.w = config.w;
      this.type = config.type;
      
      this.update = function() {
          this.x+= this.vx;
      };
      
      this.draw = function() {
          noStroke();
          
          fill(
              map(game.storm, 0, 100, 255, 140), 
              map(game.storm, 0, 100, 255, 140), 
              map(game.storm, 0, 100, 255, 140));
          
          //fill(255, 255, 255);
          
          pushMatrix();
              translate(this.x, this.y);
          
              switch(this.type) {
                  case 1:
                      rect(0, 0, this.w, this.w * 0.2, 50);
                      rect(this.w * 0.2, -this.w * 0.1, this.w * 0.6, this.w * 0.2, 50);
                      ellipse(this.w * 0.6, 0, this.w * 0.5, this.w * 0.4);
                      break;
                  case 2:
                      rect(0, 0, this.w, this.w * 0.2, 50);
                      rect(this.w * 0.2, -this.w * 0.1, this.w * 0.6, this.w * 0.2, 50);
                      ellipse(this.w * 0.4, 0, this.w * 0.5, this.w * 0.4);
                      break;
                  case 3:
                      rect(0, 0, this.w, this.w * 0.2, 50);
                      rect(this.w * 0.3, -this.w * 0.1, this.w * 0.6, this.w * 0.2, 50);
                      ellipse(this.w * 0.5, 0, this.w * 0.5, this.w * 0.4);
                      break;
              }
          popMatrix();
      };
      
      this.run = function() {
          this.update();
          this.draw();
      };
  };
  var Rain = function(config) {
      this.x = config.x || random(10, width - 10);
      this.y = config.y || random(-50, -10);
      this.vy = config.vy || random(5, 10);
      this.radius = config.radius || random(2, 5);
      
      this.update = function() {
          this.y+= this.vy;
      };
      
      this.draw = function() {
          noStroke();
          
          fill(148, 235, 247, 180);
          ellipse(this.x, this.y, this.radius, this.radius);
      };
      
      this.run = function() {
          this.update();
          this.draw();
      };
  };
   
  Game.prototype.collision = function(obj1, obj2) {
      if( obj1.x + obj1.w > obj2.x && 
          obj1.x < obj2.x + obj2.w && 
          obj1.y + obj1.h > obj2.y && 
          obj1.y < obj2.y + obj2.h) {
          return true;
      }
      return false;
  };
  Game.prototype.collisionPlayer = function(obj) {
      if( this.player.x + this.player.w > obj.x && 
          this.player.x < obj.x + obj.w && 
          this.player.y + this.player.h * 0.5 > obj.y && 
          this.player.y < obj.y + obj.h) {
          return true;
      }
      if( this.player.x + this.player.w * 0.8 > obj.x && 
          this.player.x + this.player.w * 0.2 < obj.x + obj.w && 
          this.player.y + this.player.h > obj.y && 
          this.player.y + this.player.h * 0.5 < obj.y + obj.h) {
          return true;
      }
      return false;
  };
  Game.prototype.shakeScreen = function() {
      if(this.shake > 0) {
          //it goes down so eventually it will go down to 0
          this.shake = constrain(this.shake - this.shakedown, 0, 10);
          translate(round(random(-this.shake, this.shake)), round(random(-this.shake, this.shake)));
      }
  };
  Game.prototype.getEnemyImage = function() {
      pushMatrix();
          translate(10, 2);
          scale(2.7);
          
          noStroke();
      
          //arm behind
          pushMatrix();
              translate(8, 43);
              rotate(radians(50));
              fill(234, 156, 129);
              rect(0, 0, 39, 19, 50);
          popMatrix();
          fill(240, 189, 162);
          ellipse(11, 62, 8, 8);
          
          //pants
          fill(10, 33, 48);
          rect(22, 60, 36, 21, 0, 0, 50, 50);
          
          //body
          fill(65, 86, 105);
          rect(12, 42, 56, 27, 0, 0, 50, 50);
          
          //body circle
          fill(10, 33, 48);
          rect(14, 57, 0, 8);
          ellipse(15, 59, 8, 8);
          ellipse(17, 59, 8, 8);
          fill(164, 206, 58);
          ellipse(15, 59, 4, 4);
      
          //face dark
          fill(10, 33, 48);
          rect(20, 0, 40, 50);
          ellipse(22, 25, 50, 50);
          ellipse(58, 25, 50, 50);
          
          //right eye
          fill(66, 92, 117);
          rect(10, 13, 5, 20);
          ellipse(11, 23, 20, 20);
          ellipse(15, 23, 20, 20);
          //inner right eye
          fill(255, 233, 67);
          ellipse(10, 23, 15, 15);
          fill(164, 206, 58);
          arc(10, 23, 15, 15, radians(-31), radians(150));
          noFill();
          stroke(164, 206, 58);
          line(3, 24, 14, 17);
          noStroke();
          
          //right eyebrow
          fill(22, 48, 70);
          rect(12, 6, 20, 4, 50);
          
          //left eye
          fill(236, 187, 156);
          rect(38, 18, 17, 11, 50);
          fill(0, 0, 0);
          ellipse(44, 24, 4, 4);
          pushMatrix();
              rotate(radians(-10));
              fill(65, 86, 105);
              rect(32, 23, 20, 5, 50);
          popMatrix();
          
          //mouth
          fill(66, 92, 117);
          rect(24.0, 37.4, 5.5, 11.6);
          ellipse(25, 43, 12, 12);
          ellipse(29, 43, 12, 12);
          fill(124, 141, 157);
          ellipse(25.5, 43, 9.0, 9.0);
          fill(214, 231, 238);
          ellipse(24, 42, 4, 4);
          
          //legs
          fill(10, 33, 48);
          rect(22, 78, 12, 16, 50, 0, 0, 0);
          fill(10, 33, 48);
          rect(46, 73, 12, 21);
          fill(65, 86, 105);
          ellipse(24, 84, 6, 6);
          ellipse(48, 84, 6, 6);
          
          //arm front
          fill(238, 147, 120);
          rect(53, 43, 19, 36, 50);
          fill(227, 96, 109);
          ellipse(61, 56, 8, 8);
          pushMatrix();
              translate(51, 43);
              rotate(radians(50));
              fill(245, 190, 156);
              rect(0, 0, 39, 19, 50);
          popMatrix();
          fill(235, 143, 123);
          ellipse(52, 59, 3, 3);
          ellipse(57, 61, 3, 3);
          ellipse(53, 65, 3, 3);
      popMatrix();
  };
  Game.prototype.getMedKit = function() {
      for(var i = 0; i < this.medkitsRepository.length; i++) {
          if(this.medkitsRepository[i].used === false) {
              this.medkitsRepository[i].used = true;
              return this.medkitsRepository[i];
          }
      }
  };
  Game.prototype.addMedKit = function() {
      var medkit = this.getMedKit();
      if(medkit) {
          medkit.init();
          this.medkits.push(medkit);
      }
  };
  Game.prototype.runMedKits = function() {
      var medkit;
      
      for(var i = this.medkits.length - 1; i >= 0; i--) {
          medkit = this.medkits[i];
          medkit.run();
  
          if(this.collisionPlayer(medkit)) {
              medkit.used = false;
              this.medkits.splice(i, 1);
              this.setHealth(10);
          }
          else if(medkit.y + medkit.h >= this.base) {
              medkit.y = this.base - medkit.h;
              medkit.vx = 0;
              medkit.opacity = constrain(medkit.opacity - 1, 0, 255);
              
              if(medkit.opacity <= 0) {
                  //explosion
                  medkit.used = false;
                  this.medkits.splice(i, 1);
              }
          }
      }
  };
  Game.prototype.getBombPiece = function() {
      for(var i = 0; i < this.bombPiecesRepository.length; i++) {
          if(this.bombPiecesRepository[i].used === false) {
              this.bombPiecesRepository[i].used = true;
              return this.bombPiecesRepository[i];
          }
      }
  };
  Game.prototype.addBombPieces = function(bomb) {
      var bombPiece;
      for(var i = 0; i < 9; i++) {
          bombPiece = this.getBombPiece();
          if(bombPiece) {
              bombPiece.init(bomb.x + this.bombPieceCoords[i].x, bomb.y + this.bombPieceCoords[i].y);
              this.bombPieces.push(bombPiece);
          }
      }
  };
  Game.prototype.runBombPieces = function() {
      var bombPiece;
      
      for(var i = this.bombPieces.length - 1; i >= 0; i--) {
          bombPiece = this.bombPieces[i];
          bombPiece.run();
  
          if(this.collisionPlayer(bombPiece)) {
              bombPiece.used = false;
              this.bombPieces.splice(i, 1);
              this.setHealth(-5);
          }
          else {
              bombPiece.opacity = constrain(bombPiece.opacity - 1, 0, 255);
              
              if(bombPiece.y + bombPiece.h >= this.base) {
                  bombPiece.vx = 0;
                  bombPiece.rotation = false;
              }
              
              if(bombPiece.opacity <= 0) {
                  bombPiece.used = false;
                  this.bombPieces.splice(i, 1);
              }
          }
      }
  };
  Game.prototype.getBomb = function() {
      for(var i = 0; i < this.bombsRepository.length; i++) {
          if(this.bombsRepository[i].used === false) {
              this.bombsRepository[i].used = true;
              return this.bombsRepository[i];
          }
      }
  };
  Game.prototype.addBomb = function() {
      var bomb = this.getBomb();
      if(bomb) {
          bomb.init();
          this.bombs.push(bomb);
      }
  };
  Game.prototype.runBombs = function() {
      var bomb;
      
      for(var i = this.bombs.length - 1; i >= 0; i--) {
          bomb = this.bombs[i];
          bomb.run();
  
          if(bomb.y + bomb.h >= this.base) {
              bomb.y = this.base - bomb.h;
              bomb.vx = 0;
              bomb.opacity = constrain(bomb.opacity - 1, 0, 255);
              bomb.wick-= 0.1;
              if(bomb.shaking === false) {
                  bomb.shaking = true;
                  this.shake = 3;
              }
              
              if(bomb.wick <= 0) {
                  //explosion
                  this.shake = 25;
                  bomb.shaking = false;
                  
                  //Check for circle collision with hitRadius
                  var dx = this.player.x - bomb.x;
                  var dy = this.player.y - bomb.y;
                  var distance = Math.sqrt(dx * dx + dy * dy);
                  
                  if (distance < this.player.w / 2 + bomb.hitRadius / 2) {
                      this.setHealth(-10);
                  }
                  
                  this.addBombPieces(bomb);
                  
                  bomb.used = false;
                  this.bombs.splice(i, 1);
              }
          }
      }
  };
  Game.prototype.getEnemy = function() {
      for(var i = 0; i < this.enemiesRepository.length; i++) {
          if(this.enemiesRepository[i].used === false) {
              this.enemiesRepository[i].used = true;
              return this.enemiesRepository[i];
          }
      }
  };
  Game.prototype.addEnemy = function() {
      var enemy = this.getEnemy();
      if(enemy) {
          enemy.init();
          this.enemies.push(enemy);
      }
  };
  Game.prototype.runEnemies = function() {
      var enemy;
      
      for(var i = this.enemies.length - 1; i >= 0; i--) {
          enemy = this.enemies[i];
          enemy.run();
  
          if(enemy.hit === false && this.collisionPlayer(enemy)) {
              this.setHealth(-10);
              this.shake = 3;
              enemy.hit = true;
              
              if(enemy.y + enemy.h < this.base) {
                  enemy.vy = -10;
              }
              else if(enemy.vx > 0) {
                  enemy.vx = -3;
                  enemy.vy = -7;
              }
              else {
                  enemy.vx = 3;
                  enemy.vy = -7;
              }
          }
          else if(enemy.hit) {
              if(enemy.y > height + enemy.h) {
                  enemy.used = false;
                  this.enemies.splice(i, 1);
              }
          }
          else if(enemy.y + enemy.h >= this.base) {
              enemy.y = this.base - enemy.h;
              
              if(enemy.moving === false) {
                  this.shake = 3;
                  enemy.moving = true;
                  if(random() < 0.5) {
                      enemy.vx = 5;
                  }
                  else {
                      enemy.vx = -5;
                  }
              }
              
              if(enemy.x > width || enemy.x + enemy.w < 0) {
                  enemy.used = false;
                  this.enemies.splice(i, 1);
              }
          }
      }
  };
  Game.prototype.getBrick = function() {
      for(var i = 0; i < this.bricksRepository.length; i++) {
          if(this.bricksRepository[i].used === false) {
              this.bricksRepository[i].used = true;
              return this.bricksRepository[i];
          }
      }
  };
  Game.prototype.addBrick = function() {
      var brick = this.getBrick();
      if(brick) {
          brick.init();
          this.bricks.push(brick);
      }
  };
  Game.prototype.runBricks = function() {
      var brick;
      for(var i = this.bricks.length - 1; i >= 0; i--) {
          brick = this.bricks[i];
          brick.run();
  
          if(this.collisionPlayer(brick) || brick.y + brick.h >= this.base) {
              this.shake = 3;
              this.brickPieces.push(new BrickPiece({
                  x: brick.x,
                  y: brick.y,
                  w: brick.w * 0.5,
                  h: brick.h * 0.5,
                  image: game.images.brick1
              }));
              
              this.brickPieces.push(new BrickPiece({
                  x: brick.x + brick.w * 0.5,
                  y: brick.y,
                  w: brick.w * 0.5,
                  h: brick.h * 0.5,
                  image: game.images.brick2
              }));
              
              this.brickPieces.push(new BrickPiece({
                  x: brick.x,
                  y: brick.y + brick.h * 0.5,
                  w: brick.w * 0.5,
                  h: brick.h * 0.5,
                  image: game.images.brick3
              }));
              
              this.brickPieces.push(new BrickPiece({
                  x: brick.x + brick.w * 0.5,
                  y: brick.y + brick.h * 0.5,
                  w: brick.w * 0.5,
                  h: brick.h * 0.5,
                  image: game.images.brick4
              }));
              
              brick.used = false;
              this.bricks.splice(i, 1);
          }
      }
  };
  Game.prototype.runBrickPieces = function() {
      var brick;
      
      for(var i = this.brickPieces.length - 1; i >= 0; i--) {
          
          brick = this.brickPieces[i];
          brick.run();
  
          if(this.collisionPlayer(brick)) {
              brick.used = false;
              this.brickPieces.splice(i, 1);
              this.setHealth(-5);
          }
          else if(brick.y + brick.h >= this.base) {
              brick.y = this.base - brick.h;
              brick.vx = 0;
              //brick.opacity = constrain(brick.opacity - 1, 0, 255);
              brick.timer--;
              
              if(brick.timer === 0) {
                  //brick.used = false;
                  this.brickPieces.splice(i, 1);
              }
          }
      }
  };
  Game.prototype.healthBar = function() {
      noStroke();
      fill(247, 71, 40);
      pushMatrix();
          translate(470, 25);
          scale(0.3);
          rotate(radians(45));
          pushStyle();
              rectMode(CENTER);
              rect(0, 0, 50, 50);
              rotate(radians(-45));
              ellipse(-13, -13, 50, 50);
              ellipse(13, -13, 50, 50);
          popStyle();
      popMatrix();
      
      fill(213, 201, 224);
      rect(490, 10, 100, 30);
      fill(69, 197, 176);
      rect(490 + 100 - map(this.health, 0, 100, 0, 100), 10, map(this.health, 0, 100, 0, 100), 30);
  };
  Game.prototype.setHealth = function(n) {
      this.health = constrain(this.health + n, 0, 100);  
  };
  Game.prototype.resetCloud = function(cloud) {
      cloud.x = -cloud.w * 2;
      cloud.y = random(50, 200);
      cloud.vx = random(0.4, 0.8);
      cloud.w = floor(random(90, 120));
  };
  Game.prototype.resetRain = function(rain) {
      rain.x = random(10, width - 10);
      rain.y = random(-50, -10);
      rain.vy = random(5, 10);
  };
  Game.prototype.stats = function() {
      pushStyle();
          textAlign(CENTER);
          textSize(20);
          if(this.storm < 60) {
              fill(0, 0, 0, 200);
          }
          else {
              fill(240, 240, 240, 200);
          }
          
          text("FREQUENCY: " + this.frequency, width * 0.5, 30);
  
          textAlign(LEFT);
          textSize(20);
          text("SCORE: " + this.score, 10, 30);
          
          this.healthBar();
      popStyle();
  };
  Game.prototype.scene = function() {
      fill(206, 197, 226, 100);
      beginShape();
          vertex(0, 250);
          vertex(40, 250);
          vertex(40, 280);
          vertex(70, 280);
          vertex(70, 390);
          vertex(130, 390);
          vertex(130, 230);
          vertex(300, 230);
          vertex(300, 250);
          vertex(470, 250);
          vertex(470, 270);
          vertex(500, 270);
          vertex(500, 420);
          vertex(550, 420);
          vertex(550, 320);
          vertex(570, 320);
          vertex(570, 300);
          vertex(550, 300);
          vertex(550, 290);
          vertex(600, 290);
          vertex(600, 600);
          vertex(0, 600);
      endShape(CLOSE);
      
      noStroke();
      fill(185, 174, 214);
      rect(0, 550, width, 51);
      
      image(game.images.building, 0, 0);
  };
  Game.prototype.init = function() {
      this.clouds.push(new Cloud({
          x: 140,
          y: 70,
          w: 100,
          vx: 0.4,
          type: 1
      }));
      this.clouds.push(new Cloud({
          x: 300,
          y: 120,
          w: 120,
          vx: 0.8,
          type: 2
      }));
      this.clouds.push(new Cloud({
          x: 80,
          y: 200,
          w: 90,
          vx: 0.6,
          type: 3
      }));
      
      for(var i = 0; i < 50; i++) {
          this.rain.push(new Rain({}));
      }
      
      this.backButton = new Button({
          pos: new PVector(300, 540),
          content: "Back",
          page: "home"
      });
      this.storyButton = new Button({
          pos: new PVector(520, 200),
          content: "Story",
          page: "story"
      });
      this.howButton = new Button({
          pos: new PVector(520, 300),
          content: "How",
          page: "how"
      });
      this.playButton = new Button({
          pos: new PVector(520, 400),
          content: "Play",
          page: "play"
      });
      this.leaderboardButton = new Button({
          pos: new PVector(520, 500),
          content: "Leaderboard",
          page: "leaderboard"
      });
      this.replayButton = new Button({
          pos: new PVector(300, 410),
          content: "Replay",
          page: "play"
      });
      
      this.player = new Player({
          x: 300,
          y: this.base,
          w: 70,
          h: 70
      });
      this.building = new Building({
          x: 300,
          y: 550,
          w: 280,
          h: 480,
          scale: 0.8
      });
      this.boss = new Boss({
          x: 280,
          y: 54
      });
      
      //to get images
      this.brick = new Brick({});
      this.brick.x = 0;
      this.brick.y = 0;
      
      this.images = {
          building: function() {
              background(0, 0, 0, 0);
              game.building.draw();
              return get(0, 0, width, height);
          },
          boss: function() {
              background(0, 0, 0, 0);
              game.boss.getImage();
              return get(0, 0, game.boss.w, game.boss.h);
          },
          playerFront: function() {
              background(0, 0, 0, 0);
              game.player.getImageFront();
              return get(0, 0, game.player.w, game.player.h);
          },
          playerSide: function() {
              background(0, 0, 0, 0);
              game.player.getImageSide();
              return get(0, 0, game.player.w, game.player.h);
          },
          enemy: function() {
              background(0, 0, 0, 0);
              game.getEnemyImage();
              return get(0, 0, 235, 255);
          },
          brick: function() {
              background(0, 0, 0, 0);
              game.brick.getImage();
              return get(0, 0, game.brick.w, game.brick.h);
          },
          brick1: function() {
              background(0, 0, 0, 0);
              game.brick.getImage();
              return get(0, 0, game.brick.w * 0.5, game.brick.h * 0.5);
          },
          brick2: function() {
              background(0, 0, 0, 0);
              game.brick.getImage();
              return get(game.brick.w * 0.5, 0, game.brick.w * 0.5, game.brick.h * 0.5);
          },
          brick3: function() {
              background(0, 0, 0, 0);
              game.brick.getImage();
              return get(0, game.brick.h * 0.5, game.brick.w * 0.5, game.brick.h * 0.5);
          },
          brick4: function() {
              background(0, 0, 0, 0);
              game.brick.getImage();
              return get(game.brick.w * 0.5, game.brick.h * 0.5, game.brick.w * 0.5, game.brick.h * 0.5);
          }
      };
  
      //preload images
      for (var i in this.images) {
          if (typeof this.images[i] !== 'object') {
              background(0, 0, 0, 0);
              noStroke();
              this.images[i] = this.images[i]();
          }
      }
      
      this.boss.image = this.images.boss;
      this.player.imageFront = this.images.playerFront;
      this.player.imageSide = this.images.playerSide;
      
      //add objects to repositories
      for(var i = 0; i < 10; i++) {
          this.bricksRepository.push(new Brick({}));
          this.enemiesRepository.push(new Enemy({
              image: this.images.enemy,
              w: 61,
              h: 66
          }));
          this.bombsRepository.push(new Bomb({}));
          this.medkitsRepository.push(new MedKit({
              w: 35,
              h: 35
          }));
      }
      for(var i = 0; i < 90; i++) {
          this.bombPiecesRepository.push(new BombPiece({
              w: 10,
              h: 10
          }));
      } //bomb pieces
  };
  Game.prototype.reset = function() {
      //to do
      this.frequency = this.frequencyMax;
      this.frequencyTimer = 0;
      this.boss.vx = 1;
      this.boss.x = 280;
      this.player.x = 300;
      this.score = 0;
      this.health = 100;
      this.shake = 0;
      this.drops = 0;
      this.storm = 0;
      
      //clear existing assets
      this.bricks.length = 0;
      this.brickPieces.length = 0;
      this.enemies.length = 0;
      this.bombs.length = 0;
      this.bombPieces.length = 0;
      this.medkits.length = 0;
      
      //reset all repositories so all assets available
      for(var i = 0; i < this.bricksRepository.length; i++) {
          this.bricksRepository[i].used = false;
      }
      for(var i = 0; i < this.enemiesRepository.length; i++) {
          this.enemiesRepository[i].used = false;
      }
      for(var i = 0; i < this.bombsRepository.length; i++) {
          this.bombsRepository[i].used = false;
      }
      for(var i = 0; i < this.medkitsRepository.length; i++) {
          this.medkitsRepository[i].used = false;
      }
      for(var i = 0; i < this.bombPiecesRepository.length; i++) {
          this.bombPiecesRepository[i].used = false;
      }
      
      this.page = "play";
  };
  Game.prototype.run = function() {
      if(this.paused) {
          pushStyle();
              noStroke();
              image(this.pausedScreen, 0, 0, width, height);
              rectMode(CENTER);
              fill(30, 35, 60, 150);
              rect(width/2, height/2, 300, 150, 10);
              textAlign(CENTER, CENTER);
              textSize(40);
              fill(240, 240, 240);
              text("PAUSED", width/2, height*0.47);
              textSize(20);
              text("Press P to resume", width/2, height*0.55);
          popStyle();
          return;
      }
          
      pushMatrix();
          this.shakeScreen();
          
          for(var i = 0; i < this.clouds.length; i++) {
              this.clouds[i].run();
              
              if(this.clouds[i].x > width) {
                  this.resetCloud(this.clouds[i]);
              }
          }
          
          this.scene();
          
          for(var i = 0; i < this.drops; i++) {
              this.rain[i].run();
              
              if(this.rain[i].y > height) {
                  this.resetRain(this.rain[i]);
              }
          }
      
          this.boss.run();
          this.player.run();
          this.runBricks();
          this.runEnemies();
          this.runBombs();
          this.runMedKits();
          this.runBrickPieces();
          this.runBombPieces();
          
          if(frameCount % 2 === 0) {
              this.score++;
          }
          
          this.frequencyTimer++;
          if(this.frequencyTimer % 600 === 0) {
              this.frequency = constrain(this.frequency - 10, this.frequencyMin, this.frequencyMax);
              this.boss.vx = constrain(this.boss.vx + 0.1, 0, 5);
              this.drops = constrain(this.drops + 10, 0, this.rain.length);
          }
          if(this.frequencyTimer % 240 === 0) {
              this.storm = constrain(this.storm + 2, 0, 100);
          }
          
          if(this.frequencyTimer > 2400 && this.frequencyTimer % 600 === 0) {
              fill(0, 0, 0, 50);
              rect(0, 0, width, height);
          }
          
          if(frameCount % this.frequency === 0) {
              if(random() < 0.33) {
                  this.addEnemy();
              }
              else if(random() < 0.5) {
                  this.addBrick(); 
              }
              else {
                  this.addBomb();
              }
              if(random() < 0.3) {
                  this.addMedKit();
              }
          }
      popMatrix();
      
      this.stats();
      
      if(this.health <= 0) {
          this.pausedScreen = get();
          this.page = "retry";
          if(this.score > this.highscore) {
              this.highscore = this.score;
          }
          return;
      }
  };
  Game.prototype.homeScreen = function () {
      noStroke();
      
      this.scene();
  
      pushMatrix();
          translate(80, 320);
          rotate(radians(-90 + sin(radians(frameCount * 4)) * 5));
          pushStyle();
              textFont(this.titleFont);
              textAlign(CENTER, CENTER);
              textSize(60);
              text("NEWTON", 0, 0);
          popStyle();
      popMatrix();
  
      this.player.run();
      this.boss.run();
  
      this.storyButton.draw();
      this.howButton.draw();
      this.leaderboardButton.draw();
      this.playButton.draw();
  };
  Game.prototype.storyScreen = function () {
      fill(0);
      textSize(40);
      textAlign(CENTER, TOP);
      text("Story", width / 2, 50);
      textSize(15);
      text("Once upon a time there was this urban legend\nabout a crazy alien dude called Gravitas\nthat stood atop a building and threw\ndown bombs, bricks, and enemies.\n\nWait, what? :/\n\nYou haven't heard of this one before?\n\nWow, where have you been :p\n\nYour task is to dodge the obstacles\nas long as you can.\n\nGood luck Newton\nYou're gonna need it :D", width / 2, 120);
      
      this.boss.x = 40;
      this.boss.y = 160;
      this.boss.draw();
      
      this.player.x = 430;
      this.player.y = 350;
      this.player.draw();
  
      this.backButton.draw();
  };
  Game.prototype.howScreen = function () {
      fill(0);
      textSize(40);
      textAlign(CENTER, TOP);
      text("How", width / 2, 50);
      textSize(15);
      text("UP or W key to jump\nLEFT or A key to move left\nRIGHT or D key to move right\n\nYou need to avoid hitting the bombs, bricks and\nenemies that Gravitis throws at you.\n\nThe longer you last, the more points you get.\n\nIt starts off fairly easy, but you'll soon\nfind it doesn't quite stay that way.\n\nPress P during the game to pause/resume.\n\nLet me know what your highscore is in the comments.\n\nGood luck young Newton,\nfor a storm is coming!", width / 2, 120);
  
      this.backButton.draw();
  };
  Game.prototype.replayScreen = function () {
      pushStyle();
          noStroke();
          image(this.pausedScreen, 0, 0, width, height);
          rectMode(CENTER);
          fill(30, 35, 60, 150);
          rect(width/2, height/2, 400, 350, 10);
          textAlign(CENTER, CENTER);
          textSize(40);
          fill(240, 240, 240);
          text("GAME OVER", width/2, height*0.3);
          textSize(24);
          text("Score: " + this.score + "\nHighscore: " + this.highscore, width / 2, 250);
          textSize(20);
          text("Let me know your highscore\nin the comments", width / 2, 330);
      popStyle();
  
      this.replayButton.draw();
      this.backButton.draw();
  };
  Game.prototype.leaderboardScreen = function () {
      fill(0);
      textSize(40);
      textAlign(CENTER, TOP);
      text("Leaderboard", width / 2, 50);
      textSize(15);
      text("Below are the top scores so far. Can you take them off the list?", width / 2, 120);
      
      for(var i = 0; i < this.leaderboardArr.length; i++) {
          text(this.leaderboardArr[i].user + ": " + this.leaderboardArr[i].score, 300, 160 + (i * 30));
      }
  
      this.backButton.draw();
  };
  Game.prototype.checkPaused = function() {
      if (keyPressed && keyCode === 80) { //P - Pause
          if(this.page === "play" || this.page === "replay") {
              this.paused = !this.paused;
              this.pausedScreen = get();
          }
          keyCode = 0;
      }
  };
  
  game.init();
  
  draw = function() {
      game.checkPaused();
      background(
          map(game.storm, 0, 100, 230, 40), 
          map(game.storm, 0, 100, 222, 40), 
          map(game.storm, 0, 100, 237, 40));
      
      switch (game.page) {
          case "play":
              game.run();
              break;
          case "retry":
              game.replayScreen();
              break;
          case "home":
              game.homeScreen();
              break;
          case "story":
              game.storyScreen();
              break;
          case "how":
              game.howScreen();
              break;
          case "leaderboard":
              game.leaderboardScreen();
              break;
      }
      
      clicked = false;
  };
      
    }
  }
  
  var canvas = document.getElementById("canvas"); 
  var processingInstance = new Processing(canvas, sketchProc);
  