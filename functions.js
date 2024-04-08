const checkCollision = ({ obj1, obj2 }) => {
    return (
      obj1.position.x + obj1.width >= obj2.position.x &&
      obj1.position.x <= obj2.position.x + obj2.width &&
      obj1.position.y + obj1.height >= obj2.position.y &&
      obj1.position.y <= obj2.position.y + obj2.height
    );
  };

  function handleKeyEvent(key, pressed) {
    switch (key) {
      case "w":
        keys.w.pressed = pressed;
        lastKey = "w";
        break;
      case "a":
        keys.a.pressed = pressed;
        lastKey = "a";
        break;
      case "s":
        keys.s.pressed = pressed;
        lastKey = "s";
        break;
      case "d":
        keys.d.pressed = pressed;
        lastKey = "d";
        break;
    }
  }

  const createZones = (data, cellNumber) => {
    const zones = [];
    const zoneList = [];
    for (let i = 0; i < data.length; i += 250) {
      zones.push(data.slice(i, i + 250));
    }
    zones.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell == cellNumber)
          zoneList.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
              },
              width: Boundary.width,
              height: Boundary.height,
            })
          );
      });
    });
    return zoneList;
  };

  function clearCanvas() {

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height); 
}
