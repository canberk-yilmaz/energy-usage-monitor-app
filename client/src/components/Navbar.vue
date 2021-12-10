<template>
  <nav>
    <v-app-bar app text color="indigo" dark>
      <v-toolbar-title class="logo text-uppercase grey--text text--lighten-2">
        <span class="font-weight-light">Canberk</span>
        <span class="font-weight-bold">Yılmaz</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-col cols='auto'>
        <v-select
          v-model="select"
          :items="languages"
          item-text="language"
          item-value="language"
          label="Select"
          persistent-hint
          return-object
          single-line
        ></v-select>
      </v-col>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      select: { language: "Turkish", abbr: "TR" },
      languages: [
        { language: "Turkish", abbr: "TR" },
        { language: "English", abbr: "EN" },
      ],
    };
  },
};
</script>

<style scoped></style>
