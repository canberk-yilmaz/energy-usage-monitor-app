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
          {{ $t('navbar.appTitleL') }}
        </v-list-item>
        <div v-if="!this.$store.state.user">
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
        </div>
        <div v-if="this.$store.state.user">
          <v-list-item to="/">
            {{ $t('navbar.home') }}
          </v-list-item>
          <v-list-item to="/dashboard">
            {{ $t('navbar.dashboardLow') }}
          </v-list-item>
          <v-list-item to="/user/settings">
            {{ $t('navbar.userSettingsL') }}
          </v-list-item>
          <v-list-item @click="logout">
            {{ $t('navbar.signOutL') }}
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="sidebar = !sidebar"> </v-app-bar-nav-icon>
      <v-toolbar-title class="h2 font-weight-medium hidden-sm-and-down">
        {{ $t('navbar.appTitleL') }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items
        v-if="!this.$store.state.user"
        class="hidden-xs-and-down"
        v-show="!sidebar"
      >
        <v-btn text v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>

      <v-toolbar-title
        v-if="this.$store.state.user"
        class="hidden-sm-and-down"
        v-show="!sidebar"
      >
        <v-btn text :to="'/dashboard'">
          <v-icon left dark>mdi-view-dashboard</v-icon>
          {{ $t('navbar.dashboard') }}
        </v-btn>
      </v-toolbar-title>

      <v-toolbar-title
        v-if="this.$store.state.user"
        class="hidden-sm-and-down"
        v-show="!sidebar"
      >
        <v-btn text :to="'/user/settings'">
          <v-icon left dark>mdi-account-cog</v-icon>
          {{ $t('navbar.userSettings') }}
        </v-btn>
      </v-toolbar-title>
      <v-toolbar-title
        v-if="this.$store.state.user"
        class="hidden-sm-and-down"
        v-show="!sidebar"
      >
        <v-btn text @click="logout">
          <v-icon left dark>mdi-logout</v-icon>
          {{ $t('navbar.signOut') }}
        </v-btn>
      </v-toolbar-title>

      <v-btn disabled v-if="this.$store.state.user">
        {{ this.$store.state.user.username }}
      </v-btn>
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
import i18n from '@/i18n'

export default {
  name: 'Navbar',
  data() {
    return {
      appTitle: i18n.t('navbar.appTitleL'),
      sidebar: false,
      menuItems: [
        { title: i18n.t('navbar.home'), path: '/', icon: 'mdi-home' },
        {
          title: i18n.t('navbar.signUp'),
          path: '/user/signup',
          icon: 'mdi-face-man',
        },
        {
          title: i18n.t('navbar.signIn'),
          path: '/user/signin',
          icon: 'mdi-lock-open-outline',
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
      location.reload()
    },
    logout() {
      this.$store.dispatch('logout')
      //this.$route.push('/signin')
    },
  },
}
</script>
<style scoped></style>
