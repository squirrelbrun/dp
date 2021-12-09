<script type='ts'>
    import type { Player } from "../modules/player";
    import Avatar from "./avatar.svelte";
    export let opt: Player;

</script>

<div class="player isActive-{opt.isActive}">
    <Avatar idAvatar={opt.id}/>
    <p class="name">{opt.playerName}</p>
    <p class="score">{opt.playerScore} <sup>pts</sup></p>
</div>

<style>
    .player{
        width:auto;
        max-width:20%;
        min-width: 17%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        overflow: hidden;
        align-items: center;
        position: relative;
        padding: 10px 1% 0 1%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        
    }
    .player:nth-child(even){
        background-color: rgb(86 171 212 / 48%)
    }
    
    .isActive-true{
        box-shadow: rgb(220, 210, 93) 0 0 1px 3px;
    }
    p{
        margin: 0;
        padding: 0;
    }
    .score{
        font-size: 15px;
        font-weight: bold;
        text-align: center;
    } 
    sup{
        font-weight: normal;
        vertical-align: text-top;
    }

    .name{
        font-size: 15px;
        font-weight: normal;
        text-align: center;
    }

  

</style>
    
