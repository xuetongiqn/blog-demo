<script>
import { get, post } from './utils/http'

export default {
  data() {
    return {
      submitText: '提交',
      id: '',
      author: '',
      contentType: '',
      typeText: '',
      date: '',
      description: '',
      content: '',
      options: [
        'TravelTips',
        'Visa',
        'Sightseeing'
      ],
      rules: {
        require: value => !!value || 'This field is required',
        radio: value => this.contentType != 'Other' || !!value || 'This field is required'
      },
    }
  },
  async mounted() {
    const { id } = this.$route.params;
    if (id) {
      this.submitText = '修改';
      this.id = id;
      const { ok, detail } = await get(`/api/detail?id=${id}`)
      if (ok) {
        this.author = detail.author
        this.contentType = detail.author
        this.date = detail.date
        this.description = detail.description
        this.content = detail.content
        if (this.options.indexOf(detail.type) > -1) {
          this.contentType = detail.type
        } else {
          this.contentType = 'Other'
          this.typeText = detail.type
        }
      }
    }

  },
  methods: {
    onOtherFocus() {
      this.contentType = "Other";
    },
    async onSubmit(event) {
      const validated = await event
      if (!validated.valid) return;

      const type = this.contentType == 'Other' ? this.typeText : this.contentType
      const data = {
        author: this.author,
        type,
        date: this.date,
        description: this.description,
        content: this.content,
      }
      if(this.id) {
        data.id = this.id;
      }

      const result = await post('/api/create', data, 'PATCH');
      if (result.ok) {
        alert(`${this.submitText}成功`);
        this.$router.push('/list')
      } else {
        alert(result.msg)
      }
    }
  }
}
</script>

<template>
  <v-app class="container">
    <div>* 必填</div>
    <v-form validate-on="onSubmit" @submit.prevent="onSubmit">
      <ol>
        <li>
          <v-text-field label="Author: *" variant="underlined" v-model="author" :rules="[rules.require]"></v-text-field>

        </li>
        <li>Type: *</li>
        <v-radio-group v-model="contentType" :rules="[rules.require]">
          <v-radio v-for="item in options" :label="item" :value="item" :key="item"></v-radio>
          <v-radio value="Other" class="w-50">
            <template v-slot:label>
              <v-text-field class="pt-0" label="Other" variant="underlined" v-model="typeText" @focus="onOtherFocus"
                :rules="[rules.radio]"></v-text-field>
            </template>
          </v-radio>
        </v-radio-group>
        <li>
          <v-text-field label="Create Date: *" placeholder="例如: 2019年1月7日" variant="underlined" v-model="date"
            :rules="[rules.require]"></v-text-field>
        </li>
        <li>
          <v-text-field label="Description" variant="underlined" v-model="description"
            :rules="[rules.require]"></v-text-field>
        </li>
        <li>
          <v-textarea label="Content: *" v-model="content" :rules="[rules.require]"></v-textarea>
        </li>
      </ol>
      <v-btn color="primary" type="submit">{{ submitText }}</v-btn>
    </v-form>
  </v-app>
</template>

<style>
.container {
  width: 750px;
}
</style>
