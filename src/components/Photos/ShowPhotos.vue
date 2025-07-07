<script setup>
  import { ref } from 'vue';
  import { computed } from 'vue';
  import { usePhotosStore } from '@/stores/photos';

  const photosStore = usePhotosStore();
  const { photosBlobs, removePhoto } = photosStore;
  const loading = ref(false);

  const props = defineProps({
    orderId: Number,
  });

  const emit = defineEmits(['photos-removed']);

  const remove = async (index) => {
    loading.value = true;
    await removePhoto(props.orderId, getIdByIndex(index));
    loading.value = false;
    if (photosBlobs.length === 0) {
      emit('photos-removed');
    }
  };
  const getBlobUrl = (blob) => window.URL.createObjectURL(blob);
  const getIdByIndex = (index) => Object.keys(photosBlobs[props.orderId])[index];
  const photos = computed(() => Object.values(photosBlobs[props.orderId]).map(getBlobUrl));
</script>

<template>
  <div class="output" v-loading="loading">
    <div class="image-wraper" v-for="(img, index) in photos" :key="'photo' + index">
      <el-image :src="img" :preview-src-list="photos" :initial-index="index" fit="contain" />
      <el-button type="danger" @click="remove(index)">{{ $t('photos.remove') }}</el-button>
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
