import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { getInfoApi } from './api/info';

export const useInfoStore = defineStore('info', () => {

  const info = reactive({});

  const setInfo = (newInfo) => {
    Object.assign(info, newInfo);
  };

  const getInfo = async () => {
    const info = await getInfoApi();
    setInfo(info.data);
  };

  return { info, getInfo };
});
