<script setup>
  import { ref } from 'vue';
  import { Search } from '@element-plus/icons-vue';
  import { ElMessageBox } from 'element-plus';
  import Result from './Result.vue';
  import config from '@/config';

  const query = ref();
  const data = ref([]);
  const loading = ref(false);

  const onSubmit = async () => {
    data.value = await fetchData(`${config.apiUrl}/api/booking?search=${query.value}`);
  };

  const showError = () => {
    ElMessageBox.alert('An error occurred please contact support', 'Error', {
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
    <el-form-item label="Enter the surname who has created the booking or order number">
      <el-input v-model="query">
        <template #append>
          <el-button :icon="Search" @click="onSubmit" />
        </template>
      </el-input>
    </el-form-item>
  </el-form>
  <div v-if="data.length">
    <h2>Choose your Booking</h2>
    <Result
      v-for="item in data"
      :key="item.orderId"
      :booking="item"
    />
  </div>
  <p v-else>Registration is open 4 days before check-in only</p>
</template>
