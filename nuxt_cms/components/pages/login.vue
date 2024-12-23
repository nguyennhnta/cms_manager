<template>
  <div class="login-page">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
const email = ref('');
const password = ref('');
const error = ref<string | null>(null);
const router = useRouter();
const handleLogin = async () => {
  try {
    // const response = await axios.post('/login', {
    //   email: email.value,
    //   password: password.value,
    // });
  const response : any = await $fetch('/api/login', {
    method: 'post',
    body: {
      email: email.value,
      password: password.value,
    },
  });

    // Lưu token vào localStorage
    localStorage.setItem('token', response.data.token);

    // Chuyển hướng sau khi đăng nhập thành công
    router.push('/');
  } catch (error) {
    error = 'Email hoặc mật khẩu không đúng';
  }
};


</script>

<style scoped>
/* Your CSS styling here */
</style>
