<script lang="ts">
    export let isIleAuxMorts:boolean = false;
    export let isDead:boolean = false;
    export let videoDisabled:boolean = false;
    let slowVid: number = 0.6;
    // alt video : t2uEYBdHWXEkqx9M9n
    // 
</script>

<div class="bkg isDead-{isDead} videoDisabled-{videoDisabled}">

    <video
      src="https://media.giphy.com/media/u6OUfjQ2KPIySR1o8r/giphy.mp4"
      class="bkgVideo"
      autoplay
      loop
      muted
      bind:playbackRate={slowVid}
    >
      <track default kind="captions" srclang="en" />
      Sorry, your browser doesn't support embedded videos.
    </video>
    <video
      src="https://media.giphy.com/media/O9SfWhDlVFsvC/giphy.mp4"
      class="bkgVideo iam-{isIleAuxMorts}"
      autoplay
      loop
      muted
    >
      <track default kind="captions" srclang="en" />
      Sorry, your browser doesn't support embedded videos.
    </video>
  </div>

<style>

  .bkg{
    position: absolute;
    width:100vw;
    height:100vh;
    overflow: hidden;
    background: #117aa4;
    transition: background-color 1s linear;
  }
  .isDead-true{
    background: #590a0a; 
  }

  .bkgVideo {
    position: absolute;
    z-index: 0;
    height: 100vh;
    opacity: 0.5;
    left: -40%;
    transition: opacity 1s linear;
  }
  .iam-false{
      opacity: 0;

  }
  .iam-true{
      opacity: 0.5;
      left: -75%;
  }

  .videoDisabled-true video{
      display: none;
  }

</style>