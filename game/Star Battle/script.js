$(function(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    canvas.x = 0;
    canvas.y = 0;
    canvas.width = 960;
    canvas.height = 600;

    let instructionTextTitlePlace = 200;
    let instructionTextPlace = 70;
    let backgroundX = 0;
    let backgroundY = 0;
    let bulletCooldown = 100;
    let asteroidCooldown = 300;
    let fuelCooldown = 300;
    let allyCooldown = 300;
    let enemyCooldown = 300;
    let fuelAmountCooldown = 500;
    let score = 0;
    let fuelAmount = 100;
    let life = 3;

    let arrayIndex = 0;

    let flip = false;
    let click = false;

    let condition = "intro";
    let type = "none";

    const backgroundImg = new Image();
    const logoImg = new Image();
    const planeImg = new Image();
    const asteroidImg = new Image();
    const fuelImg = new Image();
    const allyImg = new Image();
    const enemyImg = new Image();

    let keys = {};
    let spaceship = {
        x:440,
        y:480,
        width:100,
        height:100
    };
    let bullets = [];
    let asteroids = []; 
    let fuels = [];
    let allies = [];
    let enemies = [];

    let Enemy = function(x,y){
        this.x = x;
        this.y = y;
        this.w = 100;
        this.h = 60;
        this.direction = Math.floor(Math.random() * 2);
        if(this.direction == 1){
            this.direction = true;
        }
        else{
            this.direction = false;
        }
    }

    let Ally = function(x,y){
        this.x = x;
        this.y = y;
        this.w = 100;
        this.h = 60;
        this.direction = Math.floor(Math.random() * 2);
        if(this.direction == 1){
            this.direction = true;
        }
        else{
            this.direction = false;
        }
    }

    let Bullet = function(x,y){
        this.x = x;
        this.y = y;
    }

    let Asteroid = function(x,y){
        this.x = x;
        this.y = y;
        this.w = Math.floor(Math.random() * 60 + 20);
        this.h = this.w;
        this.direction = Math.floor(Math.random() * 2);
        if(this.direction == 1){
            this.direction = true;
        }
        else{
            this.direction = false;
        }
    }

    let Fuel = function(x,y){
        this.x = x;
        this.y = y;
        this.w = 50;
        this.h = 50;
        this.direction = Math.floor(Math.random() * 2);
        if(this.direction == 1){
            this.direction = true;
        }
        else{
            this.direction = false;
        }
    }

    function startText(type){
        if(type=="none"){
            ctx.font = "italic small-caps 900 52px arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("START GAME!", canvas.width/2, 525);
        }
        else if(type=="hover"){
            ctx.font = "italic small-caps 900 52px arial";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.fillText("START GAME!", canvas.width/2, 525);
        }
        else if(type=="active"){
            ctx.font = "italic small-caps 900 52px arial";
            ctx.fillStyle = "#A01C00";
            ctx.textAlign = "center";
            ctx.fillText("START GAME!", canvas.width/2, 525);
        }
    }

    function isInside(mouseX, mouseY, rectX, rectY, rectW, rectH){
        if(mouseX>rectX && mouseX < rectX + rectW && mouseY < rectY+ rectH && mouseY > rectY){
            return true;
        }
        else{
            
        }
    }
    
    function imagePlace(gambar, sx, sy, background, source, w, h){
        if(background==true){
            backgroundImg.addEventListener('load', backgroundImage());
            backgroundImg.src="image/background.jpg";
        }
        else{
            let image = {
                img: gambar,
                imgX: sx,
                imgY: sy,
                imgSource: source,
                imgW: w,
                imgH: h
            };
            ctx.drawImage(image.img, image.imgX, image.imgY, image.imgW, image.imgH);
            gambar.src=image.imgSource;
        }
    }

    function backgroundImage(){
        let logo = {
            img:backgroundImg,
        };
        if(backgroundX==0){
            ctx.drawImage(logo.img, backgroundX-=0.2, backgroundY-=0.2);
        }
        else{
            if(backgroundX + 250 > 0 && flip==false){
                ctx.drawImage(logo.img, backgroundX-=0.2, backgroundY-=0.2);
            }
            else if(backgroundX - 250 < -250 && flip==true){
                ctx.drawImage(logo.img, backgroundX+=0.2, backgroundY+=0.2);
            }
            if(backgroundX <= -250){
                flip = true;
            }
            if(backgroundX >= -1){
                flip = false;
            }
        }
    }

    function instructionTextTitle(){
        ctx.font = "normal small-caps 900 48px arial";
        ctx.fillStyle="red";
        ctx.textAlign="center";
        ctx.fillText("INSTRUCTION", canvas.width/2, instructionTextTitlePlace);
    }

    function instructionText(){
        ctx.font = "24px Arial";
        ctx.fillStyle="white";
        ctx.textAlign="left";
        ctx.fillText("1. Use W A S D To Move", instructionTextPlace, 250);
        ctx.fillText("2. Use Space Button To Shoot", instructionTextPlace, 284);
        ctx.fillText("3. Destroy Enemy Spaceships To Get Points", instructionTextPlace, 284+34);
        ctx.fillText("4. Destroy Asteroids To Get Points", instructionTextPlace, 284+34+34);
        ctx.fillText("5. Lose Points If You Destroy Friendly Spaceships", instructionTextPlace, 284+(34*3));
        ctx.fillText("6. You Lose If You Ran Out Of Fuel", instructionTextPlace, 284+(34*4));
        ctx.fillText("7. Your Life Will Decrease If You Crash With Another Asteroids/Spaceships", instructionTextPlace, 284+(34*5));
    }

    function drawFuel(){
        if(fuelCooldown==10){
            fuelCooldown=7000;
        }
        if(fuelCooldown==310){
            let fuel = new Fuel(Math.floor(Math.random() * canvas.width), 0);
            if (fuel.x<10){
                fuel.x+=20;
            }
            else if(fuel.x>canvas.width-10){
                fuel.x-=20;
            }
            fuels.push(fuel);
            fuelCooldown-=10;
        }
        else{
            fuelCooldown-=10;
        }
    }

    function drawAlly(){
        if(allyCooldown==0){
            allyCooldown=7000;
        }
        if(allyCooldown==2000){
            let ally = new Ally(Math.floor(Math.random() * canvas.width), 0);
            if (ally.x<10){
                ally.x+=20;
            }
            else if(ally.x>canvas.width-10){
                ally.x-=20;
            }
            allies.push(ally);
            allyCooldown-=10;
        }
        else{
            allyCooldown-=10;
        }
    }

    function drawEnemy(){
        if(enemyCooldown==0){
            enemyCooldown=4000;
        }
        if(enemyCooldown==2000){
            let enemy = new Enemy(Math.floor(Math.random() * canvas.width), 0);
            if (enemy.x<10){
                enemy.x+=20;
            }
            else if(enemy.x>canvas.width-10){
                enemy.x-=20;
            }
            enemies.push(enemy);
            enemyCooldown-=10;
        }
        else{
            enemyCooldown-=10;
        }
    }

    function drawAsteroid(){
        if(asteroidCooldown<=0){
            asteroidCooldown=2000;
        }
        if(asteroidCooldown==200){
            let asteroid = new Asteroid(Math.floor(Math.random() * canvas.width), 0);
            if (asteroid.x<10){
                asteroid.x+=20;
            }
            else if(asteroid.x>canvas.width-10){
                asteroid.x-=20;
            }
            asteroids.push(asteroid);
            asteroidCooldown-=10;
        }
        else{
            asteroidCooldown-=20;
        }
    }

    function drawScore(){
        ctx.font = "bolder 48px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.fillText("Score: " + score, 20, 60);
    }

    function drawLife(){
        ctx.font = "bolder 48px Arial";
        ctx.fillStyle = "white";
        ctx.textAlgin = "right";
        ctx.fillText("Life: " + life, canvas.width/2 + 40, 60);
    }

    function drawFuels(){
        ctx.font = "bolder 48px Arial";
        ctx.fillStyle = "white";
        ctx.textAlgin = "right";
        ctx.fillText("Fuel: " + fuelAmount + "%", canvas.width/2 + 215, 60);
    }


    function drawIntro(){
        rect = {
            x: canvas.width/2 - 200,
            y: 475,
            width: 400,
            height: 50
        };
        canvas.addEventListener('mousedown', function(e){
            var mousePos = getMousePos(canvas, e);
            if(isInside(mousePos.x, mousePos.y, rect.x, rect.y, rect.width, rect.height)){
                click = true;
            }
        });
        canvas.addEventListener('click', function(e){
            var mousePos = getMousePos(canvas, e);
            if(isInside(mousePos.x, mousePos.y, rect.x, rect.y, rect.width, rect.height)){
                condition = "game";
            }
        });
        canvas.addEventListener('mousemove', function(e){
            var mousePos = getMousePos(canvas, e);
            if(isInside(mousePos.x, mousePos.y, rect.x, rect.y, rect.width, rect.height) && click==false){
                type="hover";
            }
            else{
                if(click==true){
                    type="active";
                }
                else{
                    type="none";
                }
            }
        });
        imagePlace(backgroundImg, 0, 0,true, 0, 0);
        imagePlace(logoImg, (canvas.width/2)-(253.5/2), 50, false, "image/Logo.png", 253.5, 98);
        instructionTextTitle();
        instructionText();
        startText(type);
        canvas.addEventListener('mouseup', function(){
            click=false;
        });
    }

    function drawGame(){
        imagePlace(backgroundImg, 0, 0,true, 0, 0);
        window.addEventListener("keydown", function(e){
            keys[e.keyCode]=true;
            e.preventDefault();
        });
        window.addEventListener("keyup", function(e){
            delete keys[e.keyCode];
        });
        drawAsteroid();
        drawFuel();
        drawAlly();
        drawEnemy();
        input(spaceship);
        shoot(spaceship);
        asteroids.forEach(function(asteroid){
            imagePlace(asteroidImg, asteroid.x, asteroid.y, false, "image/Asteroid.png", asteroid.w, asteroid.h);
            if(asteroid.y > canvas.height + 5){
                asteroids.shift();
            }
            else{
                asteroid.y+=0.5;
                if(asteroid.direction == true){
                    asteroid.x+=0.5;
                }
                else{
                    asteroid.x-=0.5;
                }
            }
            bullets.forEach(function(bullet){
                let collisionAsteroid = checkBullet(bullet.x, bullet.y, 5, 5, asteroid.x, asteroid.y, asteroid.w, asteroid.h);
                if(collisionAsteroid == true){
                    arrayIndex = asteroids.indexOf(asteroid);
                    asteroids.splice(arrayIndex, 1);
                    arrayIndex = bullets.indexOf(bullet);
                    bullets.splice(arrayIndex, 1);
                    score += 10;
                }
            });
        });
        fuels.forEach(function(fuel){
            imagePlace(fuelImg, fuel.x, fuel.y, false, "image/fuel.png", 50, 50);
            if(fuel.y > canvas.height + 5){
                fuels.shift();
            }
            else{
                fuel.y+=0.5;
                if(fuel.direction == true){
                    fuel.x+=2;
                }
                else{
                    fuel.x-=2;
                }
            } 
            bullets.forEach(function(bullet){
                let collisionFuel = checkBullet(bullet.x, bullet.y, 5, 5, fuel.x, fuel.y, fuel.w, fuel.h);
                if(collisionFuel == true){
                    arrayIndex = asteroids.indexOf(fuel);
                    fuels.splice(arrayIndex, 1);
                    arrayIndex = bullets.indexOf(bullet);
                    bullets.splice(arrayIndex, 1);
                    if(fuelAmount <= 50){
                        fuelAmount += 50;
                    }
                    else{
                        fuelAmount = 100;
                    }
                }
            });
        });
        allies.forEach(function(ally){
            imagePlace(allyImg, ally.x, ally.y, false, "image/Ally.png", 100, 100);
            if(ally.y > canvas.height + 5){
                allies.shift();
            }
            else{
                ally.y+=0.5;
                if(ally.direction == true){
                    ally.x+=0.5;
                }
                else{
                    ally.x-=0.5;
                }
            }
            bullets.forEach(function(bullet){
                let collisionAlly = checkBullet(bullet.x, bullet.y, 5, 5, ally.x, ally.y, ally.w, ally.h);
                if(collisionAlly == true){
                    arrayIndex = allies.indexOf(ally);
                    allies.splice(arrayIndex, 1);
                    arrayIndex = bullets.indexOf(bullet);
                    bullets.splice(arrayIndex, 1);
                    score -= 20;
                }
            });
        });
        enemies.forEach(function(enemy){
            imagePlace(enemyImg, enemy.x, enemy.y, false, "image/Enemy.png", 100, 100);
            if(enemy.y > canvas.height + 5){
                enemies.shift();
            }
            else{
                enemy.y+=0.5;
                if(enemy.direction == true){
                    enemy.x+=0.5;
                }
                else{
                    enemy.x-=0.5;
                }
            }
            bullets.forEach(function(bullet){
                let collisionEnemy = checkBullet(bullet.x, bullet.y, 5, 5, enemy.x, enemy.y, enemy.w, enemy.h);
                if(collisionEnemy == true){
                    arrayIndex = enemies.indexOf(enemy);
                    enemies.splice(arrayIndex, 1);
                    arrayIndex = bullets.indexOf(bullet);
                    bullets.splice(arrayIndex, 1);
                    score += 20;
                }
            });
        });
        bullets.forEach(function(bullet){
            ctx.fillStyle = "red";
            ctx.fillRect(bullet.x, bullet.y, 5,5);
            if(bullet.y<canvas.y-5){
                bullets.shift();
            }
            else{
                bullet.y-=7;
            }
        });
        imagePlace(planeImg, spaceship.x, spaceship.y, false, "image/spaceship.png", spaceship.width, spaceship.height);
        spaceshipCollisionCheck(spaceship);
        drawScore();
        drawLife();
        drawFuels();
        if(fuelAmountCooldown == 0){
            fuelAmount -= 1;
            fuelAmountCooldown = 500;
        }
        else{
            fuelAmountCooldown -= 10;
        }
        if(fuelAmount == 0 || life == 0){
            condition = "Game Over";
        }
    }

    function drawGameOver(){
        imagePlace(backgroundImg, 0, 0,true, 0, 0);
        imagePlace(logoImg, (canvas.width/2)-(253.5/2), 180, false, "image/Logo.png", 253.5, 98);
        ctx.font = "normal small-caps 900 64px arial";
        ctx.fillStyle="red";
        ctx.textAlign="center";
        ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2 + 40);
        ctx.font = "normal small-caps 900 48px arial";
        ctx.fillStyle="white";
        ctx.textAlign="center";
        ctx.fillText("SCORE: " + score, canvas.width/2, canvas.height/2 + 95);
    }

    function spaceshipCollisionCheck(spaceship){
        enemies.forEach(function(enemy){
            let collisionEnemyPlane = checkSpaceship((spaceship.x+spaceship.width/2)-25, spaceship.y, enemy.x, enemy.y, enemy.w, enemy.h-25);
            if(collisionEnemyPlane == true){
                arrayIndex = enemies.indexOf(enemy);
                enemies.splice(arrayIndex, 1);
                score -= 20;
                life -= 1;
            }
        });
        asteroids.forEach(function(asteroid){
            let collisionAsteroidPlane = checkSpaceship((spaceship.x+spaceship.width/2)-25, spaceship.y, asteroid.x, asteroid.y, asteroid.w, asteroid.h-10);
            if(collisionAsteroidPlane == true){
                arrayIndex = asteroids.indexOf(asteroid);
                asteroids.splice(arrayIndex, 1);
                score -= 10;
                life -= 1;
            }
        });
    }

    function checkBullet(bulletX, bulletY, bulletW, bulletH, objectX, objectY, objectW, objectH){
        if(bulletX > objectX && bulletX + bulletW < objectX + objectW && bulletY > objectY && bulletY + bulletH < objectY + objectH){
            return true;
        }
        else{
            return false;
        }
    }

    function checkSpaceship(spaceshipX, spaceshipY, objectX, objectY, objectW, objectH){
        if(spaceshipX > objectX && spaceshipX < objectX + objectW && spaceshipY > objectY && spaceshipY < objectY + objectH){
            return true;
        }
        else{
            return false;
        }
    }

    function shoot(spaceship){
        if(32 in keys){
            if(bulletCooldown==0){
                bulletCooldown=100;
            }
            if(bulletCooldown==100){
                let bullet = new Bullet(spaceship.x + spaceship.width/2 -3, spaceship.y+6);
                bullets.push(bullet);
                bulletCooldown-=10;
                fuelAmount -= 1;
            }
            else{
                bulletCooldown-=10;
            }
        }
        else if(bulletCooldown!=100){
            bulletCooldown-=10;
        }
        if(bulletCooldown==0){
            bulletCooldown=100;
        }
    }

    function input(spaceship){
        if(87 in keys && 68 in keys){
            if(spaceship.y - 5 > canvas.y && spaceship.x + spaceship.width + 5 < canvas.width){
                spaceship.y-=5;
                spaceship.x+=5;
            }
            else if(spaceship.y - 5 > canvas.y && spaceship.x + spaceship.width + 5 >= canvas.width){
                spaceship.y-=5
            }
            else if(spaceship.y - 5 <= canvas.y && spaceship.x + spaceship.width + 5 < canvas.width){
                spaceship.x+=5
            }
            else{

            }
        }
        else if(87 in keys && 65 in keys){
            if(spaceship.y - 5 > canvas.y && spaceship.x - 5 > canvas.x){
                spaceship.y-=5;
                spaceship.x-=5;
            }
            else if(spaceship.y - 5 > canvas.y && spaceship.x - 5 <= canvas.x){
                spaceship.y-=5
            }
            else if(spaceship.y - 5 <= canvas.y && spaceship.x - 5 > canvas.x){
                spaceship.x-=5
            }
            else{

            }
        }
        else if(83 in keys && 68 in keys){
            if(spaceship.y + spaceship.height + 5 < canvas.height && spaceship.x + spaceship.width + 5 < canvas.width){
                spaceship.y+=5;
                spaceship.x+=5;
            }
            else if(spaceship.y + spaceship.height + 5 < canvas.height && spaceship.x + spaceship.width + 5 >= canvas.width){
                spaceship.y+=5
            }
            else if(spaceship.y + spaceship.height + 5 >= canvas.height && spaceship.x + spaceship.width + 5 < canvas.width){
                spaceship.x+=5
            }
            else{

            }
        }
        else if(83 in keys && 65 in keys){
            if(spaceship.y + spaceship.height + 5 < canvas.height && spaceship.x - 5 > canvas.x){
                spaceship.y+=5;
                spaceship.x-=5;
            }
            else if(spaceship.y + spaceship.height + 5 < canvas.height && spaceship.x - 5 <= canvas.x){
                spaceship.y+=5
            }
            else if(spaceship.y + spaceship.height + 5 >= canvas.height && spaceship.x - 5 > canvas.x){
                spaceship.x-=5
            }
        }
        else if(87 in keys){
            if(spaceship.y - 5 > canvas.y){
                spaceship.y -=5;
            }
        }
        else if(65 in keys){
            if(spaceship.x - 5 > canvas.x){
                spaceship.x-=5;
            }
        }
        else if(83 in keys){
            if(spaceship.y + spaceship.height + 5 < canvas.height){
                spaceship.y+=5;
            }
        }
        else if(68 in keys){
            if(spaceship.x + spaceship.width + 5 < canvas.width){
                spaceship.x+=5;
            }
        }
    }

    function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        if(condition=="intro"){
            drawIntro();
        }
        else if(condition=="game"){
            drawGame();
        }
        else{
            drawGameOver();
        }
    }

    function loop(){
        draw();
        window.requestAnimationFrame(loop), 100;
    }

    function getMousePos(canvas,event){
        var rect = canvas.getBoundingClientRect();
        return{
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
    loop();
});    
