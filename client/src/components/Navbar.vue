<template>
  <nav>
    <v-app-bar app text color="indigo" dark>
      <v-toolbar-title class="logo text-uppercase grey--text text--lighten-2">
        <span class="font-weight-light">Canberk</span>
        <span class="font-weight-bold">Yılmaz</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-col cols="1">
        <v-select
          v-model="selectedLang"
          :items="langs"
          item-text="language"
          item-value="abbr"
          return-object
          @change="changeLang"
        ></v-select>
      </v-col>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      selectedLang: { language: 'English', abbr: 'en' },
      langs: [
        { language: '🇬🇧English', abbr: 'en' },
        { language: '🇹🇷Turkish', abbr: 'tr' },
      ],
    }
  },
  methods: {
    changeLang(e) {
      this.$root.$i18n.locale = e.abbr
    },
  },
}
</script>

<style scoped></style>
