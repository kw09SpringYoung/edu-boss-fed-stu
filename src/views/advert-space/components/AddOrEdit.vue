<template>
  <div class="add-advert-space">
    <el-card class="box-card">
      <el-form
      :model="ruleForm"
      :rules="rules"
      ref=""
      label-width="100px"
      style="width: 80%"
       class="demo-ruleForm">
        <el-form-item label="广告位名称" prop="name" >
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'addAdvertSpace',
  data () {
    return {
      ruleForm: {
        name: ''
      }
    }
  }
})
</script>

<style lang= 'scss' scoped>

</style>
