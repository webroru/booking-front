<script setup>
  import 'flag-icons/css/flag-icons.min.css';
  import { useI18n } from 'vue-i18n';
  import ISO6391 from 'iso-639-1';
  import { useInfoStore } from '@/stores/info';

  const infoStore = useInfoStore();
  const { getInfo } = infoStore;
  const { availableLocales, locale } = useI18n({ useScope: 'global' });
  const changeLanguage = (language) => {
    locale.value = language;
    getInfo(language);
  };
</script>

<template>
  <el-scrollbar always>
    <div class="flags">
      <div class="flag" v-for="locale in availableLocales" :key="locale">
        <a href="#" @click.prevent="changeLanguage(locale)">
          <span :class="`fi fi-${locale === 'en' ? 'gb' : locale === 'sl' ? 'si' : locale === 'zh' ? 'cn' : locale}`"></span>
          <p>{{ ISO6391.getName(locale) }}</p>
        </a>
      </div>
    </div>
  </el-scrollbar>
</template>

<style scoped>
  a {
    color: #666;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    text-decoration: none;
  }

  .flags {
    display: flex;
    justify-content: space-evenly;
  }

  .flag {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
  }

  p {
    margin: 5px 0 0;
  }

  .fi {
    height: 100%;
    width: 100%;
  }
</style>
