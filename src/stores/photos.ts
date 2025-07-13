import {reactive} from 'vue';
import {defineStore} from 'pinia';
import {addPhotoApi, removePhotoApi} from '@/api/photos';
import {useBookingStore} from '@/stores/booking';

type PhotosBlobs = Record<number, Record<number, Blob>>;

export const usePhotosStore = defineStore('photos', () => {
  const photosBlobs = reactive<PhotosBlobs>({});
  const bookingStore = useBookingStore();
  const { bookings } = bookingStore;

  const addPhoto = async (orderId: number, photoBlob: File): Promise<void> => {
    const { id } = await addPhotoApi(orderId, photoBlob);
    if (!photosBlobs[orderId]) {
      photosBlobs[orderId] = {};
    }
    photosBlobs[orderId][id] = photoBlob;
  };

  const removePhoto = async (orderId: number, photoId: number): Promise<void> => {
    if (photosBlobs[orderId]) {
      delete photosBlobs[orderId][photoId];
    }
    await removePhotoApi(orderId, photoId);
  };

  const clearPhotosStore = (): void => {
    Object.keys(photosBlobs).forEach(key => {
      delete photosBlobs[Number(key)];
    });
  };

  const syncPhotos = async (): Promise<void> => {
    for (const booking of bookings) {
      if (booking.orderId == null) continue;

      photosBlobs[booking.orderId] = {};

      for (const photo of booking.photos) {
        try {
          photosBlobs[booking.orderId][photo.id] = await fetch(photo.url).then(r => r.blob());
        } catch (error) {
          console.error(`Failed to fetch photo ${photo.id} for booking ${booking.orderId}`, error);
        }
      }
    }
  };

  return { photosBlobs, addPhoto, removePhoto, clearPhotosStore, syncPhotos };
});
