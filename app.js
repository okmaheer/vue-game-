function getRandomValue(min,max){
    return Math.floor(Math.random() * (max -min)) + min;
}
 
const app = Vue.createApp({
    data() {

        return{
            playerHealth : 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logs : []
           
        };
    },
    computed:{
      monsterBarStyle(){
          if(this.monsterHealth < 0){
              return {width: '0%'};
          }
          return{ width: this.monsterHealth + '%'};
      },
      playerBarStyle(){
        if(this.playerHealth < 0){
            return {width: '0%'};
        }
        return{ width: this.playerHealth + '%'};
    },
    useSpecialAttack(){
     return this.currentRound % 3!==0;
    }
    },
    watch:{
        playerHealth(value){
         if(value<= 0 && this.monsterHealth<= 0){
               ///Draw
               this.winner = 'Draw';
         } else if(value<=0){
            this.winner = 'Monster';
         }
        },
        monsterHealth(value){
            if(value<= 0 && this.monsterHealth<= 0){
                this.winner = 'Draw';
            }
            else if(value<= 0){
                this.winner = 'Player';
            }
        }
    },
    methods:{
        startGame(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logs = [];
        },
        attackMonster(){
            this.currentRound++;
         let attactValue  =  getRandomValue(5,12);
         this.monsterHealth -= attactValue;
         this.addBattleLogs('player','attack',attactValue);
         this.attackPlayer();
        },
        attackPlayer(){
            let attactValue  =  getRandomValue(8,15);
            this.playerHealth -= attactValue;
            this.addBattleLogs('monster','attack',attactValue);
        },
        specialattackMonster(){
            this.currentRound++;
            let attactValue  =  getRandomValue(10,25);
            this.monsterHealth -= attactValue;
            this.addBattleLogs('monster','specialattack',attactValue);
            this.attackPlayer();
        },
        healPlayer(){
            this.currentRound++;
            let healValue  =  getRandomValue(8,20);
            if(healValue + this.playerHealth > 100){  
            this.playerHealth = 100;
            }
            else{
                this.playerHealth += healValue;

            }
            this.addBattleLogs('monster','heals',healValue);

            this.attackPlayer();
        },
        surrender(){
            this.winner = 'Monster';
        },
        addBattleLogs(who, what, value){
               this.logs.unshift({
                   actionBy : who,
                   actionWho : what,
                   actionValue: value,
               }); 
        },
    }
});

 

app.mount('#game');