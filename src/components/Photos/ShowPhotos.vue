<script setup>
  // eslint-disable-next-line no-unused-vars
  const emit = defineEmits(['removePhoto']);

  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    photos: Array,
  });

  const getBlobUrl = (blob) => {
    return window.URL.createObjectURL(blob);
  };
</script>

<template>
  <div class="output">
    <div class="image-wraper" v-for="(blob, index) in photos" :key="'photo' + index">
      <el-image :src="getBlobUrl(blob)" :preview-src-list="photos" :initial-index="index" fit="contain" />
      <el-button type="danger" @click="$emit('removePhoto', index)">Remove</el-button>
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
