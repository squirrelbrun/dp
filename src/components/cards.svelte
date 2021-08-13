<script lang="ts">
    import type { Card } from "../modules/card";
    export let opt: Card;
    let faceUpPath = `./src/assets/cards/card_${opt.value}_${opt.valueName}.jpg`;
    const faceDownPath = `./src/assets/cards/card_0_back.png`;
    //$: myPath = opt.isFaceDown?faceDownPath:faceUpPath; 
</script>
<div class="card  isFaceDown-{opt.isFaceDown} isDiscarded-{opt.isDiscarded}">
    <img title="{opt.altRules}" alt="{opt.altRules}" id="card_{opt.id}" src='{faceUpPath}' />
    <img class="facedown" alt="card facedown" src='{faceDownPath}' />
</div>

<style>
    .card {
        height: 130px;
        width: 80px;
        box-shadow: rgba(0,0,0,0.05) 3px 2px 3px;
        position: absolute;
        border-radius:10px;
        transform-style: preserve-3d;
        transition: transform 700ms;
        
    }
    .card.isFaceDown-true{
        transform: rotateY(180deg) translateX(-140%);
        box-shadow: rgba(0,0,0,0.05) -3px 2px 3px;
    }

    .card.isDiscarded-true{
        transform: rotateY(180deg) translateX(-14%);
        z-index: 0;
    }

    .card img{
        height: 130px;
        width: 80px;
        border-radius:10px;
        position: absolute;
        backface-visibility: hidden;
       
        border: solid 2px grey;
    }

    .facedown{
        transform: rotateY(180deg);
    }

    


</style>
