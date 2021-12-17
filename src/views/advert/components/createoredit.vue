<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{isEdit ? '编辑菜单' : '添加菜单'}}</span>
        <span style="float: right; padding: 3px 0" type="text" class="el-icon-close" @click='close'></span>
      </div>
      <el-form ref="resource-create-edit" :model="form" label-width="80px">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" prop="href">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="parentId">
          <el-select v-model="form.parentId" placeholder="请选择活动区域">
            <el-option label="无上级菜单" :value="-1"></el-option>
            <el-option
            v-for='item in parentMenuList'
            :key = item.id
            :label="item.name"
            :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标" prop="icon">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="shown">
          <el-radio-group v-model="form.shown">
            <el-radio :label="false">是</el-radio>
            <el-radio :label="true">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序" prop="orderNum">
           <el-input-number v-model="form.orderNum" @change="handleChange" :min="0" :max="10" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="onReset" v-if="!isEdit">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { saveOrUpdate, getEditMenuInfo } from '@/services/menu'
export default Vue.extend({
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        description: '',
        href: '',
        icon: '',
        name: '',
        orderNum: 0,
        parentId: -1,
        shown: false
      },
      parentMenuList: []
    }
  },
  created () {
    this.loadMenuInfo()
  },
  methods: {
    async loadMenuInfo () {
      // 如果传参id为-1,为添加操作
      // 如果传承id有且大于-1，为更新操作，通过id拿到菜单列表
      const { data } = await getEditMenuInfo(this.$route.params.id || -1)
      if (data.data.menuInfo) {
        this.form = data.data.menuInfo
      }
      if (data.code === '000000') {
        this.parentMenuList = data.data.parentMenuList
      }
      // console.log(this.parentMenuList) this.parentMenuList的id就是子菜单（当前）菜单的parentId
    },
    async onSubmit () {
      // 表单验证
      // 表单提交
      const { data } = await saveOrUpdate(this.form)
      if (data.code === '000000') {
        this.$message.success(data.mesg)
        this.$router.back()
      }
    },
    onReset () {
      this.$refs['resource-create-edit'].resetFields()
    },
    close () {
      this.$confirm('是否关闭添加菜单面板?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.back()
      })
    },
    handleChange (value) {
      console.log(value)
    }
  }
})
</script>

<style>
.el-form-item {
  margin-left: 50px; margin-right: 50px;
}
</style>
