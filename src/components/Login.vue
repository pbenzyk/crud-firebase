<!----------Make By YourName---------------->
 <template>
  <div>
    <v-card class="mx-auto mrt-50" max-width="400">
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&w=1000&q=80"
      >
        <!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
      </v-img>

      <v-card-text class="text--primary">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-col cols="12" md="12">
            <v-text-field v-model="form.email" :rules="emailRules" label="E-mail" required></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="form.password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" block @click="submit()">Login</v-btn>

        <!-- <v-btn color="orange">Explore</v-btn> -->
      </v-card-actions>
    </v-card>
  </div>
</template>

    <script>
import { get, sync, call } from "vuex-pathify";
export default {
  name: "Login",
  /*-------------------------Load Component---------------------------------------*/
  components: {},
  /*-------------------------Set Component---------------------------------------*/
  props: {},
  /*-------------------------DataVarible---------------------------------------*/
  data() {
    return {
      valid: true,
      //   email: "",
      //   password: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      show1: false,
      password: "Password",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
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
    form: sync("user/login")
  },
  /*-------------------------Methods------------------------------------------*/
  methods: {
    Login: call("user/login"),
    setToken: call("user/setToken"),
    async submit() {
      this.$refs.form.validate();
      await this.Login();
    },
    /******* Methods default run ******/
    load: async function() {
      this.setToken();
    }
  }
};
</script>