<script setup>
  import { usePhotosStore } from '@/stores/photos';

  const photosStore = usePhotosStore();
  const { photosBlobs, removePhoto } = photosStore;

  const getBlobUrl = (blob) => {
    return window.URL.createObjectURL(blob);
  };

  const getPhotos = () => photosBlobs.map(getBlobUrl);
</script>

<template>
  <div class="output">
    <div class="image-wraper" v-for="(blob, index) in photosBlobs" :key="'photo' + index">
      <el-image :src="getBlobUrl(blob)" :preview-src-list="getPhotos()" :initial-index="index" fit="contain" />
      <el-button type="danger" @click="removePhoto(index)">Remove</el-button>
    </div>
  </div>
</template>

<style scoped>
  .image-wraper {
      margin: 0 10px 10px;
      text-align: center;
      width: 128px;
    }
</style>
