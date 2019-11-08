<!----------Make By YourName---------------->
 <template>
  <v-container>
    <v-card class="mx-auto mr-10 pd-10" outlined shaped>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">User Profile</v-list-item-title>
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="profile.firstname"
                    prepend-inner-icon="mdi-account"
                    label="First name"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="profile.lastname"
                    prepend-inner-icon="mdi-account"
                    label="Last name"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="profile.age"
                    prepend-inner-icon="mdi-emoticon"
                    label="Age"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="8">
                  <v-text-field
                    v-model="profile.address"
                    prepend-inner-icon="mdi-map"
                    label="Address"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="profile.phone"
                    prepend-inner-icon="mdi-cellphone"
                    label="Phone"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="updateProfile()">Update Profile</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-container>
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
    return {
      valid: false,
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 10 || "Name must be less than 10 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
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
    profile: sync("user/profile")
  },
  /*-------------------------Methods------------------------------------------*/
  methods: {
    getProfile: call("user/getProfile"),
    readData: call("manage/readData"),
    updateProfile: call("user/updateProfile"),
    /******* Methods default run ******/
    load: async function() {
      await this.getProfile();
      await this.readData();
    }
  }
};
</script>