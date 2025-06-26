<script setup>
  import { ref } from 'vue';
  import 'flag-icons/css/flag-icons.min.css';
  import { useI18n } from 'vue-i18n';
  import ISO6391 from 'iso-639-1';
  import { useInfoStore } from '@/stores/info';

  const infoStore = useInfoStore();
  const { getInfo } = infoStore;
  const { availableLocales, locale } = useI18n({ useScope: 'global' });
  const value = ref('en');

  const faClass = (locale) => {
    return `fi fi-${locale === 'en' ? 'gb' : locale === 'sl' ? 'si' : locale === 'zh' ? 'cn' : locale}`;
  };

  const changeLanguage = (language) => {
    locale.value = language;
    getInfo(language);
  };
</script>

<template>
  <el-select v-model="value" @change="changeLanguage" style="width: 80px">
    <template #label="{ value }">
      <div class="flex items-center">
        <span class="container">
          <span :class="faClass(value)"></span>
        </span>
      </div>
    </template>
    <el-option
        v-for="locale in availableLocales"
        :key="locale"
        :label="locale"
        :value="locale"
    >
      <div class="flex items-center">
        <span class="container">
          <span :class="faClass(locale)"></span>
        </span>
        <span>{{ ISO6391.getName(locale) }}</span>
      </div>
    </el-option>
  </el-select>
</template>

<style scoped>
  .container {
    background: var(--el-color-primary-light-9);
    border-radius: 4px;
    margin-right: 8px;
    padding: 4px;
  }
</style>
