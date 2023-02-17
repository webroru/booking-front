import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { getInfoApi, sendToEmailApi } from './api/info';

export const useInfoStore = defineStore('info', () => {

  const info = reactive({});

  const setInfo = (newInfo) => {
    Object.assign(info, newInfo);
  };

  const getInfo = async (locale) => {
    const info = await getInfoApi(locale);
    setInfo(info.data);
  };

  const sendToEmail = (booking, email) => {
    sendToEmailApi(booking, email);
  };

  return { info, getInfo, sendToEmail };
});
