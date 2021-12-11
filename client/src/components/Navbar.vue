<template>
  <div>
    <v-navigation-drawer
      class="flex-row"
      v-model="sidebar"
      app
      mobile-breakpoint="0"
    >
      <v-list>
        <v-list-item class="h2 font-weight-medium">
          {{ appTitle }}
        </v-list-item>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="sidebar = !sidebar"> </v-app-bar-nav-icon>
      <v-toolbar-title class="h2 font-weight-medium hidden-sm-and-down">
        {{ appTitle }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-and-down" v-show="!sidebar">
        <v-btn text v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="text-uppercase" v-bind="attrs" v-on="on" text>
              <v-icon left>mdi-translate</v-icon>
              {{ $root.$i18n.locale }}
              <v-icon small right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item
              v-model="selectedLang"
              v-for="(lang, index) in langs"
              :key="index"
              @click="changeLang(lang)"
            >
              <v-list-item-title>{{ lang.language }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      appTitle: 'Energy Usage Monitor App',
      sidebar: false,
      menuItems: [
        { title: 'Home', path: '/', icon: 'mdi-home' },
        { title: 'Sign Up', path: '/signup', icon: 'mdi-face-man' },
        { title: 'Sign In', path: '/signin', icon: 'mdi-lock-open-outline' },
        {
          title: 'User Settings',
          path: '/settings',
          icon: 'mdi-account-cog',
        },
      ],
      selectedLang: localStorage.getItem('lang') || 'en',
      langs: [
        { language: '🇬🇧 EN', abbr: 'en' },
        { language: '🇹🇷 TR', abbr: 'tr' },
      ],
    }
  },
  methods: {
    changeLang(lang) {
      localStorage.setItem('lang', lang.abbr)
      this.$root.$i18n.locale = lang.abbr
      console.log(lang)
    },
  },
}
</script>
<style scoped></style>
