<template>
  <nav role="navigation">
    <div class="menuToggle">
      <input type="checkbox" />
      <span></span>
      <span></span>
      <span></span>
      <ul class="menu">
        <div class="menu__box">
          <li v-for="(link, index) in navLinks" :key="index">
            <router-link :to="link.path">{{ link.text }}</router-link>
          </li>
        </div>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  props: ["navLinks"],
};
</script>

<style scoped lang="scss">
$background-opacity: rgb(3, 3, 3);
nav {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  position: fixed;
  z-index: 30;
  .menuToggle {
    display: block;
    position: relative;
    top: 50px;
    margin-left: 30px;
    z-index: 1;
    -webkit-user-select: none;
    user-select: none;
    height: 100%;
    a {
      text-decoration: none;
      color: #232323;
      transition: color 0.3s ease;
    }
    input {
      display: block;
      width: 40px;
      height: 32px;
      position: absolute;
      top: -7px;
      left: -5px;
      cursor: pointer;
      opacity: 0;
      z-index: 2;
      -webkit-touch-callout: none;
    }
    span {
      display: block;
      width: 33px;
      height: 4px;
      margin-bottom: 5px;
      position: relative;
      background: #cdcdcd;
      border-radius: 3px;
      z-index: 1;
      transform-origin: 4px 0px;
      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
        background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
    }
    span:first-child {
      transform-origin: 0% 0%;
    }
    span:nth-last-child(2) {
      transform-origin: 0% 100%;
    }
    input:checked ~ span {
      opacity: 1;
      transform: rotate(45deg) translate(-2px, -1px);
      background: #232323;
    }
    input:checked ~ span:nth-last-child(3) {
      opacity: 0;
      transform: rotate(0deg) scale(0.2, 0.2);
    }

    input:checked ~ span:nth-last-child(2) {
      transform: rotate(-45deg) translate(0, -1px);
    }
    .menu {
      position: absolute;
      width: 300px;
      margin: -100px 0 0 -50px;
      height: 110%;
      padding-right: 30px;
      background: $background-opacity;
      list-style-type: none;
      -webkit-font-smoothing: antialiased;
      transform-origin: 0% 0%;
      transform: translate(-100%, 0);
      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
      padding-top: 5%;
      &__box {
        padding-top: 100px;
        li {
          font-size: 35px;
          padding: 60px 0;
          text-align: center;
          a {
            color: white;
            text-transform: uppercase;
          }
        }
      }
    }
    input:checked ~ ul {
      transform: none;
    }
  }
}
</style>