<script setup>
  import { onMounted, ref, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { defineComponents, DocumentReaderService } from '@regulaforensics/vp-frontend-document-components';

  const { locale } = useI18n({ useScope: 'global' });
  const emit = defineEmits(['recognize']);
  const readerVisible = ref(true);

  const reinitReader = async () => {
    readerVisible.value = false;
    await nextTick();
    readerVisible.value = true;
  };

  const listener = (event) => {
    if (event.detail.action === 'PROCESS_FINISHED' && event.detail.data.status === 1 && event.detail.data.response.text !== undefined) {
      const fieldList = event.detail.data.response.text.fieldList;

      const data = {
        gender: getValueFromFieldList(fieldList, 'Sex'),
        firstName: getValueFromFieldList(fieldList, 'Given Names'),
        lastName: getValueFromFieldList(fieldList, 'Surname'),
        nationality: getValueFromFieldList(fieldList, 'Nationality'),
        dateOfBirth: getValueFromFieldList(fieldList, 'Date of Birth'),
        documentType: getValueFromFieldList(fieldList, 'Document Class Code'),
        documentNumber: getValueFromFieldList(fieldList, 'Document Number'),
      };
      reinitReader();
      emit('recognize', data);
    }
  };

  const getValueFromFieldList = (fieldList, fieldName) => {
    return fieldList.find(item => item.fieldName === fieldName)?.value;
  };

  onMounted(() => {
    window.RegulaDocumentSDK = new DocumentReaderService();
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
    defineComponents().then(() => window.RegulaDocumentSDK.initialize({ license: 'AAEAAACs7KdCgHH8feVhKzmnBKcL3nJ8bK708Jvj+InEi7dQNm1u7BxBdWmYCwgec6daB1wALHIDYUfwSUO3bBHYldcl8UNyoidhIpjFvwtDnn/QiuTBlFKTVD7N+xHYSjBlaK4Eh9wqfHhw2mG+uPIeFnCmxb67B/rysDaHaBldUJGK/nHGQ1xM8ddZCLLRixdqssVediCNei+7L7HVJVH8iwJKz+TRmnDGpiOxU8KRbyQbnR+wX/wI8zvYPQscBxP3t8W/6q/mKKF0WQKj3GWJ18ohVpKEBBGAOFkPs7imXNG0V4pIUpVoXpzGRVSOg4GtrBgJu5p3DdOCBbLILCTliSrkAAAAAAAAEPXPCtUxOlQvq7Nkwa4oQ01QPpf/YQnt5P0dHGWaYm14Bq2o9O8stgu0qp4yWyxoTLpz44vBah5FwBQknC1D0Ir6O8uj9jihI7EnT5O9MCxzl8okHVSGMdMpRl4VkA75LTA/j+238tLxoaBSKjAGC4S+FI8+Wst2MWTjuVBBMyuXSp+W3PapdaxwZbDVKqh0FgLv5cxll/gp0yRqdkPDp3YGk7ljGsAngUOYVEDnUVj0Yf4Fperv/Yniszx1x1PlYzCfW0uPF7zCtQJ8TOp6VFHM88It0nj46rFICX8xugLa' }));
  });
</script>

<template>
  <document-reader
      v-if="readerVisible"
      @document-reader="listener"
      :locale="locale"
      close-button="false"
      capture-button="false"
      copyright="false"
      multipage-processing="true"
      start-screen="true"
      finish-screen="false"
  />
</template>
