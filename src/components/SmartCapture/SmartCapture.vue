<script setup>
  import { defineComponents, DocumentReaderService } from '@regulaforensics/vp-frontend-document-components';
  import {ref} from "vue";


  const RegulaDocumentSDK = new DocumentReaderService();
  const currentLocale = ref();
  currentLocale.value = i18n.locacle;

  RegulaDocumentSDK.recognizerProcessParam = {
    processParam: {
      scenario: 'MrzAndLocate',
    },
  };

  RegulaDocumentSDK.imageProcessParam = {
    processParam: {
      scenario: 'MrzAndLocate',
    },
  };

  // Удалить в продакшн
  defineComponents().then(() => window.RegulaDocumentSDK.initialize({ license: '<BASE64_LICENSE_KEY>' }));

</script>

<template>
  <document-reader :locale="currentLocale"></document-reader>
</template>

<style scoped>

</style>
