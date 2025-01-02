<template>
  <div class="flex items-center justify-center h-screen">
    <form @submit.prevent="handleSubmit" class="mx-auto max-w-sm border-none shadow-none">
    <Card class="mx-auto max-w-sm border-none shadow-none">
      <CardHeader>
        <CardTitle class="text-xl">
          Sign Up
        </CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Label for="first-name">First name</Label>
              <Input id="first-name" v-model="firstName" placeholder="Max" required />
            </div>
            <div class="grid gap-2">
              <Label for="last-name">Last name</Label>
              <Input id="last-name"  v-model="lastName"placeholder="Robinson" required />
            </div>
          </div>
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              v-model="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input id="password" v-model="password" type="password" />
          </div>
          <Button type="submit" class="w-full">
            Create an account
          </Button>
          <Button variant="outline" class="w-full">
            Sign up with GitHub
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Already have an account?
          <a href="/login" class="underline">
            Sign in
          </a>
        </div>
      </CardContent>
    </Card>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'custom'
})
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/toast/use-toast'

const { registerUser } = useAuthActions();
const { toast } = useToast();


const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');

const handleSubmit = async () => {

  const response = await registerUser({
  firstName: firstName.value,
  lastName: lastName.value,
  email: email.value,
  password: password.value,
});

  if (response && response.success) {
    toast({
      title: 'Registration Successful',
      description: response.message, 
      variant: 'default',
      duration: 2000,
    });
    navigateTo('/')
  } else {
    toast({
      title: 'Error',
      description: response?.message, 
      variant: 'destructive',
      duration: 2000,
    });
  }
}
</script>
