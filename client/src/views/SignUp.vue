<template>
  <v-container fluid center>
    <v-layout row wrap>
      <v-flex xs12 class="text-center" mt-5>
        <h1>Sign Up</h1>
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
            required
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          ></v-text-field>

          <v-text-field
            v-model="username"
            :error-messages="usernameErrors"
            name="username"
            label="Username"
            id="username"
            required
            @input="$v.username.$touch()"
            @blur="$v.username.$touch()"
          ></v-text-field>

          <v-row align="center">
            <v-col class="d-flex" cols="12">
              <v-select
                v-model="userStatus"
                :error-messages="userStatusErrors"
                :items="items"
                label="User Status"
                @change="$v.userStatus.$touch()"
                @blur="$v.userStatus.$touch()"
              ></v-select>
            </v-col>
          </v-row>
          <v-flex class="text-center" mt-5>
            <v-btn color="primary" @click="getFormValues">Sign Up</v-btn>
          </v-flex>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import {
  required,
  minLength,
  email,
  helpers,
  alpha,
} from 'vuelidate/lib/validators'

const hasLowerCase = helpers.regex('hasLowerCase', /[a-z]/)

const hasUpperCase = helpers.regex('hasUpperCase', /[A-Z]/)

const hasNumber = helpers.regex('hasUpperCase', /[0-9]/)

export default {
  validations: {
    email: { required, email },
    password: {
      required,
      hasLowerCase,
      hasUpperCase,
      minLength: minLength(8),
      hasNumber,
    },
    username: { required, minLength: minLength(8), alpha },
    userStatus: { required },
  },
  data: () => ({
    items: ['admin', 'editor', 'user'],
    email: '',
    password: '',
    username: '',
    userStatus: '',
    userData: {},
  }),
  methods: {
    async userSignUp(data) {
      try {
        const res = await axios.post(
          'http://localhost:8080/api/user/signup',
          data
        )
        console.log(res)
      } catch (error) {
        console.log(error + 'Please control your credentials')
      }
    },
    getFormValues() {
      if (this.$v.$invalid) {
        this.$v.$touch()
      } else {
        this.userData = {
          username: this.username,
          email: this.email,
          password: this.password,
          role: this.userStatus,
        }
        this.userSignUp(this.userData)
        setTimeout(() => {
          this.$router.push('/user/signin')
        }, 1000)
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
      !this.$v.password.required && errors.push('Password is required')
      !this.$v.password.hasLowerCase &&
        errors.push('Password must contain lowercase letter.')
      !this.$v.password.hasUpperCase &&
        errors.push('Password must contain uppercase letter.')
      !this.$v.password.minLength &&
        errors.push('Password should be minimum 8 characters')
      !this.$v.password.hasNumber && errors.push('Password must contain number')
      return errors
    },
    usernameErrors() {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('Username is required')
      !this.$v.username.alpha &&
        errors.push('Username should not contain numbers.')
      !this.$v.username.minLength &&
        errors.push('Username should be minimum 8 characters')
      return errors
    },
    userStatusErrors() {
      const errors = []
      if (!this.$v.userStatus.$dirty) return errors
      !this.$v.userStatus.required && errors.push('User Status is required')
      return errors
    },
  },
  created() {
    this.email = ''
    this.password = ''
    this.username = ''
    this.userStatus = ''
  },
}
</script>
<style scoped>
.error {
  color: white;
}
</style>
