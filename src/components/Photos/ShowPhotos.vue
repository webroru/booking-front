<script setup>
  import { computed } from 'vue';
  import { usePhotosStore } from '@/stores/photos';

  const photosStore = usePhotosStore();
  const { photosBlobs, removePhoto } = photosStore;

  const getBlobUrl = (blob) => window.URL.createObjectURL(blob);
  const getIdByIndex = (index) => Object.keys(photosBlobs)[index];
  const photos = computed(() => Object.values(photosBlobs).map(getBlobUrl));
</script>

<template>
  <div class="output">
    <div class="image-wraper" v-for="(img, index) in photos" :key="'photo' + index">
      <el-image :src="img" :preview-src-list="photos" :initial-index="index" fit="contain" />
      <el-button type="danger" @click="removePhoto(getIdByIndex(index))">{{ $t('photos.takePhoto') }}</el-button>
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
