<script lang="ts">
  import type { Die } from "./modules/die";
  import type { Card } from "./modules/card";
  import Dice from "./components/dice.svelte";
  import Cards from "./components/cards.svelte";
  import Points from "./components/points.svelte";
  import Bkg from "./components/bkg.svelte";
  import ShuffleBtn from  "./components/shuffleBtn.svelte";
//import Deck from "./components/deck.svelte";

  const diceBagQt: number = 8;
  const diceValuesNames = [
    "death",
    "parrot",
    "monkey",
    "sword",
    "diamond",
    "doublon",
  ];
  const startValue: number = 1;
  const minimumUnlockdDice: number = 2;
  let autoSort: boolean = true;
  let cannotShuffleDice: boolean = false;
  let diceBag: Array<Die> = [];
  let turnCounter:number = 0;
  let isDead:boolean = false;
  let isIleAuxMorts:boolean = false;
  let iamCounter:number = 0;
  let throttleDiceBag: boolean = false;
  let rerollDeatRule:boolean = false;


  // init DiceBag
  for (let i: number = 0; i < diceBagQt; i++) {
    diceBag = [
      ...diceBag,
      {
        id: i,
        value: startValue,
        ordery: -1,//i,
        isLocked: false,
        valueName: diceValuesNames[startValue],
        isShuffleing: false,
      },
    ];
  }

  $: for (let i: number = 0; i < diceBagQt; i++) {
    diceBag[i].valueName = diceValuesNames[diceBag[i].value];
  }

  let activeDice: number = diceBagQt;
  $: activeDice = diceBag.map((obj) => {
      return obj.isLocked ? 0 : 1;
    }).reduce((t, n) => t + n, 0);
  
  
  const shuffleDice = () => {
    console.log("shuffle start",diceBag);  // output dicebag avec les modification faites a l'avance !%!??!!!

    if (!throttleDiceBag) {
      throttleDiceBag = true;
      if(diceBag[0].ordery === -1){sortBag()} 

      diceBag.forEach((dice, id) => {
        let newValue: number = Math.floor(Math.random() * 6);
        let shuffleingTime:number = 1000;
        if (!dice.isLocked) {
          diceBag[id].isShuffleing = true;

          setTimeout(()=>{
              diceBag[id].isShuffleing = false;
              diceBag[id].value = newValue;
              // check if dead die
              if (newValue === 0) {
                diceBag[id].isLocked = true;
                // dice.isLocked = true; n'est pas utilise en .map parce que svelte ne reactive pas sur le .map
              }
          
          }, shuffleingTime);
        }
      });
      if (autoSort) {
        setTimeout(sortBag,1500);
      }
      setTimeout(getHandScore,1000);
      setTimeout(()=>{throttleDiceBag = false;},2000);
      turnCounter++;
    }
  };

  // this should be bind to reactive values
  const validateShuffleDiceAllowed = () => {
    if(isDead){
      cannotShuffleDice = true;
    }else{
      let count: number = 0;
      diceBag.forEach((die) => {
        count += die.isLocked ? 0 : 1;
      });
      cannotShuffleDice = count >= minimumUnlockdDice ? false : true;
    }
    return !cannotShuffleDice;
  };

  // Must be on dicebag, pour checker si on lock des des si on peut encore brasser les des
  $: if (diceBag) {
    validateShuffleDiceAllowed();
  }

  const sortBag = () => {
    let fakeBag:Array<Die> = [];
    fakeBag = diceBag.sort(compareValue);
    fakeBag.forEach((refDie, index)=>{
      diceBag[index].ordery=index;
    });
    diceBag = diceBag.sort(compareId);
  };

  function compareValue(a, b) {
    if (a.value < b.value) {
      return -1;
    }
    if (a.value > b.value) {
      return 1;
    }
    return 0;
  }
  function compareId(a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }

  const resetBag = () => {
    diceBag.forEach((die) => {
      die.value = 1;
      die.isLocked = false;
      die.ordery = -1;
    });
    diceBag = diceBag; // react force reactivity qui se fait pas dans un foreach
  };



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // INIT DECK OF CARD
  // compose into component deck + reactive active card
  interface DeckConfig {
    value: number;
    valueName: string;
    altRules: string;
    amountInDeck: number;
  }

  const deckConfig: Array<DeckConfig> = [
    
    {
      value: 1,
      valueName: "zoo",
      altRules: "Zoo: Les singes et perroquets valent le même dé",
      amountInDeck: 4,
    },
    {
      value: 2,
      valueName: "diamond",
      altRules: "Diamand: Comme si il y avait un diamand déjà en jeu",
      amountInDeck: 4,
    },
    {
      value: 3,
      valueName: "doublon",
      altRules: "Doublon: Comme si il y avait un doublon déjà en jeu",
      amountInDeck: 4,
    },
    {
      value: 4,
      valueName: "ship4",
      altRules:
        "Bateau Pirate 4: Vous devez avoir 4 épés pour faire 1000 points, sinon vous perdez 1000 points",
      amountInDeck: 1,
    },
    {
      value: 5,
      valueName: "ship3",
      altRules:
        "Bateau Pirate 3: Vous devez avoir 3 épés pour faire 500 points, sinon vous perdez 500 points",
      amountInDeck: 2,
    },
    {
      value: 6,
      valueName: "ship2",
      altRules:
        "Bateau Pirate 2: Vous devez avoir 2 épés pour faire 300 points, sinon vous perdez 300 points",
      amountInDeck: 2,
    },
    {
      value: 7,
      valueName: "chest",
      altRules: "Coffre: Vous gardez les points protégés si vous mourrez",
      amountInDeck: 4,
    },
    {
      value: 8,
      valueName: "witch",
      altRules: "Sorcière: Vous pouvez relancer un seul dé tête de mort",
      amountInDeck: 4,
    },
    {
      value: 11,
      valueName: "double",
      altRules: "Pirate: Vous doublez vos points",
      amountInDeck: 4,
    },
    {
      value: 9,
      valueName: "dead",
      altRules: "Tête de mort: Vous avez déjà une tête de mort en jeu",
      amountInDeck: 3,
    },
    {
      value: 10,
      valueName: "dead2",
      altRules: "Deux têtes de mort: Vous avez déjà deux têtes de mort en jeu",
      amountInDeck: 2,
    },
  ];

  let activeCard: Array<Card> = [];
  let discardPile: Array<Card> = [];
  let deck: Array<Card> = [];
  let throttleDraw: boolean = false;

  const initDeck = () => {
    let cardIndex: number = 0;
    deckConfig.forEach((cc) => {
      for (let amnt = 0; amnt < cc.amountInDeck; amnt++) {
        deck = [
          ...deck,
          {
            id: cardIndex,
            value: cc.value,
            valueName: cc.valueName,
            altRules: cc.altRules,
            isFaceDown: true,
          },
        ];
        cardIndex++;
      }
    });
  };



  const nextTurn = () => {
    if (deck.length != 0 && !throttleDraw) {
      throttleDraw = true;
      throttleDiceBag =  true;
      if(activeCard.length != 0){
        activeCard[0].isDiscarded = true;
        activeCard[0].isFaceDown = true;
        
        setTimeout(()=>{
          discardPile.push(activeCard.shift());
          discardPile=discardPile;
          drawCard();
        }, 400);
      }else{
        drawCard();
      }
    }
  };

  const drawCard = () => {
      
      activeCard.push(deck.shift());
      activeCard[0]=activeCard[0];
      
      setTimeout(()=>{
        // todo : log score
        resetPlayerTurn();
        activeCard[0].isFaceDown = false
        deck = deck; //force reactivity
        // Rule Witch
        if(activeCard[0].valueName === "witch"){
          rerollDeatRule = true;
        }
        setTimeout(()=>{ throttleDraw = false; throttleDiceBag = false; }, 600);
      },100) ;
      
  };

  const resetPlayerTurn = () => {
    resetBag();  
    turnCounter = 0;
    score = 0;
    isIleAuxMorts = false;
    isDead = false;
    rerollDeatRule = false;
  }

  const shuffleDeck = () => {
    deck = [];
    activeCard = [];
    discardPile = [];
    initDeck();
    deck = shuffleDeckArray(deck);
  };

  function shuffleDeckArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  shuffleDeck(); // start shuffled
  //initDeck(); // start debug
  drawCard();


  let score:number=0;
  let scoreIleAuxMorts:number=0;
  interface Scoring {
    value:number;
    amount:number;
    lockedAmount:number;
    valueName:string;
  }

  const getHandScore = () => {
    // init
    let allScoreBonus:boolean = true;
    let groupDiceValue:Array<Scoring> = [
      {value: 0, amount: 0, lockedAmount: 0, valueName:"death" },
      {value: 1, amount: 0, lockedAmount: 0, valueName:"parrot"},
      {value: 2, amount: 0, lockedAmount: 0, valueName:"monkey"},
      {value: 3, amount: 0, lockedAmount: 0, valueName:"sword"},
      {value: 4, amount: 0, lockedAmount: 0, valueName:"diamond"},
      {value: 5, amount: 0, lockedAmount: 0, valueName:"doublon"},
    ]
    let sameDieValue = [0,0,0,100,200,500,1000,2000,4000,4000];
    let cardRule:string = activeCard[0].valueName;
    
    // count dice groupDiceValue
    diceBag.forEach((dice)=>{
      groupDiceValue.map((scoreLine)=>{
        if(scoreLine.value === dice.value){
          scoreLine.amount ++;
          if(dice.isLocked){
            scoreLine.lockedAmount ++;
          }
        }
      });
    });

    // Rule Zoo
    if(cardRule === "zoo"){
      let zooTransferValue:number = 0; // deplacer les parrot dans la cage des singes
      groupDiceValue.forEach((scoreLine)=>{
        if(scoreLine.valueName === "parrot"){
          zooTransferValue = scoreLine.amount;
          scoreLine.amount = 0;
        }
      });
      groupDiceValue.forEach((scoreLine)=>{
        if(scoreLine.valueName === "monkey"){
          scoreLine.amount += zooTransferValue;
        }
      });
    }
    
    // Rule add extra dice cards
    if(cardRule === "diamond" || cardRule === "doublon") {
      groupDiceValue.map((scoreLine)=>{
        if(scoreLine.valueName === cardRule){
          scoreLine.amount ++;
        }
      });
    }
    if(cardRule === "dead"){
      groupDiceValue.map((scoreLine)=>{
        if(scoreLine.valueName === "death"){
          scoreLine.amount ++;
        }
      });     
    }
    if(cardRule === "dead2"){
      groupDiceValue.map((scoreLine)=>{
        if(scoreLine.valueName === "death"){
          scoreLine.amount += 2;
        }
      });
    }

    // check il aux morts et death
    groupDiceValue.forEach((scoreLine)=>{
      if(scoreLine.valueName === 'death'){
        if(isIleAuxMorts === true){
          //check ile aux morts tant que cest valide
          if(scoreLine.amount <= iamCounter){
            isDead = true;
          }else{
            iamCounter = scoreLine.amount;
          }
          scoreIleAuxMorts = scoreLine.amount * -100;
        }else if(turnCounter === 1 && scoreLine.amount > 3 && !cardRule.startsWith("ship")){
          isIleAuxMorts = true;
          iamCounter = scoreLine.amount ;
          scoreIleAuxMorts = scoreLine.amount * -100;
        }else if(scoreLine.amount >= 3){
          isDead = true;
          allScoreBonus = false;
        }
      }
    }); 

    // Rule Chest : change Scoring Amount to locked amount
    if(cardRule === 'chest' && isDead){
      groupDiceValue.map((scoreLine)=>{
        scoreLine.amount = scoreLine.lockedAmount;
      });
    }

    // Scoring pareils + doublons/diamands
    let total:number = 0;
    
    // calculer les pareils et bonus
    groupDiceValue.forEach((scoreLine)=>{
        if(scoreLine.valueName !== 'death'){
          total += sameDieValue[scoreLine.amount];
          if(scoreLine.valueName === 'doublon' || scoreLine.valueName === 'diamond'){
            total += scoreLine.amount * 100;
          }
        }
        if(scoreLine.value !== 0 && scoreLine.value !== 4 && scoreLine.value !== 5 && scoreLine.amount > 0 && scoreLine.amount < 3){// si pas 3 pareils pour les des sans valeurs
          allScoreBonus = false;
        }
    });

    // Scoring Bonus
    if (allScoreBonus) {
      total += 500;
    }
    // Rule double
    if(cardRule === "double"){
      total += total;
    }
    // Rule Ships
    if(cardRule.startsWith("ship")){
      let shipValues:Array<number> = [300,500,1000];
      let swordAmount:number = parseInt(cardRule.slice(-1));
      groupDiceValue.forEach((scoreLine)=>{
        if(scoreLine.valueName === 'sword'){
          if(scoreLine.amount >= swordAmount && !isDead){
            total += shipValues[swordAmount-2];
          }else{
            total = shipValues[swordAmount-2] * -1;
          }
        }
      });
    }else if(isDead && cardRule != "chest"){ // normal zero from death
      total = 0;
    }

    score = (!isIleAuxMorts)? total : scoreIleAuxMorts ; 
    validateShuffleDiceAllowed();
}

let videoDisabled:boolean = false;

</script>

<Bkg {isIleAuxMorts} {isDead} {videoDisabled}/>

<main>
  <section class="playerZone">
      <Points score={score} iam='{isIleAuxMorts}' />
  </section>

  <section class="deckZone">
    <div class="deck pioche" on:click={nextTurn}>
      {#each deck as myCard (myCard.id)}
        <Cards opt={myCard} />
      {/each}
    </div>
    <div class="deck discard">
      {#each discardPile as myCard (myCard.id)}
        <Cards opt={myCard} />
      {/each}
    </div>
    <div class="deck activeCard">
      {#each activeCard as myActiveCard (myActiveCard.id)}
        <Cards opt={myActiveCard} />
      {/each}
    </div>
  </section>

  <section class="diceZone">
    {#each diceBag as myDie (myDie.id)}
      <Dice bind:opt={myDie} bind:rerollDeatRule={rerollDeatRule} />
    {/each}
  </section>

  <section class="ctrlZone">

    <div class="options">
      <button on:click={sortBag} class="sort " disabled={autoSort}>Ordoner</button>
      <br />
      <input type="checkbox" bind:checked={autoSort} id="autoSort" />
      <label for="autoSort">Auto-Sort</label>
      <br />
      <br />
      <input type="checkbox" bind:checked={videoDisabled} id="videoDisabled" />
      <label for="videoDisabled">Disable videos</label>
    </div>
    
    <ShuffleBtn on:click={shuffleDice} disabled={cannotShuffleDice} content="Brasser les dés ({activeDice})"/>

  </section>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

/* GRID */
  main {
    display: grid;
    position: relative;
    grid-template-columns: 33% 33% 33%;
    grid-template-rows: 33% auto 33%;
    justify-items: start;
    justify-content: space-between; 
    gap: 15px 0px;
    z-index: 1;
    /* background: beige; */
    height:100vh;
  }

  section{
    width: 100%;
    height: 100%;
  }

  .playerZone {
    /* background: rgba(255, 255, 0, 0.2); */
    grid-row-start: 1;
    grid-column: 1 / 2;

    justify-content: flex-end;
    align-items: center;
    display: flex;
    flex-direction: column;

  }
 
  
  .deckZone {
    /* background: rgba(255, 0, 0, 0.2); */
    grid-row-start: 1;
    grid-column: 2 / span 2;
    justify-self: end;
  }
  .diceZone {
    /* background: rgba(0, 0, 200, 0.2); */
    grid-row-start: 2;
    grid-column: 1 / span 3;

    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    grid-template-rows: 50% 50%;
    align-items: center;
    justify-items: center;
   
  }
  .ctrlZone {
    /* background: rgba(0, 200, 0, 0.2); */
    grid-row-start: 3;
    grid-column: 1 / span 3;

    width: 100%;
    display:flex;
    align-items: flex-start;
    justify-content: space-around;
  }



/* CARDS */
.deck{
  width: 0;
  height: 0;
  background: red;
  position: relative;
  top: 39px;
  left: 6%;
}
.pioche{
  cursor: pointer;
  transition: transform 60ms linear;
  transform-origin: 150px 90px;
}

.pioche:active{
  transform: scale(0.98);
}

/* dice */


/* bouttons */



  .options {
    margin: 0 10px;
  }
  .sort {
    padding: 10px;
  }

</style>
