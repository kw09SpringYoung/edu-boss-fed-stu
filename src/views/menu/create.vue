<template>
  <div>
    <create-or-edit/>
  </div>
</template>

<script>
import Vue from 'vue'
import CreateOrEdit from './components/createoredit.vue'
export default Vue.extend({
  name: 'MenuCreate',
  components: {
    CreateOrEdit
  }
})
</script>

<style>
</style>
