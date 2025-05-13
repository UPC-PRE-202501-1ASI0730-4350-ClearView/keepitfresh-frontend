<template>
  <div class="login-container">
    <h2>Login</h2>

    <div class="form-group">
      <input type="text" placeholder="Username or Email" />
    </div>

    <div class="form-group">
      <input type="password" placeholder="Password" />
    </div>

    <div class="form-options">
      <label><input type="checkbox" /> Remember me</label>
      <a href="#">Forgot your password?</a>
    </div>

    <button class="signup-btn" @click="goToProfileDetails">Sign Up</button>

    <p class="register-link">
      Don't have an account?
      <a @click.prevent="goToProfileDetails">Register</a>
    </p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToProfileDetails = () => {
  router.push('/profile-details')
}
</script>

<style scoped>
.login-container {
  max-width: 350px;
  margin: auto;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  color: white;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 0.75rem;
  border-radius: 25px;
  border: none;
  outline: none;
}

.form-options {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  color: white;
}

.signup-btn {
  width: 100%;
  padding: 0.75rem;
  background: white;
  border: none;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
}

.register-link {
  margin-top: 1rem;
  font-size: 0.9rem;
}

.register-link a {
  color: white;
  font-weight: bold;
  cursor: pointer;
}
</style>
