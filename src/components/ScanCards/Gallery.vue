<template>
  <div class="picture">
    <canvas></canvas>
  </div>
</template>
<script>
export default {
  name: "picture",
};
</script>
<style lang="scss">
.picture {
  float: right;
  width: 50%;
  position: relative;
  height: 60vh;
  canvas {
    width: 80%;
    background-color: rgba(0, 0, 0, 0.335);
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
  }
}
</style>