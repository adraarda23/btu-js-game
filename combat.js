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





attackButton.addEventListener('click', () => {
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
    playerDefense.innerText = Math.min(100, parseInt(playerDefense.innerText) + 3*Math.ceil(Math.random()));

    isPlayerTurn = false;
    enemyMove();
});

healButton.addEventListener('click', () => {
    console.log(Math.min(100,parseInt(playerHealth.innerText)+ 30*Math.ceil(Math.random())));
    playerHealth.innerText = Math.min(100,parseInt(playerHealth.innerText)+ 30*Math.ceil(Math.random()));
    console.log('Heal clicked');
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
        window.location.href="dead.html";
    }
    isPlayerTurn = true;
}

const endBattle = () => {
    battle.initiated = false;
    battleScreen.style.display = 'none';
    transitionEffect.style.display = 'block';
    setTimeout(() => {
        transitionEffect.style.display = 'none';
        animate();
    }, 1000);
}
