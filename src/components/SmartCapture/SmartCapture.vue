<script setup>
  import { onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { defineComponents, DocumentReaderService } from '@regulaforensics/vp-frontend-document-components';

  const { locale } = useI18n({ useScope: 'global' });

  onMounted(() => {
    defineComponents().then(() => {
      window.RegulaDocumentSDK = new DocumentReaderService();

      defineComponents().then(() => window.RegulaDocumentSDK.initialize({ license: 'AAEAAACs7KdCgHH8feVhKzmnBKcL3nJ8bK708Jvj+InEi7dQNm1u7BxBdWmYCwgec6daB1wALHIDYUfwSUO3bBHYldcl8UNyoidhIpjFvwtDnn/QiuTBlFKTVD7N+xHYSjBlaK4Eh9wqfHhw2mG+uPIeFnCmxb67B/rysDaHaBldUJGK/nHGQ1xM8ddZCLLRixdqssVediCNei+7L7HVJVH8iwJKz+TRmnDGpiOxU8KRbyQbnR+wX/wI8zvYPQscBxP3t8W/6q/mKKF0WQKj3GWJ18ohVpKEBBGAOFkPs7imXNG0V4pIUpVoXpzGRVSOg4GtrBgJu5p3DdOCBbLILCTliSrkAAAAAAAAEPXPCtUxOlQvq7Nkwa4oQ01QPpf/YQnt5P0dHGWaYm14Bq2o9O8stgu0qp4yWyxoTLpz44vBah5FwBQknC1D0Ir6O8uj9jihI7EnT5O9MCxzl8okHVSGMdMpRl4VkA75LTA/j+238tLxoaBSKjAGC4S+FI8+Wst2MWTjuVBBMyuXSp+W3PapdaxwZbDVKqh0FgLv5cxll/gp0yRqdkPDp3YGk7ljGsAngUOYVEDnUVj0Yf4Fperv/Yniszx1x1PlYzCfW0uPF7zCtQJ8TOp6VFHM88It0nj46rFICX8xugLa' }));
      window.RegulaDocumentSDK.recognizerProcessParam = {
        processParam: {
          scenario: 'MrzAndLocate',
        },
      };
      window.RegulaDocumentSDK.imageProcessParam = {
        processParam: {
          scenario: 'MrzAndLocate',
        },
      };
    });
  });
</script>

<template>
  <document-reader :locale="locale"></document-reader>
</template>

<style scoped>

</style>
