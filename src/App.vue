<template>
  <v-app>
    <v-row>
      <!-- <Drawer /> -->
      <!-- <Navbar /> -->
      <v-content>
        <Navbar />
        <router-view />
      </v-content>
    </v-row>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import Drawer from "./components/Drawer";
import Index from "./views/Index";

export default {
  name: "App",

  components: {
    Index,
    Navbar,
    Drawer
  },

  data: () => ({
    //
  })
};
</script>
