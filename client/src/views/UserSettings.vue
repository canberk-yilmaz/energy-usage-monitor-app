<template>
  <v-container fluid center>
    <v-layout row wrap>
      <v-flex xs12 class="text-center" mt-5 mb-5>
        <h1>User Settings</h1>
      </v-flex>
    </v-layout>
    <v-flex xs12 class="text-center" mt-5>
      <v-col>
        <div>
          Username: {{ username }}
          <v-icon @click="editUsernameDialog">mdi-account-edit-outline</v-icon>
        </div>
        <p>E-mail: {{ email }}</p>
      </v-col>
    </v-flex>
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="text-h5">
          Are you sure about changing your username?
        </v-card-title>

        <v-card-text> If you are you can continue below.</v-card-text>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Old Username"
                  v-model="username"
                  disabled
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="New Username"
                  v-model="newUsername"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="changeUsername">
            Change Username
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import axios from 'axios'

export default {
  name: 'UserSettings',
  data: () => ({
    username: '',
    email: '',
    dialog: false,
    newUsername: null,
  }),
  methods: {
    async getUserInfo() {
      const res = await axios.post('/api/user/settings/', {
        id: '61b5d5cd04ceb5cd348c6d9e',
      })
      this.username = res.data.user.username
      this.email = res.data.user.email
    },
    editUsernameDialog() {
      this.dialog = true
    },
    async changeUsername() {
      await axios.put('/api/user/settings/', {
        id: '61b5d5cd04ceb5cd348c6d9e',
        username: this.newUsername,
      })
      this.username = this.newUsername
      this.dialog = false
    },
  },
  created() {
    this.getUserInfo()
  },
}
</script>
