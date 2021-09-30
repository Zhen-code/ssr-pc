<template>
  <div class="menu-box">
    <img src="~/assets/img/logo.png" class="logo">
    <el-menu
      :default-active="activeIndex"
      :router="true"
      background-color="#FFFFFF"
      text-color="#282828"
      active-text-color="#007CCB"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <template v-for="(route,i) in routes">
        <el-menu-item v-if="route.children.length === 0" :key="i" :index="route.path">{{ route.title }}</el-menu-item>
        <el-submenu v-else :key="i" :index="route.path">
          <template slot="title">{{ route.title }}</template>
          <el-menu-item
            v-for="(child,i1) in route.children"
            :key="i1"
            :index="child.path"
          >
            {{ child.title }}
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
    <div class="right-avatar">
      <el-avatar class="avatar" :size="50" src="https://img2.baidu.com/it/u=3010850469,2813118839&fm=26&fmt=auto" />
      <el-dropdown>
        <span class="el-dropdown-link">
          王小二
          <i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><span @click="logOut">退出登录</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { routes } from '~/utils/auth'

export default {
  name: 'Header',
  data() {
    return {
      activeIndex: '/',
      routes
    }
  },
  created() {
    this.activeIndex = this.$route.path
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath)
    },
    logOut() {
      this.$router.replace('/user/login')
    }
  }
}
</script>
<style>
.el-submenu__title:focus,
.el-submenu__title:hover {
  outline: 0 !important;
  color: #282828 !important;
  /*background: none !important;*/
}
.el-menu--popup-bottom-start {
  margin-top: 0;
}
.el-menu--popup {
 padding: 0 0;
  box-sizing: border-box;
}
/*下拉子菜单块样式*/
/*.el-menu--horizontal .el-menu {*/
/*  background: #454545!important;*/
/*}*/
/*下拉子菜单项样式*/
.el-menu--horizontal .el-menu .el-menu-item,
.el-menu--horizontal .el-menu .el-submenu__title {
  width: 200px;
  text-align: left;
  background: none !important;
  float: none;
  height: 36px;
  line-height: 36px;
  padding: 0 22px;
  color: #282828!important;
  z-index: 100;
  font-weight: 500;
}
/*子菜单项激活样式*/
  .el-menu--popup-bottom-start .el-menu-item:hover{
    background:  #282828!important;
    color: #ffffff!important;
  }
</style>
<style lang="scss" scoped>
.el-menu-demo {
  display: flex;
  justify-content: center;
}
.el-menu-item{
  //color: #ffffff !important;
  width: 110px;
  text-align: center;
}
.menu-box{
  position: relative;
}
.logo{
  position: fixed;
  z-index: 1000;
  top: 6px;
  left: 30px;
}
.el-submenu{
  width: 110px!important;
  text-align: center!important;
}
.el-dropdown-link {
  cursor: pointer;
  color: #282828;
  margin-left: 20px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.right-avatar{
  position: fixed;
  display: flex;
  align-items: center;
  top: 6px;
  right: 30px;
}
/deep/.el-menu--horizontal>.el-submenu .el-submenu__icon-arrow{
  color: #282828 !important;
}
</style>
