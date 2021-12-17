<template>
  <div class="AdvertIndex">
    <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button @click="$router.push({name: 'Adverts-create'})">添加广告</el-button>
    </div>
    <el-table
      border
      :data="adverts"
      style="width: 100%"
      >
      <el-table-column
        align="center"
        width="180px"
        prop='id'
        label="id">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="广告名称">
      </el-table-column>
      <el-table-column
        align="center"
        prop="level"
        label="广告位置">
      </el-table-column>
      <el-table-column
        align="center"
        label="广告图片">
        <!-- <template slot-scope="scope">
          <a :href="link"><img :src="scope.img" alt=""></a>
        </template> -->

      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="orderNum"
        label="上线/下线">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
         <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEditClick(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDeleteClick(scope.row)">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
  </el-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { getAdList } from '@/services/advert'
export default Vue.extend({
  name: 'AdvertIndex',
  data () {
    return {
      adverts: null
    }
  },
  created () {
    this.loadAllAdverts()
  },
  methods: {
    async loadAllAdverts () {
      const { data } = await getAdList()

      this.adverts = data.content
      console.log(this.adverts)
    },
    handleDeleteClick (row) {
      // this.$confirm('确认删除么？', '删除提示', {})
      //   .then(async () => {
      //     const { data } = await deleteAdvertsItem(row.id)
      //     if (data.code === '000000') {
      //       this.$message.success('删除成功')
      //       this.loadAllAdverts()
      //     }
      //   })
      //   .catch(() => {
      //     this.$message.info('已取消删除')
      //   })
    },
    handleEditClick (row) {
      this.$router.push({
        name: 'Adverts-edit',
        params: { id: row.id }
      })
    }
  }
})
</script>

<style lang= 'scss' scoped>

</style>
