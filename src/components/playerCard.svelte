<script type='ts'>
    import type { Player } from "../modules/player";
    export let opt: Player;

    let playerAvatars = [
        "https://pbs.twimg.com/profile_images/1210618202457292802/lt9KD2lt.jpg",
        "https://yt3.ggpht.com/ccMnGimmDJsDob-qBfucafSNYmZMSejE8eIhgybqiOldkAvMELHkADPtgfGyuxIAJ2YFhBntS9o=s900-c-k-c0x00ffffff-no-rj",
        "https://nickelodeonuniverse.com/wp-content/uploads/Squidward.png",
        "https://nickelodeonuniverse.com/wp-content/uploads/Sandy.png",
        "https://nickelodeonuniverse.com/wp-content/uploads/Mr.Krabs_.png",
    ];

</script>

<div class="player isActive-{opt.isActive}">
    <img class="avatar" src="{playerAvatars[opt.id]}" alt="sd {opt.id}" />
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
        justify-content: flex-start;
        align-items: center;
        overflow: hidden;
        position: relative;
        padding: 10px 1% 0 1%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        
    }
    .player:nth-child(even){
        background-color: rgb(86 171 212 / 48%)
    }
    .avatar{
        border: solid 3px #4162ab;
        border-radius: 50%;
        position: relative;
        width: 42px;
        
        margin-bottom: 8px;
    }
    .isActive-true .avatar{
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
    
