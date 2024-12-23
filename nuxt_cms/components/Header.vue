<template>
  <header class="header">
    <h1>My App</h1>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
</script>

<style scoped>
.header {
  background-color: #333;
  color: #fff;
  padding: 1rem;
}
.header nav ul {
  list-style: none;
  display: flex;
  gap: 1rem;
}
.header nav a {
  color: #fff;
  text-decoration: none;
}
.header nav a:hover {
  text-decoration: underline;
}
</style>