<template>
  <v-app>
    <v-row>
      <!-- <Drawer /> -->
      <!-- <Navbar /> -->
      <v-content>
        <Navbar />
        <Loading />
        <router-view />
      </v-content>
    </v-row>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import Drawer from "./components/Drawer";
import Loading from "./components/loading";
import Index from "./views/Index";

export default {
  name: "App",

  components: {
    Index,
    Navbar,
    Drawer,
    Loading
  },

  data: () => ({
    //
  })
};
</script>
