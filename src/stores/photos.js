import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePhotosStore = defineStore('photos', () => {

  /** @type {Blob[]} */
  const photosBlobs = ref([]);
  
  const addPhoto = (photoBlob) => {
    photosBlobs.value.push(photoBlob);
  };

  const removePhoto = (index) => {
    photosBlobs.value.splice(index, 1);
  };

  const clearPhotos = () => {
    photosBlobs.value = [];
  };

  return { photosBlobs, addPhoto, removePhoto, clearPhotos };
});
