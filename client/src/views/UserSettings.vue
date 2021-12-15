<template>
  <v-container fluid center>
    <v-layout row wrap>
      <v-flex xs12 class="text-center" mt-5 mb-5>
        <h1>{{ $t('userSettings.userSettings') }}</h1>
      </v-flex>
    </v-layout>
    <v-flex xs12 class="text-center" mt-5>
      <v-col>
        <h2>{{ $t('userSettings.username') }}</h2>
        <div class="mt-4">
          {{ username }}
          <v-icon @click="editUsernameDialog">mdi-account-edit-outline</v-icon>
        </div>
        <h2 class="mt-4">{{ $t('userSettings.Email') }}</h2>
        <div class="mt-4">{{ email }}</div>
      </v-col>
    </v-flex>
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="text-h5">
          Are you sure about changing your username?
        </v-card-title>
        <v-card-title class="text-h5 red">
          You need to sign in again after changing username
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
    editUsernameDialog() {
      this.dialog = true
    },
    async changeUsername() {
      await axios.put('/api/user/settings/', {
        email: this.email,
        username: this.newUsername,
      })
      this.username = this.newUsername
      this.dialog = false
      this.logout()
    },
    logout() {
      this.$store.dispatch('logout')
    },
  },
  created() {
    this.username = this.$store.state.user.username
    this.email = this.$store.state.user.email
  },
}
</script>
