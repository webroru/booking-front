import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { addPhotoApi, removePhotoApi } from '@/api/photos';
import { useBookingStore } from '@/stores/booking';

export const usePhotosStore = defineStore('photos', () => {
  const photosBlobs = reactive({});
  const bookingStore = useBookingStore();
  const { bookings } = bookingStore;

  const addPhoto = async (orderId, photoBlob) => {
    const { data } = await addPhotoApi(orderId, photoBlob);
    photosBlobs[orderId][data] = photoBlob;
  };

  const removePhoto = async (orderId, photoId) => {
    delete photosBlobs[orderId][photoId];
    await removePhotoApi(orderId, photoId);
  };

  const clearPhotosStore = () => {
    Object.keys(photosBlobs).forEach(key => {
      delete photosBlobs[key];
    });
  };

  const syncPhotos = () => {
    bookings.forEach(booking => {
      photosBlobs[booking.orderId] = {};
      booking.photos.forEach(async ({ id, url }) => {
        photosBlobs[booking.orderId][id] = await fetch(url).then(r => r.blob());
      });
    });
  };

  return { photosBlobs, addPhoto, removePhoto, clearPhotosStore, syncPhotos };
});
