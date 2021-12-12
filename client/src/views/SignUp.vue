<template>
  <v-container fluid center>
    <v-layout row wrap>
      <v-flex xs12 class="text-center" mt-5>
        <h1>Sign Up</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form>
          <v-layout column>
            <v-flex>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                type="email"
                required
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                type="password"
                required
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="username"
                label="Username"
                id="username"
                required
              ></v-text-field>
            </v-flex>
            <v-row align="center">
              <v-col class="d-flex" cols="12">
                <v-select :items="items" label="User Status"></v-select>
              </v-col>
            </v-row>
            <v-flex class="text-center" mt-5>
              <v-btn color="primary" type="submit">Sign Up</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: ['Admin', 'Editor', 'User'],
  }),
}
</script>
