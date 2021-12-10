<template>
  <div class="allocResource" v-loading='isLoading' style="min-height: 50vh">
    <el-card
    v-for='resource in resources'
    :key="resource.name" shadow="never"
    style="margin-bottom:20px;"
  >
      <div slot="header" class="clearfix">
           <el-checkbox :indeterminate="resource.isIndeterminate" v-model="resource.selected" :checked='resource.selected' @change="handleCheckAllChange(resource.selected, resource)" >{{resource.name}}</el-checkbox>
      </div>
        <el-checkbox-group v-model="resource.checkedResources" @change="handleCheckedResourcesChange(resource.checkedResources, resource)">
          <el-checkbox style='display:inline-block;width: 230px;margin-top: 10px' v-for="item in resource.subResourceList" :label="item" :key="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-card>
      <div style="text-align: center" v-show='!isLoading'>
        <el-button @click='resetChecked'>清空</el-button>
        <el-button type="primary" @click='onSave'>保存</el-button>
      </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { allocateRoleResources, getAllCategories, getRoleResources } from '@/services/resource'

export default Vue.extend({
  name: 'AllocResource',
  props: {
    roleId: {
      type: [String, Number],
      require: true
    }
  },
  data () {
    return {
      resources: [],
      resourceIdList: [],
      isLoading: true
    }
  },
  created () {
    this.loadResources()
  },
  methods: {
    async loadResources () {
      this.isLoading = true
      const data = await this.loadAllResources()
      this.isLoading = false
      this.resources = data
    },
    getResources (resources) {
      var roleResourceArray = []
      return (function getCR (resources) {
        resources.forEach(roleResource => {
          if (!roleResource.resourceList) {
            roleResourceArray = [...roleResourceArray, roleResource]
          }
          if (roleResource.resourceList) {
            getCR(roleResource.resourceList)
          }
        })
        return roleResourceArray
      })(resources)
    },
    async loadAllResources () {
      const { data: resourceCont } = await getRoleResources(this.roleId)
      const resourceContent = this.getResources(resourceCont.data)
      let { data: categories } = await getAllCategories()

      categories = categories.data
      for (let i = 0; i < categories.length; i++) {
        categories[i].checkedResources = []
        categories[i].subResourceList = []
        categories[i].isIndeterminate = false
        for (let j = 0; j < resourceContent.length; j++) {
          if (categories[i].id === resourceContent[j].categoryId) {
            categories[i].subResourceList.push(resourceContent[j])

            if (resourceContent[j].selected) {
              categories[i].checkedResources.push(resourceContent[j])
            }
          }
        }
        const cateSelecdLen = categories[i].checkedResources.length
        const cateResLen = categories[i].subResourceList.length
        categories[i].selected = (cateSelecdLen === cateResLen && cateSelecdLen !== 0 && cateResLen !== 0)
      }
      return categories
    },
    handleCheckAllChange (val, resource) {
      resource.checkedResources = val ? resource.subResourceList : []
      resource.isIndeterminate = false
    },
    handleCheckedResourcesChange (value, resource) {
      const checkedCount = value.length
      resource.selected = checkedCount === resource.subResourceList.length
      resource.isIndeterminate = checkedCount > 0 && checkedCount < resource.subResourceList.length
    },
    async onSave () {
      // 拿到选中节点的id列表
      let resourceList = []
      this.resourceIdList = []
      this.resources.forEach(resource => {
        resourceList = resourceList.concat(resource.checkedResources)
      })

      resourceList.forEach(item => {
        this.resourceIdList = this.resourceIdList.concat(item.id)
      })
      console.log(this.resourceIdList)
      // 请求提交保存
      await allocateRoleResources({
        roleId: this.roleId,
        resourceIdList: this.resourceIdList
      })
      this.$message.success('操作成功')
      this.$router.push({
        name: 'role'
      })
    },
    resetChecked () {
      this.resources.forEach(resource => {
        resource.selected = false
        resource.checkedResources = []
      })
    }
  }
})
</script>

<style lang= 'scss' scoped>
</style>
