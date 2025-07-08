<script setup>
  import { ref } from 'vue';
  import { Search } from '@element-plus/icons-vue';
  import { ElMessageBox } from 'element-plus';
  import { useI18n } from 'vue-i18n';
  import { useBookingStore } from '@/stores/booking';
  import { usePhotosStore } from '@/stores/photos';
  import Results from './Results.vue';

  const { t } = useI18n();
  const store = useBookingStore();
  const { setBookings, searchBooking, setCurrentBooking } = store;
  const photosStore = usePhotosStore();
  const { syncPhotos } = photosStore;

  const query = ref();
  const data = ref([]);
  const loading = ref(false);

  const onSubmit = async () => {
    loading.value = true;
    try {
      data.value = await searchBooking(query.value);
      if (data.value.length === 1) {
        setBookings(data.value);
        syncPhotos();
      }
    } catch (error) {
      await ElMessageBox.alert(t('common.error'), 'Error', {
        confirmButtonText: 'OK',
      });
    }
    loading.value = false;
  };

  const onSelectBooking = (id) => {
    let bookings = [data.value.find(booking => booking.orderId === id)];
    let selectedBooking = bookings[0];
    if (selectedBooking.groupId) {
      bookings = data.value.filter(booking => booking.groupId);
    }
    setBookings(bookings);
    setCurrentBooking(selectedBooking);
    syncPhotos();
  };
</script>

<template>
  <el-form v-loading="loading" label-width="auto" label-position="top" @submit.prevent="onSubmit">
    <el-form-item :label="$t('search.label')">
      <el-input v-model="query" class="input">
        <template #append>
          <el-button :icon="Search" @click="onSubmit" />
        </template>
      </el-input>
    </el-form-item>
  </el-form>
  <div v-if="data.length">
    <h2>{{ $t('search.choose') }}</h2>
    <Results
      :bookings="data"
      @select-booking="onSelectBooking"
    />
  </div>
  <p v-else>{{ $t('search.restriction') }}</p>
</template>

<style scoped>
  .input {
    font-size: 16px;
  }
</style>
