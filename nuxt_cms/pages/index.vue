

<template>
    <div><h1>Danh sách Bài Viết</h1>

    <!-- Hiển thị thông báo lỗi nếu có -->
    <div v-if="postStore.error" class="error">
      {{ postStore.error }}
    </div>

    <!-- Hiển thị trạng thái loading -->
    <div v-if="postStore.loading" class="loading">
      Đang tải bài viết...
    </div>

    <!-- Hiển thị danh sách bài viết -->
    <ul v-if="!postStore.loading && !postStore.error">
      <li v-for="post in postStore.posts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
      </li>
    </ul></div>
</template>
  <script lang="ts" setup>
  import { usePostStore } from '~/stores/posts'; // Đảm bảo import đúng store

const postStore = usePostStore(); // Lấy store để truy cập dữ liệu

// Gọi action fetchPosts() khi component được load
  onMounted(async () => {
    await postStore.fetchPosts();
  });
  </script>