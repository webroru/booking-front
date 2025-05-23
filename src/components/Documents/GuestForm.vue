<script setup>
  import { reactive } from 'vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const props = defineProps({ guest: Object });
  const localGuest = reactive({ ...props.guest });
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
</script>

<template>
  <el-form :model="localGuest" label-width="auto" style="max-width: 600px">
    <el-form-item v-if="!guest.firstName" :label="t('guest.firstName')">
      <el-input v-model="localGuest.firstName" />
    </el-form-item>
    <el-form-item v-if="!guest.lastName" :label="t('guest.lastName')">
      <el-input v-model="localGuest.lastName" />
    </el-form-item>
    <el-form-item v-if="!guest.dateOfBirth" :label="t('guest.dateOfBirth')">
        <el-date-picker
            v-model="localGuest.dateOfBirth"
            type="date"
            :placeholder="t('guest.pickADate')"
            style="width: 100%"
        />
    </el-form-item>
    <el-form-item v-if="!guest.gender" :label="t('guest.gender')">
      <el-radio-group v-model="localGuest.gender">
        <el-radio label="M">{{ $t('guest.male') }}</el-radio>
        <el-radio label="F">{{ $t('guest.female') }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="!guest.nationality" :label="t('guest.nationality')">
      <el-input v-model="localGuest.nationality" />
    </el-form-item>
    <el-form-item v-if="!guest.documentType" :label="t('guest.documentType')">
      <el-radio-group v-model="localGuest.documentType">
        <el-radio label="passport">{{ $t('guest.passport') }}</el-radio>
        <el-radio label="ID">{{ $t('guest.id') }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="!guest.documentNumber" :label="t('guest.documentNumber')">
      <el-input v-model="localGuest.documentNumber" />
    </el-form-item>
    <el-form-item :label="t('guest.checkOutDate')">
      <el-col :span="11">
        <el-date-picker
            v-model="localGuest.checkoutDate"
            type="date"
            :placeholder="t('guest.pickADate')"
            style="width: 100%"
        />
      </el-col>
      <el-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-time-select
            v-model="localGuest.checkoutTime"
            style="width: 100%"
            start="00:00"
            step="01:00"
            end="23:00"
            :placeholder="t('guest.pickATime')"
        />
      </el-col>
    </el-form-item>
    <el-form-item :label="t('guest.cityTaxExemption')">
      <el-select
          v-model="localGuest.cityTaxExemption"
          :placeholder="t('guest.select')"
      >
        <el-option
            v-for="item in cityTaxExemptionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="$emit('submit', localGuest)">{{ $t('guest.add') }}</el-button>
    </el-form-item>
  </el-form>
</template>
