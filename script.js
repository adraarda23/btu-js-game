const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const zoomLevel = 10;

canvas.width = 1080 * zoomLevel;
canvas.height = 768 * zoomLevel * 2;
ctx.fillRect(0, 0, canvas.width, canvas.height);

let playerStartX = canvas.width / (2 * zoomLevel);
let playerStartY = canvas.height / (4 * zoomLevel);


const boundaries = createZones(collisionData, 31441);
const battleZones = createZones(battleZonesData, 31434);

const player = new Sprite({
  position: {
    x: canvas.width / (2 * zoomLevel),
    y: canvas.height / (4 * zoomLevel),
  },
  image: playerImage,
  frames: { max: 4 },
});

const background = new Sprite({
  position: { x: offset.x, y: offset.y },
  image: image,
});

const foreground = new Sprite({
  position: { x: offset.x, y: offset.y },
  image: foregroundImage,
});

const battleBackground = new Sprite({
  position: { x: 0, y:0 },
  image: battleBackgroundImage,
});





const movables = [background, ...boundaries, foreground, ...battleZones];

const animate = () => {
  const animationId =window.requestAnimationFrame(animate);

  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();
  });
  battleZones.forEach((battleZone) => {
    battleZone.draw();
  });
  player.draw();
  foreground.draw();

  player.moving = false;
  let isColliding = false;

  if(battle.initiated)return;

  if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i];
      const overlappingArea =
        Math.max(
          0,
          Math.min(
            player.position.x + player.width,
            battleZone.position.x + battleZone.width
          ) - Math.max(player.position.x, battleZone.position.x)
        ) *
        Math.max(
          0,
          Math.min(
            player.position.y + player.height,
            battleZone.position.y + battleZone.height
          ) - Math.max(player.position.y, battleZone.position.y)
        );
      if (
        checkCollision({ obj1: player, obj2: battleZone }) &&
        overlappingArea > (player.width * player.height) / 2 &&
        Math.random() < 0.1
      ) {
        window.cancelAnimationFrame(animationId);
        battle.initiated = true;
        transitionEffect.style.display = "block";
        setTimeout(function() {
          transitionEffect.style.display = "none";
          animateBattle();
      }, 1000); 

        
        break;
      }
    }
  }


  const movePlayer =(xOffset, yOffset, imageSrc)=> {
    player.moving = true;
    playerImage.src = imageSrc;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        checkCollision({
          obj1: player,
          obj2: {
            ...boundary,
            position: {
              x: boundary.position.x + xOffset,
              y: boundary.position.y + yOffset,
            },
          },
        })
      ) {
        isColliding = true;
        return;
      }
    }
    if (!isColliding) {
      movables.forEach((movable) => {
        movable.position.x += xOffset;
        movable.position.y += yOffset;
      });
    }
  }
  

  if (keys.w.pressed && lastKey === "w") {
    movePlayer(0, 10, "./images/playerUp.png");
  } else if (keys.a.pressed && lastKey === "a") {
    movePlayer(10, 0, "./images/playerLeft.png");
  } else if (keys.s.pressed && lastKey === "s") {
    movePlayer(0, -10, "./images/playerDown.png");
  } else if (keys.d.pressed && lastKey === "d") {
    movePlayer(-10, 0, "./images/playerRight.png");
  }
};

animate();

const animateBattle = () => {
  window.requestAnimationFrame(animateBattle);
  battleBackground.draw();
  
  
}




window.addEventListener("keydown", (e) => {
  handleKeyEvent(e.key, true);
});

window.addEventListener("keyup", (e) => {
  handleKeyEvent(e.key, false);
});
