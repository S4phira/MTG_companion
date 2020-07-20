<template>
  <div class="login">
    <div class="login__form ">
      <p>Zaloguj się</p>
      <form>
        <div class="input-container">
          <input type="text" required="" />
          <label>name</label>
        </div>
        <div class="input-container">
          <input type="hasło" required="" />
          <label>hasło</label>
        </div>
        <button type="button" class="btn">Zaloguj</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
$primary: #fe8400;

.login {
  width: 40%;
  height: 50%;
  min-height: 400px;
  background-color: rgba(3, 3, 3, 0.404);
  display: flex;
  align-items: center;
  justify-content: center;
  &__form {
    width: 30%;
    height: 100%;
    p {
      color: #fff;
      text-align: center;
      font-size: 40px;
    }
  }
}
.text-center {
  color: #fff;
  text-transform: uppercase;
  font-size: 23px;
  margin: -50px 0 80px 0;
  display: block;
  text-align: center;
}
.box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.89);
  border-radius: 3px;
  padding: 70px 100px;
}
.input-container {
  position: relative;
  margin-bottom: 45px;
}
.input-container label {
  position: absolute;
  top: 0px;
  left: 0px;
  font-size: 18px;
  color: #fff;
  transition: all 0.5s ease-in-out;
}
.input-container input {
  border: 0;
  border-bottom: 1px solid #555;
  background: transparent;
  width: 100%;
  padding: 8px 0 5px 0;
  font-size: 16px;
  color: #fff;
}
.input-container input:focus {
  border: none;
  outline: none;
  border-bottom: 1px solid $primary;
}
.btn {
  color: #fff;
  background-color: $primary;
  outline: none;
  border: 0;
  color: #fff;
  padding: 10px 20px;
  text-transform: uppercase;
  margin-top: 50px;
  border-radius: 2px;
  cursor: pointer;
  position: absolute;
}
.input-container input:focus ~ label,
.input-container input:valid ~ label {
  top: -12px;
  font-size: 15px;
  color: $primary;
}
</style>
