<template>
  <div class="advert-space-add">
    <add-or-edit/>
  </div>
</template>

<script>
import Vue from 'vue'
import AddOrEdit from './components/AddOrEdit.vue'
export default Vue.extend({
  name: 'AddAdvertSpace',
  components: {
    AddOrEdit
  }
})
</script>

<style lang= 'scss' scoped>

</style>
