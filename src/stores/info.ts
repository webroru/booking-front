import { defineStore } from 'pinia';
import { reactive } from 'vue';
import type { Info } from '@/interfaces/info.ts';
import { getInfoApi, sendToEmailApi } from '@/api/info';

export const useInfoStore = defineStore('info', () => {
  const info = reactive<Info>({} as Info);

  const getInfo = async (locale: string): Promise<void> => {
    try {
      const response = await getInfoApi(locale);
      Object.assign(info, response);
    } catch (err: unknown) {
      console.error(err);
    }
  };

  const sendToEmail = async (bookingIds: string[], email: string): Promise<void> => {
    await sendToEmailApi(bookingIds, email);
  };

  return { info, getInfo, sendToEmail };
});
