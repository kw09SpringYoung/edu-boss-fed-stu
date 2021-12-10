<template>
  <div class="create-edit">
    <el-form label-width="80px" :model="resourceForm" ref='resourceForm'>
      <el-form-item label="资源名称">
        <el-input v-model="resourceForm.name"></el-input>
      </el-form-item>
      <el-form-item label="资源路径">
        <el-input v-model="resourceForm.url"></el-input>
      </el-form-item>
      <el-form-item label="资源分类">
        <el-select v-model="resourceForm.categoryId" clearable placeholder="全部">
          <el-option
            v-for="item in resourceCategories"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
        type='textarea'
        :rows="3"
        v-model="resourceForm.description"
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
import { saveOrUpdateResource } from '@/services/resource'
export default Vue.extend({
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    resourceCategories: {
      type: Array,
      require: true
    },
    row: {
      type: Object,
      require: false,
      default: null
    }
  },

  data () {
    return {
      resourceForm: {
        categoryId: 1,
        description: '',
        id: null,
        name: null,
        url: null
      }
    }
  },
  created () {
    this.loadDatas()
  },
  methods: {
    loadDatas () {
      if (this.isEdit) {
        this.resourceForm = this.row
      }
    },
    async onSubmit () {
      const { data } = await saveOrUpdateResource(this.resourceForm)
      this.$emit('onSuccess')
      this.$message.success(data.mesg)
    }
  }
})
</script>

<style lang= 'scss' scoped>

</style>
