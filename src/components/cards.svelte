<script lang="ts">
    import type { Card } from "../modules/card";
    export let opt: Card;
    let faceUpPath = `./src/assets/cards/card_${opt.value}_${opt.valueName}.jpg`;
    const faceDownPath = `./src/assets/cards/card_0_back.png`;
</script>
<div class="card  isFaceDown-{opt.isFaceDown} isDiscarded-{opt.isDiscarded}">
    <img title="{opt.altRules}" alt="{opt.altRules}" id="card_{opt.id}" src='{faceUpPath}' />
    <img class="facedown" alt="card facedown" src='{faceDownPath}' />
</div>

<style>
    .card {

        height: 42vw;
        width: 25vw;

        box-shadow: rgba(0,0,0,0.05) 3px 2px 3px;
        position: absolute;
        border-radius:10px;
        transform-style: preserve-3d;
        transition: transform 600ms;
        
    }
    .card.isFaceDown-true{
        transform: translateX(130%) rotateY(-180deg);
        box-shadow: rgba(0,0,0,0.05) -3px 2px 3px;
        transition: transform 300ms;
       
    }

    .card.isDiscarded-true{
        transform: translateX(10%) rotateY(-180deg);
        z-index: 0;
    }

    .card img{
        height: 42vw;
        width: 25vw;
        border-radius:10px;
        position: absolute;
        backface-visibility: hidden;
       
        border: solid 2px #e6c870;
    }
    .card.isFaceDown-true img{
        border: solid 2px grey;
    }

    .facedown{
        transform: rotateY(-180deg);
    }

    


</style>
