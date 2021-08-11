<script lang="ts">
    import type { Card } from "../modules/card";
    export let opt: Card;
    let faceUpPath = `./src/assets/cards/card_${opt.value}_${opt.valueName}.jpg`;
    let faceDownPath = `./src/assets/cards/card_0_back.png`;
    $: myPath = opt.isFaceDown?faceDownPath:faceUpPath; 
</script>

<img class="card {opt.valueName}" alt="{opt.altRules}" id="card_{opt.id}" src='{myPath}' />

<style>
    .card {
        height: 130px;
        width: 80px;
        border: solid 2px grey;
        box-shadow: rgba(0,0,0,0.05) 3px 2px 3px;
        border-radius:10px;
        position: absolute;
        left: 25%;
        top: 0;
    }
    
</style>
