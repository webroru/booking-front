<script setup>
  const tax = true;
</script>

<template>
  <h2>
    You should register your guests
    <span v-if="tax">and pay the city tax</span>
  </h2>

  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque eligendi excepturi dolorum exercitationem similique
    dolorem vel repellat labore quae esse, magnam facilis cum velit ex. Hic consectetur deserunt recusandae debitis!
  </p>
</template>
