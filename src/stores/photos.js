import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { addPhotoApi, removePhotoApi } from './api/photos';
import { useBookingStore } from '@/stores/booking';

export const usePhotosStore = defineStore('photos', () => {
  const photosBlobs = reactive({});
  const bookingStore = useBookingStore();
  const { booking } = bookingStore;
  
  const addPhoto = async (photoBlob) => {
    const { data } = await addPhotoApi(booking.orderId, photoBlob);
    photosBlobs[data] = photoBlob;
  };

  const removePhoto = (photoId) => {
    delete photosBlobs[photoId];
    removePhotoApi(booking.orderId, photoId);
  };

  const clearPhotosStore = () => {
    Object.keys(photosBlobs).forEach(key => {
      delete photosBlobs[key];
    });
  };

  const syncPhotos = () => {
    booking.photos.forEach( async ({ id, url }) => {
      photosBlobs[id] = await fetch(url).then(r => r.blob());
    });
  };

  return { photosBlobs, addPhoto, removePhoto, clearPhotosStore, syncPhotos };
});
