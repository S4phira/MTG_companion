<template>
  <div class="camera">
    <video autoplay class="feed"></video>
    <button class="btn snap" @click="$emit('takePicture')">SNAP</button>
  </div>
</template>

<script>
export default {
  name: "camera",
  methods: {
    init() {
      if (
        "mediaDevices" in navigator &&
        "getUserMedia" in navigator.mediaDevices
      ) {
        let constrains = {
          video: {
            width: {
              min: 640,
              ideal: 1280,
              max: 1920,
            },
            height: {
              min: 360,
              ideal: 720,
              max: 1080,
            },
          },
        };
        navigator.mediaDevices.getUserMedia(constrains).then((stream) => {
          const videoPlayer = document.querySelector("video");
          videoPlayer.srcObject = stream;
          videoPlayer.play();
        });
      } else {
        alert("Cannot get Camera");
      }
    },
  },
  beforeMount() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.camera {
  float: left;
  width: 45%;
  height: 70vh;
  position: relative;
  margin: 30px;

  .feed {
    width: 100%;
    background-color: black;
  }
  .snap {
    width: 50px;
    height: 90px;
    position: absolute;
    top: 85%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
  }
}
</style>