<script setup>
  import { ref, reactive, computed } from 'vue';
  import { ElMessageBox } from 'element-plus';
  import Upload from './Upload.vue';
  import MakePhoto from './MakePhoto.vue';

  const showTaxNotification = ref(false);
  const showMakePhoto = ref(false);

  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    booking: Object,
  });

  const form = reactive({
    adults: 0,
    children: 0,
    babies: 0,
  });

  const tax = {
    adult: 3.13,
    children: 1.57,
    baby: 0,
  };

  const totalTax = computed(() => form.adults * tax.adult + form.children * tax.children + form.babies * tax.baby);
  const totalGuests = computed(() => form.adults + form.children + form.babies);

  const prepareToSubmit = () => {
    if (props.booking.guestsAmount !== totalGuests.value) {
      showTaxNotification.value = true;
      return;
    }
    submitForm();
  }

  const submitForm = () => {
    console.log('submit!');
  }

  const handleClose = () => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
      .then(() => {
        submitForm();
      });
  }
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="16">
      <el-form :model="form" label-width="50%">
        <el-form-item label="Enter amount of Addults (18 years and older)">
          <el-input-number v-model="form.adults" :min="0" :max="10" />
        </el-form-item>
        <el-form-item label="Enter amount of Children (from 7 years up to 18 years)">
          <el-input-number v-model="form.children" :min="0" :max="10" />
        </el-form-item>
        <el-form-item label="Enter amount of Children (7 years and younger)">
          <el-input-number v-model="form.babies" :min="0" :max="10" />
        </el-form-item>
        <el-form-item>
          <Upload />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="prepareToSubmit">Submit</el-button>
          <el-button @click="resetForm(formRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="8">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>The city tax for a person per night</span>
          </div>
        </template>
        <div class="text item">18 years and older: {{ tax.adult }} &euro;</div>
        <div class="text item">from 7 years to 18 years: {{ tax.children }} &euro;</div>
        <div class="text item">6 years and younger: {{ tax.baby }} &euro;</div>
        <div class="bottom">
          Total Tax: {{ totalTax }} &euro;
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-row>
  </el-row>
  <el-dialog v-model="showTaxNotification" title="Tips" width="30%" :before-close="handleClose">
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showTaxNotification = false">Cancel</el-button>
        <el-button type="primary" @click="showTaxNotification = false">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="showMakePhoto" title="Tips" width="30%" :before-close="handleClose">
    <MakePhoto />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showMakePhoto = false">Cancel</el-button>
        <el-button type="primary" @click="showMakePhoto = false">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
    .text {
      font-size: 14px;
    }
  
    .item {
      margin-bottom: 18px;
    }

    .bottom {
      font-weight: bold;
    }
</style>