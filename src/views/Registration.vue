<script setup>
</script>

<template>
  <iframe src="https://beds24.com/booking2.php?ownerid=85787&width=960&page=book3&limitstart=0&ownerid=85787" height="100%"></iframe>
  <router-link to="/">
    <el-button style="margin-top: 12px">{{ $t('common.exit') }}</el-button>
  </router-link>
</template>

<style scoped>
  iframe {
    border: none;
    height: 800px;
    width: 100%;
  }
</style>
