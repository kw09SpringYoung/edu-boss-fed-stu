<template>
  <div class="error">
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'ErrorIndex'
})
</script>

<style lang= 'scss' scoped>
.error {
  background-image: url('./404.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}
</style>
