<template>
  <div class="scan">
    <Camera v-on:takePicture="this.takePicture" />
    <Gallery />
  </div>
</template>
<script>
import Camera from "../components/ScanCards/Camera.vue";
import Gallery from "../components/ScanCards/Gallery.vue";
export default {
  name: "scan",
  components: {
    Camera,
    Gallery,
  },
  methods: {
    takePicture() {
      let ratio = window.innerHeight < window.innerWidth ? 16 / 9 : 9 / 16;
      const picture = document.querySelector("canvas");
      picture.width = window.innerWidth < 1980 ? window.innerWidth : 1980;
      picture.height = window.innerWidth / ratio;
      const ctx = picture.getContext("2d");
      ctx.imageSmoothingEnabled = "true";
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(
        document.querySelector("video"),
        0,
        0,
        picture.width,
        picture.height
      );
    },
  },
};
</script>
<style lang="scss">
.scan {
  width: 100%;
}
</style>