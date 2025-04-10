import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { getInfoApi, sendToEmailApi } from '@/api/info';

export const useInfoStore = defineStore('info', () => {

  const info = reactive({});

  const getInfo = async (locale) => {
    try {
      const response = await getInfoApi(locale);
      Object.assign(info, response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const sendToEmail = async (bookingIds, email) => {
    await sendToEmailApi(bookingIds, email);
  };

  return { info, getInfo, sendToEmail };
});
