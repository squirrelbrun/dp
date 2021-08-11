<script lang="ts">
    import type { Die } from "../modules/die";
    export let opt: Die;

    $: cssLocked = opt.isLocked ? "locked" : "";

    const lockToggle = () => {
        opt.isLocked = opt.isLocked ? false : true;
    };
</script>

<button
    class="die d{opt.value} {cssLocked}"
    on:click={lockToggle}
    aria-label="{opt.id} {opt.valueName} {opt.isLocked}"
/>

<style>
    .die {
        background-color: beige;
        height: 65px;
        width: 65px;
        background: url(src/assets/orig/dice.png) no-repeat;
        background-size: 300%;
        background-position: 50%;
        margin:8px 8px 0 8px;
        font-weight: bold;
        color: black;
        display: flex;
        align-items: flex-end;
        border-radius: 5px;
        transition: transform 100ms ease-out;
        cursor: pointer;
        box-shadow: #333 5px 3px 2px;
    }
    .locked {
        border: purple solid 4px;
        transform: rotate(15deg);
        transition: transform 200ms ease-out;
    }
    .d0,
    .death {
        background-position: 50% 50%;
        border: red solid 4px;
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
</style>
