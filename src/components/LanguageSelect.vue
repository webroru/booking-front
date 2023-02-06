<script setup>
  import 'flag-icons/css/flag-icons.min.css';
  import { useI18n } from 'vue-i18n';
  import ISO6391 from 'iso-639-1';

  const { availableLocales, locale } = useI18n({ useScope: 'global' });
  const changeLanguage = language => locale.value = language;
</script>

<template>
  <ul>
    <li v-for="locale in availableLocales" :key="locale">
      <a href="#" @click="changeLanguage(locale)">
        <span :class="`fi fi-${locale === 'en' ? 'gb' : locale}`"></span>
        <p>{{ ISO6391.getName(locale) }}</p>
      </a>
    </li>
  </ul>
</template>

<style scoped>
  a {
    color: #666;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    text-decoration: none;
  }

  ul {
    display: flex;
    height: 10vh;
    justify-content: space-evenly;
  }

  li {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    list-style: none;
    margin: 0 10px;
    text-align: center;
  }

  p {
    margin: 5px 0 0;
  }

  .fi {
    height: 100%;
    width: 100%;
  }
</style>
