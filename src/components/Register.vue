<template>
  <modal
    name="register-modal"
    transition="pop-out"
    :width="modalWidth"
    :focus-trap="true"
    :height="500"
  >
    <div class="box">
      <div class="box-part" id="bp-left">
        <div class="partition" id="partition-register">
          <div class="partition-title">CREATE ACCOUNT</div>
          <div class="partition-form">
            <form autocomplete="false">
              <div class="autocomplete-fix">
                <input disabled type="password" />
              </div>
              <input id="n-email" type="text" placeholder="Email" />
              <input id="n-username" type="text" placeholder="Username" />
              <input id="n-password" type="password" placeholder="Password" />
              <input id="n-password2" type="password" placeholder=" Confirm Password" />
            </form>
            <div class="button-set">
              <button id="register-btn" @click="register">Register</button>
            </div>
            <button class="large-btn facebook-btn">
              connect with
              <span>facebook</span>
            </button>
          </div>
        </div>
      </div>
      <div class="box-part" id="bp-right">
        <div class="box-messages"></div>
      </div>
    </div>
  </modal>
</template>
<script>
const MODAL_WIDTH = 856;

export default {
  name: "LoginModal",
  data() {
    return {
      modalWidth: MODAL_WIDTH
    };
  },
  methods: {
    register() {
      alert("Register");
    }
  }
};
</script>
<style lang="scss" scoped>
$background_color: #272727;
$text_color: #fff;
$primary_color: #fe8400;
$facebook_color: #3880ff;
$randomNumber: random(5);

.box {
  background: $background_color;
  overflow: hidden;
  width: 856px;
  height: 500px;
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow: 0 0 40px black;
  color: $text_color;
  font-size: 0;

  .box-part {
    display: inline-block;
    position: relative;
    vertical-align: top;
    box-sizing: border-box;
    height: 100%;
    width: 50%;

    &#bp-right {
      background: url("../assets/login/"+$randomNumber+".jpg") no-repeat top
        center/cover;
    }
  }

  .box-messages {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }

  .box-error-message {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    height: 0;
    line-height: 32px;
    padding: 0 12px;
    text-align: center;
    width: 100%;
    font-size: 11px;
    color: $text_color;
    background: $primary_color;
  }

  .partition {
    width: 100%;
    height: 100%;

    .partition-title {
      box-sizing: border-box;
      padding: 40px;
      width: 100%;
      text-align: center;
      letter-spacing: 1px;
      font-size: 26px;
      font-weight: 300;
    }

    .partition-form {
      padding: 20px 20px 0 20px;
      box-sizing: border-box;
    }
  }

  input[type="password"],
  input[type="text"] {
    background-color: $background_color;
    display: block;
    box-sizing: border-box;
    margin-bottom: 4px;
    width: 100%;
    font-size: 15px;
    line-height: 2;
    border: 0;
    border-bottom: 1px solid #dddedf;
    padding: 4px 8px;
    font-family: inherit;
    transition: 0.5s all;
  }
  input[type="password"]:focus,
  input[type="text"]:focus {
    border-bottom: 1px solid $primary_color;
    color: $primary_color;
    outline: none;
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px $background_color inset;
    background-color: transparent;
  }

  button {
    background: $background_color;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px;
    letter-spacing: 1px;
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    min-width: 190px;
    margin-top: 35px;
    color: $text_color;
    cursor: pointer;
    border: 1px solid #dddedf;
    text-transform: uppercase;
    transition: 0.1s all;
    font-size: 17px;
    &:hover {
      border-color: mix($primary_color, black, 90%);
      color: $primary_color;
    }
  }

  .large-btn {
    width: 100%;
    background: $background_color;

    span {
      font-weight: 600;
    }
    &:hover {
      color: $text_color !important;
    }
  }

  .button-set {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #register-btn,
  #signin-btn {
    margin-left: 8px;
  }

  .facebook-btn {
    border-color: $facebook_color;
    color: $facebook_color;
    margin-top: 12%;
    s &:hover {
      border-color: $facebook_color;
      background: $facebook_color;
    }
  }

  .autocomplete-fix {
    position: absolute;
    visibility: hidden;
    overflow: hidden;
    opacity: 0;
    width: 0;
    height: 0;
    left: 0;
    top: 0;
  }
}

.pop-out-enter-active,
.pop-out-leave-active {
  transition: all 0.5s;
}

.pop-out-enter,
.pop-out-leave-active {
  opacity: 0;
  transform: translateY(24px);
}
</style>
