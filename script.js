

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
const boundaries = [];
class Boundary {
    static width = 50;
    static height = 50;
    constructor({position}){
        this.position = position;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = "white";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}



for(let i=0;i<collisionData.length;i+=140){
    collisionMap.push(collisionData.slice(i,i+140));

}


collisionMap.forEach((row,i) => {
    
    row.forEach((cell,j) => {
        if (cell !== 0)
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

const testBoundary = new Boundary({
    position: {
        x: offset.x,
        y: offset.y
    }
});








const image = new Image();
image.src = "./images/city.png";
const playerImage = new Image();
playerImage.src = "./images/playerDown.png";
let lastKey = "";

class Sprite{
    constructor({position,image}){
        this.position = position;
        this.image = image;
        
    }
    draw(){
        ctx.drawImage(this.image, this.position.x, this.position.y,canvas.width, canvas.height);

    }
}



const background = new Sprite({
    position: {x: offset.x,
         y: offset.y},
         image:image,
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



const movables = [background,testBoundary];

const animate = () => {
    window.requestAnimationFrame(animate);
    background.draw();
boundaries.forEach(boundary => boundary.draw());

    ctx.drawImage(playerImage, 0, 0,
                playerImage.width/4,
                 playerImage.height,
                 playerStartX, playerStartY,
                 playerImage.width/4,
                 playerImage.height);


    if(keys.w.pressed && lastKey === "w"){
        movables.forEach(movable => {
            movable.position.y += 10;
        });
        playerImage.src = "./images/playerUp.png";
}
    else if(keys.a.pressed && lastKey === "a"){
        movables.forEach(movable => {
            movable.position.x += 10;
        }
        );
        playerImage.src = "./images/playerLeft.png";
    }
    else if(keys.s.pressed && lastKey === "s"){
        movables.forEach(movable => {
            movable.position.y -= 10;
        });
        playerImage.src = "./images/playerDown.png";
    }
    else if(keys.d.pressed && lastKey==="d"){
        movables.forEach(movable => {  
            movable.position.x -= 10;
        });
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


  