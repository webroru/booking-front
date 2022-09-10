<script>
  import "flag-icons/css/flag-icons.min.css";

  export default {
    data() {
      return {
        items: [
          {
            title: 'English',
            iso: 'gb',
          },
          {
            title: 'German',
            iso: 'de',
          },
          {
            title: 'Spanish',
            iso: 'es',
          },
          {
            title: 'Croatian',
            iso: 'hr',
          },
          {
            title: 'Italian',
            iso: 'it',
          },
          {
            title: 'Polish',
            iso: 'pl',
          },
          {
            title: 'Slovene',
            iso: 'si',
          },
          {
            title: 'Chinese',
            iso: 'cn',
          },
          {
            title: 'Russian',
            iso: 'ru',
          },
        ],
      };
    },
  };
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item">
      <a href="#">
        <span :class="'fi fi-' + item.iso"></span>
        <p>{{ item.title }}</p>
      </a>
    </li>
  </ul>
</template>

<style scoped>
  a {
    color: #666;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    text-decoration: none;
  }

  ul {
    display: flex;
    height: 10vh;
    justify-content: space-evenly;
  }

  li {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    list-style: none;
    margin: 0 10px;
    text-align: center;
  }

  p {
    margin: 5px 0 0;
  }

  .fi {
    height: 100%;
    width: 100%;
  }
</style>
