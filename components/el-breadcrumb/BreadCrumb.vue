<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="(bread,i) in breadCrumbData"
      :key="i"
      :to="bread.to"
    >
      {{ bread.title }}
    </el-breadcrumb-item>
    <!--    <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>-->
  </el-breadcrumb>
</template>

<script>
import { routes } from '~/utils/auth'
export default {
  name: 'BreadCrumb',
  data() {
    return {
      path: '',
      breadCrumbData: []
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        // this.path = to.path
        this.getBreadcrumb()
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      const list = this.$route.fullPath.split('/')
      for (const i in list) {
        if (list[i].indexOf('?') > 0) {
          list[i] = list[i].split('?')[0]
        }
      }
      list.shift()
      const menus = [
        {
          title: '首页',
          to: {
            path: '/'
          }
        }
      ]
      for (const i in list) {
        if (list[i] === '') {
          break
        }
        for (const j in routes) {
          const tPath = (routes[j].path).split('/')[1]
          if (tPath === list[i]) {
            if (routes[j].children.length > 0) {
              menus.push({
                title: routes[j].title,
                to: {
                  path: (routes[j].children)[0].path
                }
              })
            } else {
              menus.push({
                title: routes[j].title,
                to: {
                  path: routes[j].path
                }
              })
            }
          }
          if (routes[j].children.length > 0) {
            const t1Path = routes[j].path + '/' + list[i]
            for (const one of routes[j].children) {
              if (t1Path === one.path) {
                menus.push({
                  title: one.title,
                  to: {
                    path: one.path
                  }
                })
              }
            }
          }
        }
      }
      this.breadCrumbData = menus
    }
  }
}
</script>

<style scoped>

</style>
