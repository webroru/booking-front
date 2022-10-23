<script setup>
  import State from './../../State';
  // eslint-disable-next-line no-unused-vars
  const emit = defineEmits(['changeState']);
  const registrationUrl = 'https://beds24.com/booking2.php?ownerid=85787&width=960&page=book3&limitstart=0&ownerid=85787';
  const goToRegistration = () => {
    window.location = registrationUrl;
  };

</script>

<template>
  <div>
    <el-button type="primary" size="large" :fill="true" @click="$emit('changeState', State.Confirmation)">
      I have a booking
    </el-button>
  </div>
  <div>
    <el-button type="primary" size="large" :fill="true" @click="$emit('changeState', State.Checkout)">
      Check out
    </el-button>
  </div>
  <div>
    <el-button type="primary" size="large" :fill="true" @click="goToRegistration">
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
