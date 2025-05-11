<script setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const props = defineProps({
    guest: Object,
  });
  const localGuest = ref({ ...props.guest });
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
      <el-input v-model="localGuest.dateOfBirth" />
    </el-form-item>
    <el-form-item :label="t('guest.dateOfBirth')">
        <el-date-picker
            v-model="localGuest.dateOfBirth"
            type="date"
            :placeholder="t('guest.pickADate')"
            style="width: 100%"
        />
    </el-form-item>
    <el-form-item v-if="!guest.gender" :label="t('guest.gender')">
      <el-radio-group v-model="localGuest.gender">
        <el-radio value="M">{{ $t('guest.male') }}</el-radio>
        <el-radio value="F">{{ $t('guest.female') }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="!guest.nationality" :label="t('guest.nationality')">
      <el-input v-model="localGuest.nationality" />
    </el-form-item>
    <el-form-item v-if="!guest.documentType" :label="t('guest.documentType')">
      <el-radio-group v-model="localGuest.documentType">
        <el-radio value="M">{{ $t('guest.passport') }}</el-radio>
        <el-radio value="F">{{ $t('guest.id') }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="!guest.documentNumber" :label="t('guest.documentNumber')">
      <el-input v-model="localGuest.documentNumber" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="$emit('submit', localGuest)">{{ $t('guest.add') }}</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>
