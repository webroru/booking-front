<script setup>
  import State from './../../State';
  // eslint-disable-next-line no-unused-vars
  const emit = defineEmits(['changeState']);
</script>

<template>
  <div>
    <el-button type="primary" size="large" :fill="true" @click="$emit('changeState', State.Confirmation)">
      I have a booking
    </el-button>
  </div>
  <div>
    <el-button type="primary" size="large" :fill="true" @click="$emit('changeState', State.Registration)">
      I want to book
    </el-button>
  </div>
</template>

<style scoped>
  div {
    margin: 0 0 20px;
    text-align: center;
  }
</style>
