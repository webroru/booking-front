<script setup>
  import { onMounted, ref, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { defineComponents, DocumentReaderService } from '@regulaforensics/vp-frontend-document-components';
  import { countryToAlpha2 } from 'country-to-iso';

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

    if (event.detail.data.status === 1 && event.detail.data.response.text !== undefined) {
      emit('recognize', getDateFromFieldList(event.detail.data.response.text.fieldList));
    } else {
      emit('error');
    }
    reinitReader();
  };

  const getValueFromFieldList = (fieldList, fieldName) => {
    return fieldList.find(item => item.fieldName === fieldName)?.value;
  };

  const recognizeListener = (response) => {
    const hasMrzPosition = Array.isArray(response?.lowLvlResponse?.ContainerList?.List) &&
        response.lowLvlResponse.ContainerList.List.some(
            item => item?.MrzPosition !== undefined
        );

    if (hasMrzPosition) {
      emit('recognize', getDateFromFieldList(response.text.fieldList));
      reinitReader();
    }
  };

  const getDateFromFieldList = (fieldList) => {
    const dateOfBirth = getValueFromFieldList(fieldList, 'Date of Birth');
    return {
      gender: getValueFromFieldList(fieldList, 'Sex'),
      firstName: getValueFromFieldList(fieldList, 'Given Names'),
      lastName: getValueFromFieldList(fieldList, 'Surname'),
      nationality: countryToAlpha2(getValueFromFieldList(fieldList, 'Nationality')),
      dateOfBirth: /^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth) ? dateOfBirth : undefined,
      documentType: getValueFromFieldList(fieldList, 'Document Class Code') === 'P' ? 'PASSPORT' : 'ID',
      documentNumber: getValueFromFieldList(fieldList, 'Document Number'),
    };
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
      window.RegulaDocumentSDK.recognizeListener = recognizeListener;

      await defineComponents();
      await window.RegulaDocumentSDK.initialize();
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
