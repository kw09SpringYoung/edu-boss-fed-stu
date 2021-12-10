<template>
  <div class="create-edit">
    <el-form label-width="80px" :model="role">
    <el-form-item label="角色名称">
      <el-input v-model="role.name"></el-input>
    </el-form-item>
    <el-form-item label="角色编码">
      <el-input v-model="role.code"></el-input>
    </el-form-item>
    <el-form-item label="描述">
      <el-input
      type='textarea'
      :rows="3"
      v-model="role.description"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click='$emit("cancel")'>取 消</el-button>
      <el-button type="primary" @click='onSubmit'>确 定</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
import Vue from 'vue'
import { saveOrUpdate, getRoleById } from '@/services/role'
export default Vue.extend({
  props: {
    roleId: {
      type: [String, Number]
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  name: 'CreateOrEdit',
  data () {
    return {
      role: {
        name: '',
        code: '',
        description: ''
      }
    }
  },
  created () {
    // 如果是编辑操作，则根据角色ID加载显示角色信息
    if (this.isEdit) {
      this.loadRole()
    }
  },
  methods: {
    async loadRole () {
      const { data } = await getRoleById(this.roleId)
      this.role = data.data
    },
    async onSubmit () {
      await saveOrUpdate(this.role)
      this.$emit('success')
    }
  }
})
</script>

<style lang= 'scss' scoped>

</style>
