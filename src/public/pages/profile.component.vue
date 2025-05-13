<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <input type="text" v-model="username" placeholder="Username or Email" required />
          <i class="icon">👤</i>
        </div>

        <div class="input-group">
          <input type="password" v-model="password" placeholder="Password" required />
          <i class="icon">🔒</i>
        </div>

        <div class="options">
          <label>
            <input type="checkbox" v-model="rememberMe" />
            Remember me
          </label>
          <a href="#" class="forgot-password">Forgot your password?</a>
        </div>

        <button type="submit" class="sign-up-btn">Sign Up</button>

        <p class="register-link">
          Don't have an account? <a href="#">Register</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const rememberMe = ref(false)

const handleLogin = () => {
  console.log('Username:', username.value)
  console.log('Password:', password.value)
  console.log('Remember Me:', rememberMe.value)
}
</script>

<style scoped>
.login-container {
  background: url('src/assets/almacen.png') no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-box {
  background: rgba(0, 0, 0, 0.6);
  padding: 40px;
  border-radius: 12px;
  width: 320px;
  color: #fff;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
}

.input-group {
  position: relative;
  margin-bottom: 20px;
}

.input-group input {
  width: 100%;
  padding: 10px 35px 10px 10px;
  border-radius: 20px;
  border: none;
  outline: none;
}

.input-group .icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  margin-bottom: 20px;
}

.options a {
  color: #ccc;
  text-decoration: none;
}

.sign-up-btn {
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  border: none;
  background: white;
  color: black;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 15px;
}

.register-link a {
  color: white;
  text-decoration: underline;
}
</style>
