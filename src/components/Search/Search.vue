<script setup>
  import { ref } from 'vue';
  import { Search } from '@element-plus/icons-vue';
  import { ElMessageBox } from 'element-plus';
  import { useI18n } from 'vue-i18n';
  import { useBookingStore } from '@/stores/booking';
  import { usePhotosStore } from '@/stores/photos';
  import Result from './Result.vue';
  import config from '@/config';

  const { t } = useI18n();
  const store = useBookingStore();
  const { setBooking } = store;
  const photosStore = usePhotosStore();
  const { syncPhotos } = photosStore;

  const query = ref();
  const data = ref([]);
  const loading = ref(false);

  const onSubmit = async () => {
    data.value = await fetchData(`${config.apiUrl}/api/booking?searchString=${query.value}`);
    if (data.value.length === 1) {
      setBooking(data.value[0]);
      syncPhotos();
    }
  };

  const showError = () => {
    ElMessageBox.alert(t('common.error'), 'Error', {
      confirmButtonText: 'OK',
    });
  };

  const fetchData = async (url) => {
    loading.value = true;
    let json = [];

    try {
      const response = await fetch(url, {
        method: 'get',
        headers: {
          'content-type': 'application/json'
        }
      });
      json = await response.json();
    } catch (err) {
      showError();
    }

    loading.value = false;
    return json.data;
  };
</script>

<template>
  <el-form v-loading="loading" label-width="auto" label-position="top" @submit.prevent="onSubmit">
    <el-form-item :label="$t('search.label')">
      <el-input v-model="query">
        <template #append>
          <el-button :icon="Search" @click="onSubmit" />
        </template>
      </el-input>
    </el-form-item>
  </el-form>
  <div v-if="data.length">
    <h2>{{ $t('search.choose') }}</h2>
    <Result
      v-for="item in data"
      :key="item.orderId"
      :booking="item"
    />
  </div>
  <p v-else>{{ $t('search.restriction') }}</p>
</template>
