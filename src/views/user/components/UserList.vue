<template>
  <div class="user">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="filterParams" class="demo-form-inline">
          <el-form-item label="手机号" prop='phone'>
            <el-input v-model.trim="filterParams.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="注册时间" prop='rangeDate'>
            <el-date-picker
              v-model="filterParams.rangeDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              align="right">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-table
        :data="userRecords"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="用户ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="portrait"
          label="头像"
          center
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          center
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="phone"
          center
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="createTime"
          :formatter="setDate"
          center
          label="注册时间">
        </el-table-column>
        <el-table-column
          prop="status"
          center
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
          center
          label="操作">
           <template slot-scope="scope">
            <el-button @click="handleForbiddenClick(scope.row)" type="text" size="small">禁用</el-button>
            <el-button type="text" size="small" @click='allocRoles(scope.row)'>分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分配角色弹框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="dialogVisible"
      width="40%">
         <el-select v-model="selectedUser.userInfo" multiple placeholder="请选择" style="margin-left: 50px;width: 70%">
          <el-option
            v-for="item in roleOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { getUserPages, enableUser, forbidUser } from '@/services/user'
import { getAllRoles, getRoleByUserId, allocateUserRoles } from '@/services/role'
export default Vue.extend({
  name: 'UserIndex',
  data () {
    return {
      filterParams: {
        rangeDate: [],
        currentPage: 1,
        endCreateTime: '',
        pageSize: 20,
        phone: null,
        startCreateTime: ''
      },
      userRecords: null,
      dialogVisible: false,
      roleOptions: [],
      selectedUser: {
        roleIdList: [],
        userId: null
      }

    }
  },
  created () {
    // 初始化数据
    this.loadUsers()
  },

  methods: {
    async loadUsers () {
      const { rangeDate } = this.filterParams
      if (rangeDate && rangeDate.length) {
        this.filterParams.startCreateTime = rangeDate[0]
        this.filterParams.endCreateTime = rangeDate[1]
      } else {
        this.filterParams.startCreateTime = ''
        this.filterParams.endCreateTime = ''
      }

      const { data } = await getUserPages(this.filterParams)
      if (data.code === '000000') {
        this.userRecords = data.data.records
      }
      return data
    },
    async onSubmit () {
      this.filterParams.currentPage = 1
      const data = await this.loadUsers()
      this.$message.success(data.mesg)
    },
    async handleForbidUser (row) {
      const data = row.status === 'ENABLE' ? await enableUser(row.id) : await forbidUser(row.id)
      this.$message.success(data.mesg)
    },
    async handleForbiddenClick (row) {
      const { data } = await forbidUser(row.id)
      this.$message.success(data.mesg)
    },
    setDate (row, column) {
      return row[column.property].slice(0, 10)
    },
    async allocRoles (row) {
      console.log(row)
      this.selectedUser.userId = row.id
      const { data: { data } } = await getAllRoles()
      this.roleOptions = data
      const { data: { data: userInfo } } = await getRoleByUserId(row.id)
      this.selectedUser.roleIdList = userInfo.map(item => item.name)
      this.dialogVisible = true
    },
    async handleConfirmClick () {
      this.dialogVisible = false

      const { data } = await allocateUserRoles(this.selectedUser)
      this.$message.success(data.mesg)
      this.loadUsers()
    }
  }
})
</script>

<style lang= 'scss' scoped>

</style>
