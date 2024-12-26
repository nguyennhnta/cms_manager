

<template>
   <div>
    <div class="flex justify-center items-center h-screen bg-blue-500 text-white">
    <h1 class="text-4xl font-bold">Hello Tailwind CSS with Nuxt.js!</h1>
    </div>
    <h1>Danh sách Bài Viết</h1>

    <div v-if="postStore.error" class="error">{{ postStore.error }}</div>

    <div v-if="postStore.loading" class="loading">Đang tải bài viết...</div>

    <ul v-if="!postStore.loading && !postStore.error">
      <li v-for="post in postStore.posts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
        <button @click="editPost(post)">Sửa</button>
        <button @click="deletePost(post.id)">Xóa</button>
      </li>
    </ul>

    <div>
      <h2>{{ isEditing ? "Sửa Bài Viết" : "Thêm Bài Viết" }}</h2>
      <form @submit.prevent="submitForm">
        <input v-model="form.title" placeholder="Tiêu đề" />
        <textarea v-model="form.content" placeholder="Nội dung"></textarea>
        <button type="submit">{{ isEditing ? "Cập Nhật" : "Thêm" }}</button>
        <button type="button" @click="resetForm">Hủy</button>
      </form>
    </div>
  </div>
</template>
  <script lang="ts" setup>
import { usePostStore } from "~/stores/posts";
import { useUserStore } from "~/stores/user";

const postStore = usePostStore();
const userStore  = useUserStore();

const isEditing = ref(false);
const form = reactive({ id: null, title: "", content: "" });

const roles = computed(() => userStore.roles);
const permissions = computed(() => userStore.permissions);


const submitForm = async () => {
  if (isEditing.value) {
    await postStore.updatePost(form);
  } else {
    await postStore.addPost({ title: form.title, content: form.content });
  }
  resetForm();
};

// Gọi action fetchPosts() khi component được load
onMounted(async () => {
  await postStore.fetchPosts();
});

const resetForm = () => {
  form.id = null;
  form.title = "";
  form.content = "";
  isEditing.value = false;
};

const editPost = (post: {id: number, title: string, content: string}) => {
  form.id = post.id;
  form.title = post.title;
  form.content = post.content;
  isEditing.value = true;
};

const deletePost = async (postId: number) => {
  await postStore.deletePost(postId);
};

</script>