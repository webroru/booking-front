<script setup>
  import { onMounted, ref, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { defineComponents, DocumentReaderService, ErrorTypes } from '@regulaforensics/vp-frontend-document-components';
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
        nationality: countryToAlpha2(getValueFromFieldList(fieldList, 'Nationality')),
        dateOfBirth: getValueFromFieldList(fieldList, 'Date of Birth'),
        documentType: getValueFromFieldList(fieldList, 'Document Class Code') === 'P' ? 'PASSPORT' : 'ID',
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
      await window.RegulaDocumentSDK.initialize({ license: 'AAEAAA6b0qhEAKl3mXU6My41GU8ma9KFMyn+JYK+Z+M0CHWrd8yXrkjpW/bAzQC+tc8WWSyC6q/erl91ue8Yvr83Qgcq1M0etGZObTG16O2TgsLcV/YZa+j+DffGpI9FETQYK/RayniAAQ9t+qEJnw23N0qHXz3NjzZZnDwMH2aCXux+Gte5QID+06jmm6VQWP7QhMbq7Y5X62wB1pVyomzBeO/9CBDTOAJBz/9o1uAHYItPY1a3E8R3NJhYiPi9FTIycIWBAqBh6Nt6dDgmVYdBt99TrNU+3+qmsJNPBDsFQr4ubJJGTZnXuqpdLTfRLaxa/NliFy+uzo8d4/GpCCbIA8zkAAAAAAAAELUgEXSaO4XvYL3XaBlXi55yUZqcJHTYHkzu5lmKatMV6Ryun270DkBlORYsMtYitWNiFhsUPhGf8PkfYeC7PwU6VVwjshhaeRhbwE0oFOS+XsJ8Qv4QJFD19pV7nc0iBNnt6Ok1erduyQ9H4BHI2rVaVVq0VtJeoEce3HogU5p3XASdDCu1XVUoneVAbXF4oI4kAaFY+kIjJin/UNUOGSq5jbBKziRtGha64GrTch+IdofbTWdavxdd7WeL3eAzx5DLM0IYptJvGO9xAD1+ulFA3q178JkJBMY24W0sB03a' });
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
