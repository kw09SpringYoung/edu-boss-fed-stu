<template>
  <div class="advert-space-edit">
    <add-or-edit/>
  </div>
</template>

<script>
import Vue from 'vue'
import AddOrEdit from './components/AddOrEdit.vue'
export default Vue.extend({
  name: 'EditAdvertSpaceIndex',
  components: {
    AddOrEdit
  }
})
</script>

<style lang= 'scss' scoped>

</style>
