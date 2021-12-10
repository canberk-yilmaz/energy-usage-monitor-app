<template>
  <div>
    <Navbar />
    <TheHomepage />
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import TheHomepage from "../components/TheHomepage";

export default {
  name: "Home",

  components: {
    TheHomepage,
    Navbar,
  },
};
</script>
