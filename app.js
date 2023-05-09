const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMassages: []
    };
  },

  methods: {
    newGame() {
      this.playerHealth = 100
      this.monsterHealth = 100
      this.currentRound = 0
      this.winner = null
      this.logMassages = []
    },
    attackMonster() {
      const attackValue = getRandom(5, 15);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.currentRound += 1;
      this.showLog('player', 'attack', attackValue)
    },
    attackPlayer() {
      const attackValue = getRandom(10, 20);
      this.playerHealth -= attackValue;
      this.showLog('monster', 'attack', attackValue)
    },
    specialAttackMonster() {
      if (this.currentRound >= 3) {
        const attackValue = getRandom(20, 30);
        this.monsterHealth -= attackValue;
        this.currentRound = 0;
        this.attackPlayer();
        this.showLog('player', 'attack', attackValue)
      }
    },
    healPlayer() {
      const healValue = getRandom(5, 25);
      if (healValue + this.playerHealth >= 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.currentRound += 1;
      this.attackPlayer();
      this.showLog('player', 'heal', healValue)
    },
    surrender() {
      this.winner = 'monster'
    },
    showLog(who, what, value) {
      this.logMassages.unshift({
        actionBy: who, actionType: what, actionValue: value
      })
    }
  },

  computed: {
    heathbarMonster() {
      if (this.monsterHealth <= 0) {
        return { width: '0%' }
      }
      return { width: this.monsterHealth + "%" };
    },
    healthbarPlayer() {
      if (this.playerHealth <= 0) {
        return { width: "0%" }
      }
      return { width: this.playerHealth + "%" };
    },
  },

  watch: {
    playerHealth(val) {
      if (val <= 0 && this.monsterHealth <= 0) {
        this.winner = 'draw';
      } else if (val <= 0) {
        this.winner = 'monster';
      }
    },
    monsterHealth(val) {
      if (val <= 0 && this.playerHealth <= 0) {
        this.winner = 'draw';
      } else if (val <= 0) {
        this.winner = 'player';
      }
    },
  },
});

app.mount("#game");
