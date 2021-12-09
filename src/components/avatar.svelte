<script type='ts'>
    export let idAvatar: number;

    const playerAvatars = [
        "https://nickelodeonuniverse.com/wp-content/uploads/Spongebob.png",
        "https://nickelodeonuniverse.com/wp-content/uploads/Patrick.png",
        "https://nickelodeonuniverse.com/wp-content/uploads/Squidward.png",
        "https://nickelodeonuniverse.com/wp-content/uploads/Sandy.png",
        "https://nickelodeonuniverse.com/wp-content/uploads/Mr.Krabs_.png",
    ];

</script>

<img class="avatar" src="{playerAvatars[idAvatar]}" alt="sd {idAvatar}" />

<style>
    .avatar{
        border: solid 3px #4162ab;
        border-radius: 50%;
        position: relative;
        width: 42px;
        
        margin-bottom: 8px;
    }
</style>