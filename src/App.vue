<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
}
#app {
  height: 100%;
  /* display: flex; */
}

/****** modefied by liyichuan *************/
body {
  background-size: 100%;
}
</style>
