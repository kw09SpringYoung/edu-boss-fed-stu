<template>
  <div class="advert-space">
    <advert-space-list/>
  </div>
</template>

<script>
import Vue from 'vue'
import AdvertSpaceList from './components/list.vue'
export default Vue.extend({
  name: 'AdvertSpaceIndex',
  components: {
    AdvertSpaceList
  }
})
</script>

<style lang= 'scss' scoped>

</style>
