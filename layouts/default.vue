<template>
  <el-container>
    <el-header class="header">
      <v-header/>
    </el-header>
    <div class="split"></div>
    <BreadCrumb class="bread"></BreadCrumb>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer>
      <v-footer/>
    </el-footer>
  </el-container>
</template>

<script>
import Header from '~/components/header'
import Footer from '~/components/footer'
export default {
  components: {
    'v-header': Header,
    'v-footer': Footer
  },
  middleware() {}
}
</script>

<style scoped lang="scss">
.header{
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
.split{
  height: 60px;
}
.bread{
  margin:20px 0 20px 50px;
}
/deep/.el-header{
      padding: 0;
}
</style>
