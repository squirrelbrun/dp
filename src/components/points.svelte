
<script lang="ts">
    // import type { Card } from "../modules/points";
    export let score:number = 0;
    export let iam:boolean = false;

    $:isNegative = (score < 0)? true : false; 
    $:scoreMessage = (!iam)? "Points" : "Points aux autres joueurs"; 
    
</script>

<p class="score isNegative-{isNegative} isIAM-{iam}">{score}</p>
<p class="message IAM-{iam}">{scoreMessage}</p>

<style>
    p{
        margin: 0 10px;
        font-size: 30px;
        font-weight: bold;
        text-align: center;
    }
  /* score */
    .score{
        --color: #fff;
        --colorShadow: #b5b5b5;
        
        color: var(--color);
        font-size: 40vmin;
        font-weight: bold;
        line-height: 13vmin;
        text-shadow: 0vmin 1vmin 0vmin var(--colorShadow), -1vmin 2vmin 0 #333, 1vmin 2vmin 0 #333, -1vmin 2.5vmin 0 #333, 1vmin 2.5vmin 0 #333, 0.4vmin 2.55vmin 0 #333, -0.25vmin 2.55vmin 0 #333, -1vmin 3.55vmin 0 #222, -0.25vmin 3.55vmin 0 #222, 0.25vmin 3.55vmin 0 #222, 0.75vmin 3.55vmin 0 #222;
        transform: scale(0.26);
    }
    .isNegative-true{
        --color: rgb(249, 107, 107);
        --colorShadow: #953232;
    }
    .isIAM-true{
        --color: #f0cbab;
        --colorShadow: #9d9760;
    }
    .message.IAM-true{
        font-size: 17px;
    }
    .message{
        margin-bottom: 14px;
    }
</style>