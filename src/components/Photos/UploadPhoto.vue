<script setup>
  import { ref } from 'vue';
  import { usePhotosStore } from '@/stores/photos';

  const photosStore = usePhotosStore();
  const { addPhoto } = photosStore;

  const uploadRef = ref();

  const uploadPhoto = () => {
    uploadRef.value.click();
  };

  const handleUpload = (event) => {
    Array.from(event.target.files).forEach(file => {
      console.log(file);
      addPhoto(file);
    });
  };
</script>

<template>
  <input
    ref="uploadRef"
    type="file"
    @change="handleUpload"
    style="display: none"
    multiple
    accept="image/*"
  />
  <el-button type="primary" @click="uploadPhoto">Upload</el-button>
</template>
