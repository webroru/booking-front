<script setup>
  import State from './../../State';
  // eslint-disable-next-line no-unused-vars
  const emit = defineEmits(['changeState']);
</script>

<template>
  <div>
    <el-button type="primary" size="large" :fill="true" @click="$emit('changeState', State.Confirmation)">
      {{ $t('selectBooking.haveBooking') }}
    </el-button>
  </div>
  <div>
    <el-button type="primary" size="large" :fill="true" @click="$emit('changeState', State.Checkout)">
      {{ $t('selectBooking.checkOut') }}
    </el-button>
  </div>
  <div>
    <el-button type="primary" size="large" :fill="true" @click="$emit('changeState', State.Registration)">
      {{ $t('selectBooking.wantToBook') }}
    </el-button>
  </div>
</template>

<style scoped>
  div {
    margin: 0 0 20px;
    text-align: center;
  }
</style>
