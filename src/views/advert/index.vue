<template>
  <div class="AdvertIndex">
    <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button type="primary" @click="$router.push({name: 'advert-create'})">添加广告</el-button>
    </div>
    <el-table
      border
      :data="adverts"
      style="width: 100%"
      >
      <el-table-column
        center
        align="center"
        width="180px"
        prop='id'
        label="id">
      </el-table-column>
      <el-table-column
        center
        align="center"
        prop="name"
        label="广告名称">
      </el-table-column>
      <el-table-column
        center
        align="center"
        prop="advertPosition"
        label="广告位置">
      </el-table-column>
      <el-table-column
        center
        min-width="300px"
        width="350px"
        align="center"
        label="广告图片">
        <template slot-scope="scope">
          <a :href="scope.row.link"><img :src="scope.row.img" alt="" style="width:300px"></a>
        </template>

      </el-table-column>
      <el-table-column
        center
        align="center"
        prop="createTime"
        label="时间">
      </el-table-column>
      <el-table-column
        center
        align="center"
        width="250px"
        label="上线/下线">
        <template slot-scope="scope">
          <div>
            <div>开始时间：{{scope.row.startTime}}</div>
            <div>结束时间：{{scope.row.endTime}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        center
        align="center"
        label="操作">
         <template slot-scope="scope">
            <el-button type="warning" size="small" @click="handleEditClick(scope.row)">编辑</el-button>
            <!-- <el-button type="text" size="small" @click="handleDeleteClick(scope.row)">删除</el-button> -->
          </template>
      </el-table-column>
    </el-table>
  </el-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { getAdList, getAllSpaces } from '@/services/advert'
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
      const { data: advertPositionName } = await getAllSpaces()
      const content = data.content
      const positionContent = advertPositionName.content
      console.log(positionContent)
      for (let i = 0; i < content.length; i++) {
        for (let j = 0; j < positionContent.length; j++) {
          if (content[i].spaceId === positionContent[j].id) {
            content[i].advertPosition = positionContent[j].name
          }
        }
      }
      this.adverts = content
    },
    // handleDeleteClick (row) {
    //   this.$confirm('确认删除么？', '删除提示', {})
    //     .then(async () => {
    //       const { data } = await deleteAdvertsItem(row.id)
    //       if (data.code === '000000') {
    //         this.$message.success('删除成功')
    //         this.loadAllAdverts()
    //       }
    //     })
    //     .catch(() => {
    //       this.$message.info('已取消删除')
    //     })
    // },
    handleEditClick (row) {
      this.$router.push({
        name: 'advert-edit',
        params: { id: row.id }
      })
    }
  }
})
</script>

<style lang= 'scss' scoped>

</style>
