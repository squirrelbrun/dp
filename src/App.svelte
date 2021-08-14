<script lang="ts">
  import type { Die } from "./modules/die";
  import type { Card } from "./modules/card";
  import Dice from "./components/dice.svelte";
  import Cards from "./components/cards.svelte";
  import Points from "./components/points.svelte";
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
  const minimumUnlockdDice: number = 2;
  const startValue: number = 1;
  let slowVid: number = 0.6;
  let autoSort: boolean = true;
  let cannotShuffleDice: boolean = false;
  let diceBag: Array<Die> = [];

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

    if (validateShuffleDiceRights()) {

      if(diceBag[0].ordery === -1){sortBag()}

      diceBag.forEach((dice, id) => {
        let newValue: number = Math.floor(Math.random() * 6);
        let shuffleingTime:number = 1000;
        if (!dice.isLocked) {
          diceBag[id].isShuffleing = true;

          setTimeout(()=>{
              diceBag[id].isShuffleing = false;
              diceBag[id].value = newValue;
              //diceBag[id].order = newValues[id].order;

              // check if dead
              if (newValue == 0) {
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
    }
  };

  // this should be bind to reactive values
  const validateShuffleDiceRights = () => {
    let count: number = 0;
    diceBag.forEach((die) => {
      count += die.isLocked ? 0 : 1;
    });
    cannotShuffleDice = count >= minimumUnlockdDice ? false : true;
    return !cannotShuffleDice;
  };

  // const validateDeath = () => {
  //   let count: number = 0;
  //   let dead: boolean = false;
  //   diceBag.forEach((die) => {
  //     count += die.value === 0 ? 1 : 0;
  //   });
  //   // if player turn = 0 - ile aux morts
  //   console.log("deadcount", count);
  //   dead = count >= 3 ? true : false;
  //   return dead;
  // };

  // test reactivity (ca ca marhce juste avec l<app, ca marche pas si on lock via le component)
  $: if (diceBag) {
    validateShuffleDiceRights();
    //console.log("change happened", diceBag);
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
    {
      value: 11,
      valueName: "double",
      altRules: "Pirate: Vous doublez vos points",
      amountInDeck: 4,
    },
  ];

  let activeCard: Array<Card> = [];
  let discardPile: Array<Card> = [];
  let deck: Array<Card> = [];
  let debounceDraw: boolean = true;

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
    if (deck.length != 0 && debounceDraw) {
      console.log(debounceDraw);
      debounceDraw = false;
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
        activeCard[0].isFaceDown = false
        deck = deck; //force reactivity
        resetBag();  
        setTimeout(()=>{ debounceDraw = true; }, 600);
      },100) ;
      
  };

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

  shuffleDeck(); // start


  let score:number=0;
  //setInterval(()=>{getHandScore},2000);

  interface Scoring {
    value:number;
    valueName:string;
    amount:number;
  }

  const getHandScore = () => {
    // init
    let total:number = 0;
    let allScoreBonus:boolean = true;
    let groupDiceValue:Array<Scoring> = [
      {value: 0, amount: 0, valueName:"death", },
      {value: 1, amount: 0, valueName:"parrot"},
      {value: 2, amount: 0, valueName:"monkey"},
      {value: 3, amount: 0, valueName:"sword"},
      {value: 4, amount: 0, valueName:"diamond"},
      {value: 5, amount: 0, valueName:"doublon"},
    ]
    let sameDieValue = [0,0,0,100,200,500,1000,2000,4000,4000];
    let cardRule:string = activeCard[0].valueName;
  
    // Calculer les diamands et doublons
    diceBag.forEach((dice)=>{
      if(dice.valueName === "diamond" || dice.valueName === "doublon"){
        total += 100;
      }
      groupDiceValue.map((scoreLine)=>{
        if(scoreLine.value === dice.value){
          scoreLine.amount ++;
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
    
    // calculer les pareils et bonus
    groupDiceValue.forEach((scoreLine)=>{
        if(scoreLine.value > 0){
          total += sameDieValue[scoreLine.amount];
        }
        if(scoreLine.value === 0 && scoreLine.amount > 0){// si un mort
          allScoreBonus = false;
        }
        if(scoreLine.value !== 0 && scoreLine.value !== 4 && scoreLine.value !== 5 && scoreLine.amount > 0 && scoreLine.amount < 3){// si des 3 pareils pour les des sans valeurs
          allScoreBonus = false;
        }
    });

    // Rule extra shiny cards
    if(cardRule === "diamond" || cardRule === "doublon") {
      total += 100;
      groupDiceValue.map((scoreLine)=>{
        if(scoreLine.valueName === cardRule){
          scoreLine.amount ++;
        }
      });
    }

    // Bonus
    if (allScoreBonus) {
      total += 500;
    }
    // Rule double
    if(cardRule === "double"){
      total += total;
    }
    // Rule Ships
    if(cardRule.startsWith("ship")){
      // TODO s'assurer ici que les 3 sword kills score
      let shipValues:Array<number> = [300,500,1000];
      let swordAmount:number = parseInt(cardRule.slice(-1));
      groupDiceValue.forEach((scoreLine)=>{
        if(scoreLine.valueName === 'sword'){
          if(scoreLine.amount >= swordAmount){
            total += shipValues[swordAmount-2];
          }else{
            total = shipValues[swordAmount-2] * -1;
          }
        }
      });
    }

    score = total;
}
 

</script>
<div class="bkg">

  <video
    src="https://media.giphy.com/media/u6OUfjQ2KPIySR1o8r/giphy.mp4"
    class="bkgVideo"
    autoplay
    loop
    bind:playbackRate={slowVid}
  >
    <track default kind="captions" srclang="en" />
    Sorry, your browser doesn't support embedded videos.
  </video>
</div>

<main>
  <section class="playerZone">
      <Points score={score}/>
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
      <Dice bind:opt={myDie} />
    {/each}
  </section>

  <section class="ctrlZone">


    <div class="options">
      <button on:click={sortBag} class="sort " disabled={autoSort}>Ordoner</button>
      <br />
      <input type="checkbox" bind:checked={autoSort} id="autoSort" />
      <label for="autoSort">Auto-Sort</label>
    </div>
    
    <button on:click={shuffleDice} disabled={cannotShuffleDice} class="shuffle">Brasser les {activeDice} dés</button>

    
  </section>
</main>
<!-- <main>


  <section class="ctrlZone">
    
    
    <div class="options">
        <button class="sort" on:click={resetBag}>Reset</button>
    <button class="sort" on:click={shuffleDeck}>ShuffleDeck</button>

    </div>
    
  </section>
</main> -->

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  /* main {
    text-align: center;
    padding: 1em;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    z-index: 1;
  
  } */
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

    justify-content: end;
    align-items: center;
    display: flex;
    flex-direction: column;

    font-weight: bold;
    font-size: 30px;

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

  .shuffle {
    font-size: 22px;
    padding: 20px;
    cursor: pointer;
    transition: transform 60ms linear, box-shadow 60ms linear, color 100ms linear;
    transform-origin: center;
    background: rgb(225, 197, 88);
    color: #555236;
    box-shadow: #839122 3px 4px 0;
    outline: none;
    border: none;
    border-radius: 10px;
    text-shadow: #c8e16f 1px 1px 0px;
  }
  .shuffle:disabled{
    color: #9d9657;
    cursor: not-allowed;
  }
  .shuffle:active:not(.shuffle:disabled){
    transform: scale(0.99) translate(2px, 2px);
    box-shadow: #839122 2px 2px 0;
  }
  
  .options {
    margin: 0 10px;
  }
  .sort {
    padding: 10px;
  }
 

/* template bkg */
  .bkg{
    position: absolute;
    width:100vw;
    height:100vh;
    overflow: hidden;
    background: #117aa4;
  }
  .bkgVideo {
    position: absolute;
    z-index: 0;
    height: 100vh;
    opacity: 0.5;
    left: -40%;
  }

 

</style>
