<script>
export default {
  methods: {
    create() {
      console.log(this.$route)
      this.$router.push(`/Create`)
    }
  }
}
</script>

<template>
  <div>
    <h1><v-btn v-if="$route.path!='/Create'" class="float-right" @click="create">new blog</v-btn>Blog</h1>
    <router-view />
  </div>
</template>
