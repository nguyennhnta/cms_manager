<template>
  <div class="w-full lg:grid  lg:grid-cols-2 lg:h-screen xl:h-screen md:h-screen">
    <div class="flex items-center justify-center h-screen h-screen">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">
            Login
          </h1>
          <p class="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
             v-model="user.email"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <a
                href="/forgot-password"
                class="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input v-model="user.password"  id="password" type="password" required />
          </div>
          <Button  @click.prevent="login" type="submit" class="w-full">
            Login
          </Button>
          <Button variant="outline" class="w-full" @click="loginWithGoogle">
            Login with Google
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <a href="/signup" class="underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
    <div class="hidden bg-muted lg:block">
      <img
        src="/logo.jpg"
        alt="Image"
        width="1920"
        height="1080"
        class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: 'custom'
})
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useAuthStore } from '~/stores/auth';

const { authenticateUser, authenticateUserGoogle } = useAuthActions(); // use auth store

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive

const user = ref<{email: string, password : string}>({
  email: 'nguyennhdn@gmail.com',
  password: 'admin123',
});
const router = useRouter();

const login = async () => {
  await authenticateUser(user.value);
  // redirect to homepage if user is authenticated
  if (authenticated) {
    router.push('/');
  }
};

const loginWithGoogle = async () => {
  try {
    await authenticateUserGoogle();
  } catch (error) {
    console.error('Error fetching Google login URL:', error);
  }
};
</script>
<style lang="scss">
.title {
  display: flex;
  justify-content: center;
}
.container {
  padding: 16px;
}
.form {
  border: 3px solid #f1f1f1;
  border-radius: 10px;
  .input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  .button {
    background-color: #04aa6d;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
  }

  .button:hover {
    opacity: 0.8;
  }
  .cancelbtn {
    width: auto;
    padding: 10px 18px;
    background-color: #f44336;
  }

  span.psw {
    float: right;
    padding-top: 16px;
  }

  /* Change styles for span and cancel button on extra small screens */
  @media screen and (max-width: 300px) {
    span.psw {
      display: block;
      float: none;
    }
    .cancelbtn {
      width: 100%;
    }
  }
}
</style>