

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const zoomLevel = 10;

canvas.width = 1080 * zoomLevel;
canvas.height = 768 * zoomLevel * 2;

let playerStartX = canvas.width / (2 * zoomLevel);
let playerStartY = canvas.height / (4 * zoomLevel);

ctx.fillRect(0, 0, canvas.width, canvas.height);

const offset={
    x:-400,
    y:-1200,
}

const collisionMap = [];
const battleZoneMap = [];
const boundaries = [];




for(let i=0;i<collisionData.length;i+=250){
    collisionMap.push(collisionData.slice(i,i+250));

}

for(let i=0;i<battleZonesData.length;i+=250){
    battleZoneMap.push(battleZonesData.slice(i,i+250));

}


collisionMap.forEach((row,i) => {
    
    row.forEach((cell,j) => {
        if (cell == 31441)
            boundaries.push(new Boundary({
                position: {
                    x: j*Boundary.width + offset.x,
                    y: i*Boundary.height + offset.y
                },
                width: Boundary.width,
                height: Boundary.height
            }))
        
    })
}
);

const battleZones = [];

battleZoneMap.forEach((row,i) => {
    
    row.forEach((cell,j) => {
        if (cell == 31434)
            battleZones.push(new TestBattleMap({
                position: {
                    x: j*TestBattleMap.width + offset.x,
                    y: i*TestBattleMap.height + offset.y
                },
                width: TestBattleMap.width,
                height: TestBattleMap.height
            }))
        
    })
}
);











const image = new Image();
image.src = "./images/city.png";


const foregroundImage = new Image();
foregroundImage.src = "./images/cityfg.png";


const playerImage = new Image();
playerImage.src = "./images/playerDown.png";
let lastKey = "";


//playerStartX, playerStartY,

const player = new Sprite({
    position: {x: canvas.width / (2 * zoomLevel),
         y: canvas.height / (4 * zoomLevel)},
         image:playerImage,
         frames: {max:4},
});



const background = new Sprite({
    position: {x: offset.x,
         y: offset.y},
         image:image,
});

const foreground = new Sprite({
    position: {x: offset.x,
         y: offset.y},
         image:foregroundImage,
});

const keys = {
    w:{
        pressed: false,
    },
    a:{

        pressed: false,
    },
    s:{

        pressed: false,
    },
    d:{
        pressed: false,
    },

    }

const checkCollision = ({obj1, obj2}) => {
    return(    obj1.position.x +obj1.width >= obj2.position.x && 
        obj1.position.x <= obj2.position.x + obj2.width && 
        obj1.position.y + obj1.height >= obj2.position.y &&
        obj1.position.y <= obj2.position.y + obj2.height);
}

const movables = [background,...boundaries,foreground,...battleZones];

const animate = () => {
    window.requestAnimationFrame(animate);
    background.draw();
boundaries.forEach(boundary => {
    boundary.draw();
});

battleZones.forEach(battleZone => {
    battleZone.draw();
});
    player.draw();
    foreground.draw();


    let isColliding = false;

    player.moving = false;
    if(keys.w.pressed && lastKey === "w"){
        player.moving = true;
        for(let i=0;i<boundaries.length;i++){
            const boundary = boundaries[i];
            if(checkCollision({obj1:player, obj2:{
               ...boundary,
               position:{
                   x: boundary.position.x,
                   y: boundary.position.y + 10
               }
            }})){
                isColliding = true;
                break;
            }
        }
        playerImage.src = "./images/playerUp.png";
        if(!isColliding){
            movables.forEach(movable => {
                movable.position.y += 10;
            });
            
        }

}
    else if(keys.a.pressed && lastKey === "a"){
        player.moving = true;
        for(let i=0;i<boundaries.length;i++){
            const boundary = boundaries[i];
            if(checkCollision({obj1:player, obj2:{
               ...boundary,
               position:{
                   x: boundary.position.x+10,
                   y: boundary.position.y
               }
            }})){
                isColliding = true;
                break;
            }
        }
        if(!isColliding){
            movables.forEach(movable => {
                movable.position.x += 10;
            });
        }
        playerImage.src = "./images/playerLeft.png";
    }
    else if(keys.s.pressed && lastKey === "s"){
        player.moving = true;
        for(let i=0;i<boundaries.length;i++){
            const boundary = boundaries[i];
            if(checkCollision({obj1:player, obj2:{
               ...boundary,
               position:{
                   x: boundary.position.x,
                   y: boundary.position.y - 10
               }
            }})){
                isColliding = true;
                break;
            }
        }
        if(!isColliding){
            movables.forEach(movable => {
                movable.position.y -= 10;
            });
        }

        playerImage.src = "./images/playerDown.png";
    }
    else if(keys.d.pressed && lastKey==="d"){
        player.moving = true;
        for(let i=0;i<boundaries.length;i++){
            const boundary = boundaries[i];
            if(checkCollision({obj1:player, obj2:{
               ...boundary,
               position:{
                   x: boundary.position.x-10,
                   y: boundary.position.y
               }
            }})){
                isColliding = true;
                break;
            }
        }
        if(!isColliding){
            movables.forEach(movable => {  
                movable.position.x -= 10;
            });
            }

        playerImage.src = "./images/playerRight.png";
    }
    // else{
    //     playerImage.src = "./images/playerDown.png";
    // }

}

animate();





 window.addEventListener("keydown", (e) => {  
     switch (e.key) {
            case "w":
                keys.w.pressed = true;
                lastKey = "w";
                break;
            case "a":
                keys.a.pressed = true;
                lastKey = "a";
                break;
            case "s":
                keys.s.pressed = true;
                lastKey = "s";
                break;
            case "d":
                keys.d.pressed = true;
                lastKey = "d";
                break;
        }   
 });

    window.addEventListener("keyup", (e) => {
        switch (e.key) {
            case "w":
                keys.w.pressed = false;
                break;
            case "a":
                keys.a.pressed = false;
                break;
            case "s":
                keys.s.pressed = false;
                break;
            case "d":
                keys.d.pressed = false;
                break;
        }
    });


  