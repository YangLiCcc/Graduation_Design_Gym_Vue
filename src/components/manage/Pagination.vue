<template>
  <div class="pagination-container ml-20">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 25, 40, 60]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  data () {
    return {
      currentPage: 0,
      pageSize: 10,
      total: 100
    }
  },
  methods: {
    handleSizeChange () {},
    handleCurrentChange () {}
  }
}
</script>

<style lang="scss" scoped>
.pagination-container {
  width: 60%;
  height: 40px;
}
</style>
