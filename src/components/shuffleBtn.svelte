<script lang="ts">
    export let disabled:boolean = false;
    export let content:string = "";

</script>

<button disabled={disabled} class="shuffle" on:click>{content}</button>

<style>
  .shuffle {
    font-size: 16px;
    font-weight: bold;
    padding: 20px;
    cursor: pointer;
    transition: transform 60ms linear, box-shadow 60ms linear, color 100ms linear;
    transform-origin: center;
    background: rgb(225, 197, 88);
    color: #555236;
    box-shadow: #839122 3px 4px 0;
    outline: none;
    border: none;
    border-radius: 10px;
    text-shadow: #c8e16f 1px 1px 0px;
  }
  .shuffle:disabled{
    color: #9d9657;
    cursor: not-allowed;
  }
 
  .shuffle:active:not(.shuffle:disabled){
    transform: scale(0.99) translate(2px, 2px);
    box-shadow: #839122 2px 2px 0;
  }

</style>