<template>
  <v-container fluid center>
    <v-layout row wrap>
      <v-flex xs12 class="text-center" mt-5 mb-5>
        <h1>User Settings</h1>
      </v-flex>
    </v-layout>
    <v-flex xs12 class="text-center" mt-5>
      <p>Username: {{ user.username }}</p>
      <p>E-mail: {{ user.email }}</p>
    </v-flex>
  </v-container>
</template>
<script>
import axios from 'axios'

export default {
  name: 'UserSettings',
  data: () => ({
    user: '',
  }),
  methods: {
    async getUserInfo() {
      const res = await axios.post('/api/user/settings/', {
        id: '61b5d5cd04ceb5cd348c6d9e',
      })
      this.user = res.data.user
    },
  },
  created() {
    this.getUserInfo()
  },
}
</script>
