<template>
  <div>
    <create-or-edit :is-edit="true"/>
  </div>
</template>

<script>
import Vue from 'vue'
import CreateOrEdit from './components/createoredit.vue'
export default Vue.extend({
  name: 'MenuEdit',
  components: {
    CreateOrEdit
  }
})
</script>

<style>
</style>
