<!----------Make By YourName---------------->
 <template>
  <v-container>
    <v-card outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">
            <v-icon large>mdi-account</v-icon>&nbsp;Manage Users
          </v-list-item-title>
        </v-list-item-content>
        <v-btn class="mx-2"  fab dark color="indigo" @click="dialogUser = true">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </v-list-item>
    </v-card>
    <CardUser />
    <div class="text-center">
      <v-dialog v-model="dialogUser" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>Add User</v-card-title>
          <v-card-text>
            <v-container>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      :rules="[rules.required]"
                      v-model="formProfile.firstname"
                      label="First name*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      :rules="[rules.required]"
                      v-model="formProfile.lastname"
                      label="Last name*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      :rules="[rules.required]"
                      v-model="formProfile.age"
                      label="Age*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      :rules="[rules.required]"
                      v-model="formProfile.phone"
                      label="Phone*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      :rules="[rules.required]"
                      v-model="formProfile.address"
                      label="Address*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      :rules="[rules.required, rules.email]"
                      v-model="formUser.email"
                      label="Email*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      :rules="[rules.required]"
                      v-model="formUser.password"
                      label="Password*"
                      type="password"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogUser = false">Close</v-btn>
            <v-btn color="success" @click="submit()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

  <script>
import CardUser from "./CardUser";
import { get, sync, call } from "vuex-pathify";
import Swal from "sweetalert2";
export default {
  name: "Root",
  /*-------------------------Load Component---------------------------------------*/
  components: { CardUser },
  /*-------------------------Set Component---------------------------------------*/
  props: {},
  /*-------------------------DataVarible---------------------------------------*/
  data() {
    return {
      valid: true,
      show1: false,
      password: "",
      rules: {
        required: v => !!v || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match",
        email: v => /.+@.+/.test(v) || "E-mail must be valid"
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
    formProfile: sync("manage/formProfile"),
    formUser: sync("manage/formUser"),
    usCard: sync("manage/userCard"),
    dialogUser: sync("manage/dialogUser")
  },
  /*-------------------------Methods------------------------------------------*/
  methods: {
    addUser: call("manage/addUser"),
    async submit() {
      // await this.addUser();
      // console.log("formUser", this.formUser);
      if (this.$refs.form.validate()) {
        Swal.fire({
          title: "Are you sure?",
          text: "create and login to new user!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
        }).then(async result => {
          if (result.value) {
            Swal.fire("Success!", "Your login has been success.", "success");
            await this.addUser();
          }
        });
      }
    },
    /******* Methods default run ******/
    load: async function() {}
  }
};
</script>