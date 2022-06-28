<template>
  <div>
    <v-container fluid fill-height>
      <v-row class="main-row" align="center" justify="center">
        <v-col>
          <v-flex xs12 class="text-center" mt-5>
            <h1>{{ $t('navbar.appTitleL') }}</h1>
          </v-flex>
          <v-flex xs12 sm6 offset-sm3 mt-3>
            <blockquote class="blockquote text-center">
              {{ $t('homepage.bl1') }} <br />
              {{ $t('homepage.bl2') }} <br />
              -PosgreSQL <br />
              -MongoDB <br />
              -Node.js <br />
              -Vue.js
            </blockquote>
          </v-flex>
          <v-flex
            v-if="!this.$store.state.user"
            xs12
            sm6
            offset-sm3
            class="text-center"
            mt-5
          >
            <v-btn class="mr-8" color="primary" to="/user/signup">{{ $t('signUp') }}</v-btn>
            <v-btn to="/user/signin">{{ $t('signIn') }}</v-btn>
          </v-flex>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'TheHomepage',
  data: () => ({}),
}
</script>
<style scoped>
.main-row {
  height: calc(100vh - 64px);
}
</style>
