<script setup>
  import { computed, reactive, ref, watch, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { InfoFilled } from '@element-plus/icons-vue';
  import iso from 'iso-3166-1';
  import MakePhoto from '@/components/Photos/MakePhoto.vue';
  import ShowPhotos from '@/components/Photos/ShowPhotos.vue';
  import UploadPhoto from '@/components/Photos/UploadPhoto.vue';

  const { t } = useI18n();
  const emit = defineEmits(['submit']);
  const props = defineProps({
    id: Number,
    guest: Object,
    checkInDate: String,
    checkOutDate: String,
  });

  const formRef = ref(null);
  const isMobile = ref(false);
  const showMakePhoto = ref(false);
  const isCameraEnabled = ref(false);
  const hasExemptionPhoto = ref(false);
  const localGuest = reactive({ ...props.guest });
  localGuest.cityTaxExemption = 0;
  localGuest.checkOutDate = props.checkOutDate || '';
  localGuest.checkOutTime = '11:00';
  const cityTaxExemptionOptions = [
    { value: 0, label: t('guest.cityTaxExemptionOptions.0') },
    { value: 1, label: t('guest.cityTaxExemptionOptions.1') },
    { value: 2, label: t('guest.cityTaxExemptionOptions.2') },
    { value: 3, label: t('guest.cityTaxExemptionOptions.3') },
    { value: 4, label: t('guest.cityTaxExemptionOptions.4') },
    { value: 5, label: t('guest.cityTaxExemptionOptions.5') },
    { value: 7, label: t('guest.cityTaxExemptionOptions.7') },
    { value: 8, label: t('guest.cityTaxExemptionOptions.8') },
    { value: 10, label: t('guest.cityTaxExemptionOptions.10') },
    { value: 11, label: t('guest.cityTaxExemptionOptions.11') },
    { value: 12, label: t('guest.cityTaxExemptionOptions.12') },
    { value: 14, label: t('guest.cityTaxExemptionOptions.14') },
    { value: 15, label: t('guest.cityTaxExemptionOptions.15') },
    { value: 16, label: t('guest.cityTaxExemptionOptions.16') },
    { value: 17, label: t('guest.cityTaxExemptionOptions.17') },
    { value: 18, label: t('guest.cityTaxExemptionOptions.18') },
    { value: 19, label: t('guest.cityTaxExemptionOptions.19') },
  ];

  const latinOnlyValidator = (rule, value, callback) => {
    if (!value || /^[a-zA-Z\s]+$/.test(value)) {
      callback();
    } else {
      callback(new Error(t('guest.validation.latinOnly')));
    }
  };

  const checkOutDateValidator = (rule, value, callback) => {
    if (!value || new Date(`${localGuest.checkOutDate}T${localGuest.checkOutTime}:00`) <= new Date(`${props.checkOutDate}T11:00:00`)) {
      callback();
    } else {
      callback(new Error(t('guest.validation.checkOutDate', { date: props.checkOutDate })));
    }
  };

  const rules = {
    firstName: [
      { required: true, message: t('guest.validation.required', { field: t('guest.firstName') }), trigger: 'blur' },
      { validator: latinOnlyValidator, trigger: 'blur' },
    ],
    lastName: [
      { required: true, message: t('guest.validation.required', { field: t('guest.lastName') }), trigger: 'blur' },
      { validator: latinOnlyValidator, trigger: 'blur' },
    ],
    dateOfBirth: [{ required: true, message: t('guest.validation.required', { field: t('guest.dateOfBirth') }), trigger: 'blur' }],
    gender: [{ required: true, message: t('guest.validation.required', { field: t('guest.gender') }), trigger: 'blur' }],
    nationality: [{ required: true, message: t('guest.validation.required', { field: t('guest.nationality') }), trigger: 'blur' }],
    documentType: [{ required: true, message: t('guest.validation.required', { field: t('guest.documentType') }), trigger: 'blur' }],
    documentNumber: [{ required: true, message: t('guest.validation.required', { field: t('guest.documentNumber') }), trigger: 'blur' }],
    checkOutDate: [
      { required: true, message: t('guest.validation.required', { field: t('guest.checkOutDate') }), trigger: 'blur' },
      { validator: checkOutDateValidator, trigger: 'blur' },
    ],
    cityTaxExemption: [{ required: true, message: t('guest.validation.required', { field: t('guest.cityTaxExemption') }), trigger: 'blur' }],
  };

  const countries = iso.all().map(item => ({ value: item.alpha2, label: item.country }));

  const guestAge = computed(() => {
    if (!localGuest.dateOfBirth) return null;

    const birthDate = new Date(localGuest.dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  });

  const labelPosition = computed(() => (isMobile.value ? 'top' : 'left'));
  const isChildren = computed(() => guestAge.value !== null && guestAge.value >= 7 && guestAge.value <= 18);
  const isPreschoolers = computed(() => guestAge.value !== null && guestAge.value < 7);
  const isSameDayCheckout = computed(() => {
    if (!props.checkInDate || !localGuest.checkOutDate) return false;
    const checkIn = new Date(props.checkInDate);
    const checkOut = new Date(localGuest.checkOutDate);
    return (
      checkIn.getFullYear() === checkOut.getFullYear() &&
      checkIn.getMonth() === checkOut.getMonth() &&
      checkIn.getDate() === checkOut.getDate()
    );
  });

  const isCityTaxExemptionDisabled = computed(() => {
    return isChildren.value || isPreschoolers.value || isSameDayCheckout.value;
  });

  const closeMakePhoto = () => {
    isCameraEnabled.value = false;
    showMakePhoto.value = false;
  };

  const openMakePhoto = () => {
    isCameraEnabled.value = true;
    showMakePhoto.value = true;
  };

  const submit = (form) => {
    if (![0, 1, 11, 16].includes(localGuest.cityTaxExemption) && !hasExemptionPhoto.value) {
      ElMessage.error(t('guest.validation.exemptionDoc'));
      return;
    }
    form.validate((valid) => {
      if (valid) {
        emit('submit', localGuest);
      }
    });
  };

  watch([isChildren, isPreschoolers, isSameDayCheckout], ([children, preschoolers, sameDay]) => {
    if (children) {
      localGuest.cityTaxExemption = 11;
    } else if (preschoolers) {
      localGuest.cityTaxExemption = 1;
    } else if(sameDay) {
      localGuest.cityTaxExemption = 16;
    } else {
      localGuest.cityTaxExemption = 0;
    }
  });

  onMounted(() => {
    isMobile.value = window.innerWidth < 768;
  });
</script>

<template>
  <h4 v-if="localGuest.firstName && localGuest.lastName">{{ localGuest.firstName }} {{localGuest.lastName }}</h4>
  <el-form ref="formRef" :model="localGuest" label-width="auto" :rules="rules" class="guest-form">
    <el-form-item v-show="!guest.firstName" :label="t('guest.firstName')" :label-position="labelPosition" prop="firstName" required>
      <el-input v-model="localGuest.firstName" class="input" />
    </el-form-item>
    <el-form-item v-show="!guest.lastName" :label="t('guest.lastName')" :label-position="labelPosition" prop="lastName" required>
      <el-input v-model="localGuest.lastName" class="input" />
    </el-form-item>
    <el-form-item v-show="!guest.dateOfBirth" :label="t('guest.dateOfBirth')" :label-position="labelPosition" prop="dateOfBirth" required>
        <el-date-picker
            v-model="localGuest.dateOfBirth"
            type="date"
            :placeholder="t('guest.pickADate')"
            value-format="YYYY-MM-DD"
            style="width: 100%"
        />
    </el-form-item>
    <el-form-item v-show="!guest.gender" :label="t('guest.gender')" :label-position="labelPosition" prop="gender" required>
      <el-radio-group v-model="localGuest.gender">
        <el-radio value="M">{{ $t('guest.male') }}</el-radio>
        <el-radio value="F">{{ $t('guest.female') }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-show="!guest.nationality" :label="t('guest.nationality')" :label-position="labelPosition" prop="nationality" required>
      <el-select v-model="localGuest.nationality" filterable>
        <el-option
            v-for="country in countries"
            :key="country.value"
            :label="country.label"
            :value="country.value"
            class="input"
        />
      </el-select>
    </el-form-item>
    <el-form-item v-show="!guest.documentType" :label="t('guest.documentType')" :label-position="labelPosition" prop="documentType" required>
      <el-radio-group v-model="localGuest.documentType">
        <el-radio value="passport">{{ $t('guest.passport') }}</el-radio>
        <el-radio value="ID">{{ $t('guest.id') }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-show="!guest.documentNumber" :label="t('guest.documentNumber')" :label-position="labelPosition" prop="documentNumber" required>
      <el-input v-model="localGuest.documentNumber" class="input" />
    </el-form-item>
    <el-form-item :label="t('guest.checkOutDate')" :label-position="labelPosition" prop="checkOutDate" required>
      <el-row justify="space-between">
        <el-col :xs="24" :sm="11">
          <el-date-picker
              v-model="localGuest.checkOutDate"
              type="date"
              :placeholder="t('guest.pickADate')"
              value-format="YYYY-MM-DD"
              style="width: 100%"
              class="input"
          />
        </el-col>
        <el-col :span="2" class="text-center hidden-xs-only">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :xs="24" :sm="11">
          <el-time-select
              v-model="localGuest.checkOutTime"
              style="width: 100%"
              start="00:00"
              step="01:00"
              end="23:00"
              :placeholder="t('guest.pickATime')"
              class="input"
          />
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item :label="t('guest.cityTaxExemption')" :label-position="labelPosition" prop="cityTaxExemption" required>
      <el-select
          v-model="localGuest.cityTaxExemption"
          :placeholder="t('guest.select')"
          :disabled="isCityTaxExemptionDisabled"
          style="width: 100%"
      >
        <el-option
            v-for="item in cityTaxExemptionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-form-item>
    <div v-if="![0, 1, 11, 16].includes(localGuest.cityTaxExemption)" class="photo">
      <p class="info"><el-icon><InfoFilled /></el-icon> {{ $t('guest.cityTaxExemptionDocument') }}</p>
      <upload-photo :order-id="id" @photo-added="hasExemptionPhoto = true" />
      <el-button type="primary" @click="openMakePhoto">{{ $t('tax.makePhoto') }}</el-button>
      <div class="output">
        <show-photos :order-id="id" @photos-removed="hasExemptionPhoto = false" />
      </div>
      <el-dialog
          v-model="showMakePhoto"
          :title="$t('photos.makePhotoTitle')" width="80%"
          :before-close="closeMakePhoto">
        <make-photo :is-camera-enabled="isCameraEnabled" :order-id="id" @photo-taken="hasExemptionPhoto = true" />
      </el-dialog>
    </div>
    <el-form-item>
      <el-button type="primary" @click="submit(formRef)">{{ $t('guest.add') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
  .info {
    background: var(--el-color-primary-light-5);
    border-radius: 4px;
    padding: 4px;
    vertical-align: baseline;
    line-height: 1.5;
  }
  .text-center {
    text-align: center;
  }
  .guest-form {
    margin-top: 20px;
    max-width: 590px
  }
  .input {
    font-size: 16px;
  }
  .photo {
    margin: 20px 0;
  }
  .output {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
  }
</style>
