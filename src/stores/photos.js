import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { addPhotoApi, removePhotoApi } from './api/photos';

export const usePhotosStore = defineStore('photos', () => {
  const photosBlobs = reactive({});
  
  const addPhoto = async (photoBlob) => {
    const { id } = await addPhotoApi(photoBlob);
    photosBlobs[id] = photoBlob;
  };

  const removePhoto = (photoId) => {
    delete photosBlobs[photoId];
    removePhotoApi(photoId);
  };

  const clearPhotosStore = () => {
    Object.keys(photosBlobs).forEach(key => {
      delete photosBlobs[key];
    });
  };

  return { photosBlobs, addPhoto, removePhoto, clearPhotosStore };
});
