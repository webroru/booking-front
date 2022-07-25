<script setup>
  import { ref } from 'vue';
  import { Search } from '@element-plus/icons-vue';
  import { ElMessageBox } from 'element-plus';
  import Result from './Result.vue';

  const query = ref();
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);
  // eslint-disable-next-line no-unused-vars
  const emit = defineEmits(['selectBooking'])

  const onSubmit = () => {
    let queryIsOrderNumber = /[0-9]+/.test(query.value);
    let url = queryIsOrderNumber ?
      'https://jsonblob.com/api/jsonBlob/1000746296369496064' :
      'https://jsonblob.com/api/jsonBlob/1000746296369496064';
    fetchData(url);
  };

  const showError = () => {
    ElMessageBox.alert('An error occurred please contact support', 'Error', {
      confirmButtonText: 'OK',
    });
  };

  function fetchData(url) {
    loading.value = true;

    return fetch(url, {
      method: 'get',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          const error = new Error(res.statusText);
          error.json = res.json();
          throw error;
        }

        return res.json();
      })
      .then(json => {
        data.value = json.data;
      })
      .catch(err => {
        error.value = err;
        if (err.json) {
          return err.json.then(json => {
            error.value.message = json.message;
          });
        }
        showError();
      })
      .then(() => {
        loading.value = false;
      });
  }
</script>

<template>
  <el-form v-loading="loading" label-width="auto" label-position="top" @submit.prevent="onSubmit">
    <el-form-item label="Enter the name who has created the booking or order number">
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
      @select-booking="$emit('selectBooking', $event)"
    />
  </div>
</template>
