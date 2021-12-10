<template>
   <el-button size="small"
    @click='handleResourceClassify'
  >资源分类</el-button>
</template>
<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'AddResourceClassification',
  methods: {
    handleResourceClassify () {
      this.$router.push({
        name: 'resource-classification'
      })
    }
  }
})
</script>
