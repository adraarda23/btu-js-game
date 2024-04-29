const playerHealth = document.getElementById('player-health');
const playerAttack = document.getElementById('player-attack');
const playerDefense = document.getElementById('player-defense');

const enemyHealth = document.getElementById('enemy-health');
const enemyAttack = document.getElementById('enemy-attack');
const enemyDefense = document.getElementById('enemy-defense');

const attackButton = document.getElementById('attack-button');
const defendButton = document.getElementById('defend-button');
const healButton = document.getElementById('heal-button');
const escapeButton = document.getElementById('escape-button');

const randomEnemyImage = document.getElementById('enemy-pokemon');
const attackSound = new Audio("./sound/attack.mp3");
const healSound = new Audio("./sound/heal.mp3");
const defendSound = new Audio("./sound/defend.mp3");
const battleSound = new Audio("./sound/battle-sound.mp3");

attackSound.volume = musicVolume.volume/2;
healSound.volume = musicVolume.volume/2;
defendSound.volume = musicVolume.volume/2;
battleSound.volume = musicVolume.volume/3;





attackButton.addEventListener('click', () => {
    attackSound.play();
    enemyHealth.innerText -= Math.max(0, Math.ceil(Math.random() * (playerAttack.innerText - enemyDefense.innerText)));
    if(enemyHealth.innerText <= 0){
        endBattle();
    }
    else{
        isPlayerTurn = false;
        enemyMove();
    }

});

defendButton.addEventListener('click', () => {
    defendSound.play();
    playerDefense.innerText = Math.min(100, parseInt(playerDefense.innerText) + 3*Math.ceil(Math.random()));
    isPlayerTurn = false;
    enemyMove();
});

healButton.addEventListener('click', () => {
    healSound.play();
    playerHealth.innerText = Math.min(100,parseInt(playerHealth.innerText)+ 30*Math.ceil(Math.random()));
    isPlayerTurn = false;
    enemyMove();
});

escapeButton.addEventListener('click', () => {
    getRandomNumber = Math.ceil(Math.random() * 100);
    console.log(getRandomNumber,battle.initiated    )
    if(getRandomNumber > 70){
        endBattle();
}else{
    enemyMove();
}
});


document.addEventListener('keydown', (event) => {
    if(battle.initiated && isPlayerTurn){
        switch (event.key) {
            case 'a':
                attackButton.click();
                break;
            case 'd':
                defendButton.click();
                break;
            case 'h':
                healButton.click();
                break;
            case 'e':
                escapeButton.click();

                break;
            default:

                break;
        }
    }

});

const startCombat = () => {
    battle.initiated = true;
    isPlayerTurn = true;
    battleSound.play();
    randomEnemyImage.src=combatData.randomEnemyImages[Math.floor(Math.random() * combatData.randomEnemyImages.length)];
    playerHealth.innerText = combatData.playerStats.hp;
    playerAttack.innerText = combatData.playerStats.atk;
    playerDefense.innerText = combatData.playerStats.def;
    const randomIndexNumber = Math.floor(Math.random() * combatData.randomEnemyStats.length);
    const randomEnemy = combatData.randomEnemyStats[randomIndexNumber];
    enemyHealth.innerText = randomEnemy.hp * Math.ceil(Math.random() * 5);
    enemyAttack.innerText = randomEnemy.atk * Math.ceil(Math.random() * 3);
    enemyDefense.innerText = randomEnemy.def * Math.ceil(Math.random() * 2);

}

const enemyMove = () => {
    const playerDamage = Math.max(0, Math.ceil(Math.random() * enemyAttack.innerText - playerDefense.innerText));
    playerHealth.innerText -= playerDamage;
    combatData.playerStats.hp = playerHealth.innerText;
    if(combatData.playerStats.hp <= 0){
        window.location.href="index.html";
    }
    isPlayerTurn = true;
}

const endBattle = () => {
    battleSound.pause();
    battle.initiated = false;
    battleScreen.style.display = 'none';
    transitionEffect.style.display = 'block';
    setTimeout(() => {
        transitionEffect.style.display = 'none';
        animate();
    }, 1000);
}

function adjustVolume(volume) {
    musicVolume.volume = volume;
}
