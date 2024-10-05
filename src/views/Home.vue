<script setup>
</script>

<template>
  <div>
    <router-link to="/confirmation/search">
      <el-button type="primary" size="large" :fill="true">
        {{ $t('selectBooking.haveBooking') }}
      </el-button>
    </router-link>
  </div>
  <div>
    <router-link to="/registration">
      <el-button type="primary" size="large" :fill="true">
        {{ $t('selectBooking.wantToBook') }}
      </el-button>
    </router-link>
  </div>
  <div>
    <router-link to="/checkout/search">
      <el-button type="primary" size="large" :fill="true">
        {{ $t('selectBooking.checkOut') }}
      </el-button>
    </router-link>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
}

div {
  margin: 0 0 20px;
  text-align: center;
}
</style>
