<template>
    <aside class="sidebar">
      <h2>Sidebar</h2>
      <ul>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/settings">Settings</a></li>
        <li><a href="/profile">Profile</a></li>
      </ul>
    </aside>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .sidebar {
    background-color: #f4f4f4;
    padding: 1rem;
    width: 200px;
  }
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  .sidebar a {
    text-decoration: none;
    color: #333;
  }
  .sidebar a:hover {
    color: #007bff;
  }
  </style>