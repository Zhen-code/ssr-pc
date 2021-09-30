<template>
  <div class="box">

  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  asyncData(ctx) {

  },
  data() {
    return {

    }
  },
  computed: {
    todos () {
      return this.$store.state.todos.list
    }
  },
  methods: {
    addTodo (e) {
      this.$store.commit('todos/add', e.target.value)
      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    })
  }
}
</script>

<style lang="scss" scoped>
.box{
  width: 100%;
  height: calc(90vh - 62px);
  background: url(~/assets/img/dashboard-bj.png) no-repeat;
  background-size: 100% 100%;
}
</style>
