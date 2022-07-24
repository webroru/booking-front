<script>
export default {
  data() {
    return {
      title: 'Apartments* GreenSLO (free Parking)',
      address: 'Podlimbarskega ulica 43, Ljubljana, Slovenia',
    };
  },
};
</script>

<template>
  <h1>{{ title }}</h1>
  <p>{{ address }}</p>
</template>

<style scoped>
h1 {
  margin: 80px 0 20px;
  text-align: center;
}

p {
  text-align: center;
}
</style>
