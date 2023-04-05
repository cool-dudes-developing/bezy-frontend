<template>
  <header>Sign in</header>
  <form id="form">
    <div class="form-input">
      <label for="email">Email</label>
      <input
        id="email"
        type="text"
        v-model="email"
        placeholder="What's your email?"
        @blur="emailValidation"
        @input="emailError = false"
      />
      <p v-if="emailError" class="error-message">{{ emailErrorMessage }}</p>
    </div>
    <div class="form-input">
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        v-model="password"
        placeholder="Your password"
        @blur="passwordValidation"
        @input="passwordError = false"
      />
      <p v-if="passwordError" class="error-message">
        {{ passwordErrorMessage }}
      </p>
    </div>
  </form>
  <footer>
    <!-- <router-link to="/" class="cta-level-one">Continue</router-link> -->
    <button
      type="submit"
      form="form"
      class="cta-level-one"
      :disabled="formError()"
      :style="formError() ? { opacity: 0.5 } : { opacity: 1 }"
    >
      Continue
    </button>
    <router-link to="/auth/register" class="cta-level-two"
      >New to Bezy?</router-link
    >
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      email: null,
      emailError: false,
      emailErrorMessage: '',
      password: null,
      passwordError: false,
      passwordErrorMessage: ''
    }
  },
  methods: {
    emailValidation() {
      const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
      if (this.email == '' || this.email == null) {
        this.emailError = true
        this.emailErrorMessage = 'Email required'
        return
      }
      if (!regex.test(this.email)) {
        this.emailError = true
        this.emailErrorMessage = 'Incorrect email'
        return
      }
      this.emailError = false
      return
    },
    passwordValidation() {
      if (this.password == '' || this.password == null) {
        this.passwordError = true
        this.passwordErrorMessage = 'Password required'
        return
      }
      this.passwordError = false
      return
    },
    formError() {
      if (this.emailError || this.email == null) {
        return true
      }
      if (this.passwordError || this.password == null) {
        return true
      }
      return false
    }
  }
})
</script>

<style scoped>
header {
  width: 100%;
  height: 48px;

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 48px;

  display: flex;
  align-items: center;

  color: #69e5f8;
}
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  width: 277px;
}
.form-input {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 5px;

  width: 277px;

  border-radius: 20px;
}
label {
  width: 277px;
  height: 22px;

  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;

  color: #ffffff;
}
input {
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  gap: 10px;

  width: 277px;
  height: 40px;

  background: #3c1635;

  border: 1px solid #69e5f8;
  border-radius: 15px;

  color: #ffffff;
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
}
.error-message {
  width: 277px;
  height: 15px;

  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;
  margin: 0;

  color: #69e5f8;
}
::placeholder {
  color: #ffffff;
  opacity: 1;
}
:-ms-input-placeholder {
  color: #ffffff;
}
::-ms-input-placeholder {
  color: #ffffff;
}
footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  width: 277px;
  height: 88px;
}
.cta-level-one {
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;

  width: 277px;
  height: 40px;

  background: #69e5f8;

  border: 1px solid #69e5f8;
  border-radius: 15px;

  color: #000000;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  text-decoration: none;
}
button:hover {
  cursor: pointer;
}
.cta-level-two {
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;

  width: 277px;
  height: 40px;

  background: #3c1635;

  border: 1px solid #69e5f8;
  border-radius: 15px;

  color: #69e5f8;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  text-decoration: none;
}
</style>
