<!----------Make By YourName---------------->
 <template>
  <div>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center"></div>

      <v-spacer></v-spacer>

      <v-btn href="/#/profile" text>
        <v-icon>mdi-account</v-icon>
        <span class="mr-2">Profile</span>
      </v-btn>
      <v-btn href="/#/manageusers" text>
        <v-icon>mdi-settings</v-icon>
        <span class="mr-2">Manage users</span>
      </v-btn>
      <v-btn text @click="logout()">
        <v-icon>mdi-logout</v-icon>
        <span class="mr-2">Sign out</span>
      </v-btn>
    </v-app-bar>
  </div>
</template>

    <script>
import { get, sync, call } from "vuex-pathify";
export default {
  name: "Root",
  /*-------------------------Load Component---------------------------------------*/
  components: {},
  /*-------------------------Set Component---------------------------------------*/
  props: {},
  /*-------------------------DataVarible---------------------------------------*/
  data() {
    return {};
  },
  /*-------------------------Run Methods when Start this Page------------------------------------------*/
  async mounted() {
    /**** Call loading methods*/
    this.load();
  },
  /*-------------------------Run Methods when Start Routed------------------------------------------*/
  async beforeRouteEnter(to, from, next) {
    next();
  },
  /*-------------------------Vuex Methods and Couputed Methods------------------------------------------*/
  computed: {
    AuthUser: sync("user/AuthUser")
  },
  /*-------------------------Methods------------------------------------------*/
  methods: {
    logout: call("user/loguot"),
    setToken: call("user/setToken"),
    /******* Methods default run ******/
    load: async function() {
      this.setToken();
    }
  }
};
</script>