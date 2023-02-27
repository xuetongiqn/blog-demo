<script>
import { get } from './utils/http';
export default {
  data() {
    return {
      list: [],
      hasMore: false,
    }
  },
  mounted() {
    this.loadList();
  },
  methods: {
    async loadList(id) {
      const { ok, list, hasMore } = await get(`/api/list?id=${id || ''}`)
      if (ok) {
        this.list = this.list.concat(list)
        this.hasMore = hasMore
      }
    },
    jump(id) {
      this.$router.push(`/Detail/${id}`)
    },
    loadMore() {
      const lastId = this.list[this.list.length-1].id;
      this.loadList(lastId);
    }
  }
}
</script>


<template>
  <v-app class="pa-2">
    <ul>
      <li v-for="item in list" :key="item.id" @click="jump(item.id)">
        <h3>{{ item.description }}</h3><span>{{ item.type }}|{{ item.author }}|{{ item.date }}</span>
        <div>{{ item.content.substr(0, 50) }}</div>
      </li>
    </ul>
    <v-row class="mt-5">
      <v-btn block v-if="hasMore" @click="loadMore">
        load more
      </v-btn>
    </v-row>
  </v-app>
</template>


