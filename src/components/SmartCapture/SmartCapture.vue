<script setup>
  import { onMounted, ref, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { defineComponents, DocumentReaderService, ErrorTypes } from '@regulaforensics/vp-frontend-document-components';

  const { locale } = useI18n({ useScope: 'global' });
  const emit = defineEmits(['recognize', 'error']);
  const readerVisible = ref(true);

  const reinitReader = async () => {
    readerVisible.value = false;
    await nextTick();
    readerVisible.value = true;
  };

  const listener = (event) => {
    if (event.detail.action !== 'PROCESS_FINISHED') {
      return;
    }

    const errors = [
      ErrorTypes.WASM_ERROR,
      ErrorTypes.WASM_LICENSE,
      ErrorTypes.FILE_SIZE,
      ErrorTypes.UNKNOWN_ERROR,
      ErrorTypes.NO_CAMERA,
      ErrorTypes.INCORRECT_CAMERA_ID,
      ErrorTypes.CONNECTION_ERROR,
      ErrorTypes.HTTP_NOT_SUPPORTED,
      ErrorTypes.INSECURE_PAGE_CONTEXT,
      ErrorTypes.BAD_CONFIGURATION,
    ];

    if (event.detail.data.status === 1 && event.detail.data.response.text !== undefined) {
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
      emit('recognize', data);
    } else if (event.detail.data.status === 0 && errors.includes(event.detail.data.reason)) {
      emit('error', 'fatal');
    } else {
      emit('error');
    }
    reinitReader();
  };

  const getValueFromFieldList = (fieldList, fieldName) => {
    return fieldList.find(item => item.fieldName === fieldName)?.value;
  };

  onMounted(async () => {
    try {
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

      await defineComponents();
      await window.RegulaDocumentSDK.initialize({ license: 'AAEAADbnc1dn7ZtGBQ/t6MF+wSnPX2EILZ+QI+UbCMv4UPNpSAcI7aQfXVL9L4QIFPKWKwhqE4TtoP8NDdrz+btmWHkvVHwK3kbOxOYiyvhhhejmzo03XDuO7a0pkdIt7C2K5NDBarRPXyrkZt80noJkWvMe6F0xrPghrpy0HjilbRjK2yxDPORBAhYJQUYTQjN/etD9DhEIGV7NY56lTuifM0FaqyryV9c+mABYlCXNMblN3I+KI2hZNq6KkEcLKlgOtR4PnKTxNp2vBY9WLepUf+DyOO1qg5oVvrrg7jwhhl1eIO/9mXBNmqC9WEKyUbfsLtkTePB/codLq42Ltsq7HHnkAAAAAAAAEMQNhQQDLCnzP7jpFGeLoN4+XnfwFXV8R5I3INybH/s7wMnfZ6FGtD7fgVXv1EnA6mTrco5+b4M/U2Zkl07XIwv81Aef63CVVWdzjF+myhTWmBrnI1WwZZNTYDfdLBRIVTEVpflqG6bWxt0SLbgCelLc6IsL60P65KBLIGTbITPX12FMOEndfxnM/mCUbPAAeFxSX5d13PyKQPTaqVmUCIBKOHQaaMwUjF+0yIGK7hlQqhwBo0hxuwKEN4R4BldpW41QxoteMacI68BN21g/93YyYmLQUdygCyI0pEoQdquY' });
    } catch (error) {
      console.error('Error initializing RegulaDocumentSDK:', error);
      emit('error', 'fatal');
    }
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
