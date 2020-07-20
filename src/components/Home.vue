<template>
  <div>
    <div class="buttons">
      <button class="buttons__register btn">
        <router-link to="/register">Zarejestruj się</router-link>
      </button>
      <button class="buttons__login btn">
        <router-link to="/login">Zaloguj się</router-link>
      </button>
    </div>
    <div class="header">
      <div class="header__title">
        <p>MAGIC THE GATHERING COMPANION</p>
        <p>
          Everything you need for your Magic The Gathering collection
          management, Prices, Stats, Decks, mobile
        </p>
        <img class="header__logo" src="../assets/phoenix.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.buttons {
  position: absolute;
  top: 5%;
  right: 3%;
  .btn {
    border: none;
    border-radius: 10px;
    font-size: 25px;
    position: relative;
    overflow: hidden;
    background-color: rgba(3, 3, 3, 0.404);
    width: 200px;
    height: 50px;
    margin: 10px;
    outline: none;
  }
  .btn:hover {
    box-shadow: 1px 1px 30px 0px #fe8400;
  }
  .btn a {
    text-decoration: none;
    color: #fff;
  }
}
.header {
  color: #fff;
  text-align: center;
  font-size: 25px;
  position: relative;
  top: -10%;
  &__title p {
    z-index: 5;
    position: relative;
    padding: 0 20%;
  }
  &__title p:first-child {
    font-size: 55px;
    margin: 0;
    z-index: 5;
    padding: 0;
  }
  &__logo {
    position: absolute;
    height: 280px;
    top: -170px;
    right: -40px;
    z-index: 1;
  }
}
</style>
