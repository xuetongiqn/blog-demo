<script>
import { post } from './utils/http'
export default {
  data() {
    return {
      author: '',
      contentType: '',
      typeText: '',
      date: '',
      description:'',
      content: '',
      rules: {
        require: value => !!value || 'This field is required',
        radio: value => this.contentType != 'Other' || !!value || 'This field is required'
      },
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
      const result = await post('/api/create', {
        author: this.author,
        type,
        date: this.date,
        description: this.description,
        content: this.content,
      }, 'PATCH');
      if (result.ok) {
        alert('提交成功');
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
          <v-radio label="TravelTips" value="TravelTips"></v-radio>
          <v-radio label="Visa" value="Visa"></v-radio>
          <v-radio label="Sightseeing" value="Sightseeing"></v-radio>
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
      <v-btn color="primary" type="submit">提交</v-btn>
    </v-form>
  </v-app>
</template>

<style>
.container {
  width: 750px;
}
</style>
