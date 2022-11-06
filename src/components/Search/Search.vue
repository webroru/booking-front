<script setup>
  import { ref } from 'vue';
  import { Search } from '@element-plus/icons-vue';
  import { ElMessageBox } from 'element-plus';
  import Result from './Result.vue';
  import config from '@/config';

  const query = ref();
  const data = ref(null);
  const loading = ref(false);

  const onSubmit = async () => {
    let queryIsOrderNumber = /[0-9]+/.test(query.value);
    let url = queryIsOrderNumber ?
      `${config.apiUrl}//api/booking?originalReferer=${query.value}` :
      `${config.apiUrl}//api/booking?surame=${query.value}`;
    data.value = await fetchData(url);
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
  <div v-if="data">
    <h2>Choose your Booking</h2>
    <Result
      v-for="item in data"
      :key="item.orderId"
      :booking="item"
    />
  </div>
</template>
