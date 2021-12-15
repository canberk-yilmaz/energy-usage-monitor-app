<template>
  <v-container fluid center>
    <v-layout row wrap>
      <v-flex xs12 class="text-center" mt-5>
        <h1>Sign In</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form @submit.prevent="getFormValues">
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            name="email"
            label="Email"
            id="email"
            type="email"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :error-messages="passwordErrors"
            name="password"
            label="Password"
            id="password"
            type="password"
            required
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          ></v-text-field>
          <v-checkbox v-model="rememberme" :label="'Remember Me'"></v-checkbox>

          <v-flex class="text-center" mt-5>
            <v-btn color="primary" @click="getFormValues">Sign In</v-btn>
          </v-flex>
          <v-flex v-if="error" class="text-center" mt-5>
            <p class="red--text">Please check your email and password</p>
          </v-flex>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
const jwt = require('jsonwebtoken')
import { required, email } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  validations: {
    email: { required, email },
    password: {
      required,
    },
  },

  name: 'SignIn',
  data() {
    return {
      email: '',
      password: '',
      error: false,
      rememberme: false,
    }
  },
  methods: {
    setUserData() {
      this.email = localStorage.getItem('userEmail') || ''
      this.password = localStorage.getItem('userPassword') || ''
    },
    async userSignIn(data) {
      try {
        const res = await axios.post(
          'http://localhost:3000/api/user/signin',
          data
        )
        const token = res.data.token
        if (jwt.verify(token, process.env.VUE_APP_SECRET_KEY)) {
          res.data.remember = this.rememberme
          if (this.rememberme) {
            localStorage.setItem('userEmail', this.email)
            localStorage.setItem('userPassword', this.password)
          }
          this.$store.dispatch('setUser', res.data)
          setTimeout(() => {
            this.$router.push('/dashboard')
          }, 1000)
        }
        this.error = false
      } catch (error) {
        this.error = error.response.data
      }
    },
    getFormValues() {
      if (this.$v.$invalid) {
        this.$v.$touch()
      } else {
        this.userData = {
          email: this.email,
          password: this.password,
        }
        this.userSignIn(this.userData)
      }
    },
  },
  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Please check your password')
      return errors
    },
    ...mapGetters(['getUser']),
  },
  created() {
    this.setUserData()
    if (this.getUser) {
      console.log('you are already logged in')
    }
  },
}
</script>
