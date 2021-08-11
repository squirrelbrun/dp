<script lang="ts">
  import type { Die } from "./modules/die";
  import type { Card } from "./modules/card";
  import Dice from "./components/dice.svelte";
  import Cards from "./components/cards.svelte";

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
  let slowVid: number = 0.3;
  let autoSort: boolean = false;
  let cannotShuffle: boolean = false;
  let diceBag: Array<Die> = [];

  // let player = {
  //   "isDead":boolean = false;
  // }

  for (let i: number = 0; i < diceBagQt; i++) {
    diceBag = [
      ...diceBag,
      {
        id: i,
        value: startValue,
        isLocked: false,
        valueName: diceValuesNames[startValue],
      },
    ];
  }
  $: for (let i: number = 0; i < diceBagQt; i++) {
    diceBag[i].valueName = diceValuesNames[diceBag[i].value];
  }

  let activeDice: number = diceBagQt;
  $: activeDice = diceBag
    .map((obj) => {
      return obj.isLocked ? 0 : 1;
    })
    .reduce((t, n) => t + n, 0);

  console.log("db2", diceBag, diceBag.length);

  let shuffleDisabled: boolean = false;
  let sortDisabled: boolean = false;

  const shuffle = () => {
    if (validateShuffleRights()) {
      diceBag.map((dice, id) => {
        let newValue: number = Math.floor(Math.random() * 6);
        if (!dice.isLocked) {
          diceBag[id].value = newValue;
        }
        // dice.value = newValue;// pourquoi ca ca update pas le component, mais la ligne d'au dessus oui ? pourtant l'array est bien modifié !?!?! BUG SVELTE ?
        if (newValue == 0) {
          diceBag[id].isLocked = true;
          // dice.isLocked = true; //meme question
        }
      });
      if (autoSort) {
        sortBag();
      }
    }
  };

  // this should be bind to reactive values
  const validateShuffleRights = () => {
    let count: number = 0;
    diceBag.forEach((die) => {
      count += die.isLocked ? 0 : 1;
    });
    cannotShuffle = count >= minimumUnlockdDice ? false : true;
    //unlockedDice = count;

    console.log("validatin");

    return !cannotShuffle;
  };

  const validateDeath = () => {
    let count: number = 0;
    let dead: boolean = false;
    diceBag.forEach((die) => {
      count += die.value === 0 ? 1 : 0;
    });
    // if player turn = 0 - ile aux morts
    console.log("deadcount", count);
    dead = count >= 3 ? true : false;
    return dead;
  };

  // test reactivity (ca ca marhce juste avec l<app, ca marche pas si on lock via le component)
  $: if (diceBag) {
    console.log("woof A", validateShuffleRights(), validateDeath());
  }

  const sortBag = () => {
    diceBag = diceBag.sort(compareValue);
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

  const resetBag = () => {
    diceBag.forEach((die) => {
      die.value = 1;
      die.isLocked = false;
    });
    diceBag = diceBag; // react force reactivity qui se fait pas dans un foreach
  };

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
      valueName: "shine",
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

  const drawCard = () => {
    if (deck.length != 0) {
      discardPile.push(activeCard.shift());
      activeCard.push(deck.shift());
      activeCard[0].isFaceDown = false;
      deck = deck; //force reactivity
      resetBag();
      slowVid = 0.5
    }
  };

  const shuffleDeck = () => {
    deck = [];
    activeCard = [];
    discardPile = [];
    initDeck();
    deck = shuffleArray(deck);
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  shuffleDeck(); // start

</script>
<div class="bkg">
  <video
    src="https://media.giphy.com/media/Q5idwzxmoRkBdiEVpu/giphy.mp4"
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
  <section class="deckZone">
    <div class="activeCard">
      {#each activeCard as myActiveCard (myActiveCard.id)}
        <Cards opt={myActiveCard} />
      {/each}
    </div>
    <div class="deck pioche" on:click={drawCard}>
      {#each deck as myCard (myCard.id)}
        <Cards opt={myCard} />
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
    <div class="options">
        <button class="sort" on:click={resetBag}>Reset</button>
    <button class="sort" on:click={shuffleDeck}>ShuffleDeck</button>

    </div>
    <button on:click={shuffle} disabled={cannotShuffle} class="shuffle">Brasser les {activeDice} dés</button>
  </section>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    z-index: 1;
  
  }

  .shuffle {
    margin-top: 30px;
    font-size: 22px;
    padding: 20px;
    cursor: pointer;
  }
  .options {
    margin: 30px 0 10px 0;
  }
  .sort {
    padding: 10px;
    margin: 10px;
  }
  .deck {
    /* border: solid 2px blue; */
    height: 200px;
    width: 120px;
    position: relative;
  }
  .bkg{
    position: absolute;
    width:100vw;
    height:100vh;
    overflow: hidden;
    background: #337495;
  }
  .bkgVideo {
    position: absolute;
    z-index: 0;
    height: 100vh;
    opacity: 0.2;
  }

  section {
    position: relative;
    display: flex;
    width: 100vw;
    
  }

  .deckZone {
    /* background: rgba(255, 0, 0, 0.2); */
    height: 30vh;
  }
  .activeCard{
    width: 50vw;
    /* background: rgba(0, 200, 0, 0.2); */
  }
  .pioche{
    width: 50vw;
    /* background: rgba(0, 0, 200, 0.2); */
  }

  .diceZone {
    /* background: rgba(0, 0, 200, 0.2); */
    flex-wrap: wrap;
    justify-content: center;
    vertical-align: middle;
  }
  .ctrlZone {
    /* background: rgba(0, 200, 0, 0.2); */
    height: 33vh;
    display: flex;
    justify-content: center;
    align-items: end;
  }
</style>
