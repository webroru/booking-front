<script setup>
  import { ref } from 'vue';
  import { usePhotosStore } from '@/stores/photos';

  const props = defineProps({ orderId: Number });
  const emit = defineEmits(['photo-added']);

  const photosStore = usePhotosStore();
  const { addPhoto } = photosStore;

  const uploadRef = ref();

  const uploadPhoto = () => {
    uploadRef.value.click();
  };

  const handleUpload = (event) => {
    Array.from(event.target.files).forEach(file => {
      addPhoto(props.orderId, file);
    });
    emit('photo-added');
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
  <el-button type="primary" @click="uploadPhoto">{{ $t('photos.upload') }}</el-button>
</template>
