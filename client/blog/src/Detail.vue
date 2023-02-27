<script>
import { get } from './utils/http';

export default {
  data() {
    return {
      detail : {}
    }
  },
  mounted() {
    const {id} = this.$route.params;
    this.loadData(id);
  },
  methods: {
    async loadData(id) {
      const { ok, detail } = await get(`/api/detail?id=${id}`)
      if (ok) {
        this.detail = detail
      }
    },
    edit() {
      const {id} = this.$route.params;
      this.$router.push(`/Edit/${id}`)
    },
  }
}
</script>

<template>
  <v-app>
    <h2>{{ detail.description }}</h2>
    <div>{{ detail.type }}|{{ detail.author }}|{{ detail.date }}</div>
    <div>
      {{ detail.content }}
    </div>
    <v-btn class="mt-10" @click="edit">EDIT</v-btn>
  </v-app>
</template>