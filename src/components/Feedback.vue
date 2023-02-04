<script setup>
  import { reactive } from 'vue';
  import { ElMessage } from 'element-plus';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const form = reactive({
    message: '',
  });

  const onSubmit = () => {
    fetchData(form.value);
    ElMessage({
      message: t('feedback.sent'),
      type: 'success',
    });
  };

  const fetchData = async (data) => {
    const url = 'https://run.mocky.io/v3/6f22b652-258e-4388-827e-98e0ad85565e';

    let json = [];

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(data),
      });
      json = await response.json();
    } catch (err) {
      console.log(err);
    }

    return json;
  };
</script>

<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="Message" required>
      <el-input v-model="form.message" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Send</el-button>
    </el-form-item>
  </el-form>
</template>
