<template>
  <div class="role">
    <role-list/>
  </div>
</template>

<script>
import Vue from 'vue'
import roleList from './components/list.vue'
export default Vue.extend({
  name: 'RoleIndex',
  components: {
    roleList
  }
})
</script>

<style lang= 'scss' scoped>

</style>
