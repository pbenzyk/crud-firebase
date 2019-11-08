<!----------Make By YourName---------------->
 <template>
  <div>
    <v-app-bar v-if="showNav" app color="primary" dark>
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
      <v-btn text @click="userLogout()">
        <v-icon>mdi-logout</v-icon>
        <span class="mr-2">Sign out</span>
      </v-btn>
    </v-app-bar>
  </div>
</template>

    <script>
import Swal from "sweetalert2";
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
    AuthUser: sync("user/AuthUser"),
    showNav: sync("user/showNav")
  },
  /*-------------------------Methods------------------------------------------*/
  methods: {
    logout: call("user/loguot"),
    setToken: call("user/setToken"),
    async userLogout() {
      Swal.fire({
        title: "Are you sure to sign out?",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then(async result => {
        await this.logout();
        if (result.value) {
          Swal.fire({
            title: "Sign out success!",
            // text: "Your file has been updated.",
            icon: "success",
            timer: 1100
          });
        }
      });
    },
    /******* Methods default run ******/
    load: async function() {
      this.setToken();
      if (window.localStorage.length <= 1) {
        this.show = false;
      } else {
        this.show = true;
      }
      console.log(window.localStorage.length);
    }
  }
};
</script>