<template>
  <div class="courseList">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="课程名称">
        <el-input v-model="formInline.user" placeholder="课程名称"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.region" placeholder="全部">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-card class="box-card">
       <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="课程名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="价格">
          </el-table-column>
          <el-table-column
            prop="address"
            label="排序">
          </el-table-column>
          <el-table-column
            prop="address"
            label="状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                active-value="ENABLE"
                inactive-value="DISABLE"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change='handleForbidUser(scope.row)'
                >
              </el-switch>
          </template>
          </el-table-column>
          <el-table-column
            label="操作">
          </el-table-column>
        </el-table>
    </el-card>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'CourseList',
  data () {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    async handleForbidUser (row) {
      // const data = row.status === 'ENABLE' ? await enableUser(row.id) : await forbidUser(row.id)
      // this.$message.success(data.mesg)
    }
  }
})
</script>

<style lang= 'scss' scoped>

</style>
