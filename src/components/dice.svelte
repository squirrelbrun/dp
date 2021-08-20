<script lang="ts">
    import type { Die } from "../modules/die";
    export let opt: Die;
    export let rerollDeatRule:boolean = false;

    $: cssLocked = opt.isLocked ? "locked" : "";
    $: cssIsShuffleing = opt.isShuffleing ? "isShuffleing" : "";
    $: cssIsShuffleing2 = opt.isShuffleing ? 0.8 : 1;

    const lockToggle = () => {
        if(rerollDeatRule == true && opt.valueName === 'death'){
            opt.isLocked = opt.isLocked ? false : true;
            rerollDeatRule = false;
        }else if(opt.ordery >= 0 && opt.valueName !== 'death'){ // cant lock while dicebag is unshuffled
            opt.isLocked = opt.isLocked ? false : true;

        } 
    };

</script>

<button
    class=" order-{opt.ordery} d{opt.value} {cssLocked} {cssIsShuffleing} die "
    style="--withShuffle:{cssIsShuffleing2}; --delay:-{opt.ordery}00ms"
    on:click={lockToggle}
    aria-label="{opt.id} {opt.valueName} {opt.isLocked}"
></button>


<style>

    .die {
        --leftBase: 24.5vw;
        --topBase: 24.5vw;
        --left: 0vw;
        --top: 0vw;
        --delay: -20ms;
        --withShuffle: 1;
        --locked: 0;

        background-color: beige;
        height: 18vw;
        width: 18vw;
        background: url(src/assets/orig/dice.png) no-repeat;
        background-size: 300%;
        background-position: 50%;
        /* margin:8px 8px 0 8px; */
        font-weight: bold;
        color: black;
        display: flex;
        align-items: flex-end;
        border-radius: 5px;
        transition: transform 100ms ease-out;
        cursor: pointer;
        box-shadow: #333 5px 3px 2px;

        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 1;
        grid-row-end: 2; 

        transform: translate(var(--left), var(--top)) rotate(var(--locked)) scale(var(--withShuffle)) ;
        transition: transform 200ms ease-out;
        
       
    }
   
    .locked {
        border: rgb(119, 232, 67) solid 4px;
        --locked: 15deg;
    }

    .d0,
    .death {
        background-position: 50% 50%;
        border: red solid 4px;
        opacity: 0.75;
    }
    .d1,
    .parrot {
        background-position: 100% 100%;
    }
    .d2,
    .monkey {
        background-position: 100% 50%;
    }
    .d3,
    .sword {
        background-position: 50% 100%;
    }
    .d4,
    .diamond {
        background-position: 0% 100%;
    }
    .d5,
    .doublon {
        background-position: 0% 50%;
    }
    .isShuffleing{
        animation: animate-background linear 320ms infinite;
        animation-delay: var(--delay);
    }

    @keyframes animate-background {
        0% { background-position: 0% 50% } 
        29% { background-position: 0% 50% }
        30% { background-position: 100% 50%  }
        49% { background-position: 100% 50%  }
        50% { background-position: 100% 100% }
        79% { background-position: 100% 100% }
        80% { background-position: 0% 100% }
        100% { background-position: 0% 100% }
        /* could have been done with animation-timing-function: steps(6, end); */
    }

    /* gestion de l'ordre pour animation (cant css grid and order animate) */
    /* .order-0{
        --left:calc(var(--leftBase)*0);
        --top:0;
    }
    .order-1{
        --left:calc(var(--leftBase)*1);
        --top:0;
    }
    .order-2{
        --left:calc(var(--leftBase)*2);
        --top:0;
    }
    .order-3{
        --left:calc(var(--leftBase)*3);
        --top:0;
    }

    .order-4{
        --left:calc(var(--leftBase)*0);
        --top: var(--topBase);
    }
    .order-5{
        --left:calc(var(--leftBase)*1);
        --top: var(--topBase);
    }
    .order-6{
        --left:calc(var(--leftBase)*2);
        --top: var(--topBase);
    }
    .order-7{
        --left:calc(var(--leftBase)*3);
        --top: var(--topBase);
    }

    .order--1{
        --left:calc(var(--leftBase)*1.5);
        --top: calc(var(--topBase)*0.5);
    } */


    /* alt order */
    .order-0{
        --left:calc(var(--leftBase)*0);
        --top:0;
    }
    .order-1{
        --left:calc(var(--leftBase)*0);
        --top: var(--topBase);
    }
    .order-2{
        --left:calc(var(--leftBase)*1);
        --top:0;
    }
    .order-3{
        --left:calc(var(--leftBase)*1);
        --top:var(--topBase);
    }

    .order-4{
        --left:calc(var(--leftBase)*2);
        --top:0;
    }
    .order-5{
        --left:calc(var(--leftBase)*2);
        --top: var(--topBase);
    }
    .order-6{
        --left:calc(var(--leftBase)*3);
        --top: 0;
    }
    .order-7{
        --left:calc(var(--leftBase)*3);
        --top: var(--topBase);
    }

    .order--1{
        --left:calc(var(--leftBase)*1.5);
        --top: calc(var(--topBase)*0.5);
    }


    


</style>
