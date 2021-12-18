<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{isEdit ? '编辑广告' : '添加广告'}}</span>
        <span style="float: right; padding: 3px 0" type="text" class="el-icon-close" @click='close'></span>
      </div>
      <el-form ref="resource-create-edit" :model="form" label-width="80px">
        <el-form-item label="广告名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="广告位置" prop="parentId">
          <el-select v-model="form.parentId" placeholder="请选择活动区域">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option
            v-for='item in parentMenuList'
            :key = item.id
            :label="item.name"
            :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广告位置" prop="href">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="href">
          <el-date-picker
            v-model="value1"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="到期时间" prop="href">
          <el-date-picker
            v-model="value2"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上线/下线" prop="shown">
          <el-radio-group v-model="form.shown">
            <el-radio :label="false">下线</el-radio>
            <el-radio :label="true">上线</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 广告图片 -->
        <el-form-item
        label="广告图片">
          <el-upload
              action="http://eduboss.lagou.com/boss//course/upload"
              list-type="picture-card"
              :auto-upload="false">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url" alt=""
                  >
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)"
                    >
                      <i class="el-icon-download"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-form-item>
        <el-form-item label="广告链接" prop="icon">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="广告备注" prop="href">
          <el-input v-model="form.href" type="textarea" placeholder="请输入内容" :rows="2"></el-input>
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
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      value1: '',
      value2: '',
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
      this.$confirm('是否关闭面板?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.back()
      })
    },
    handleChange (value) {
      console.log(value)
    },
    // 图片上传方法
    handleRemove (file) {
      console.log(file)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload (file) {
      console.log(file)
    }
  }
})
</script>

<style>
.el-form-item {
  margin-left: 50px; margin-right: 50px;
}
</style>
