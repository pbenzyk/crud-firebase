 <template>
  <v-container>
    <v-card outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">Manage Users</v-list-item-title>
        </v-list-item-content>
        <v-btn class="mx-2" fab dark color="indigo" @click="dialogUser = true">
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
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="formProfile.firstname" label="First name*" required></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="formProfile.lastname" label="Last name*" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="formProfile.age" label="Age*" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="formProfile.phone" label="Phone*" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="formProfile.address" label="Address*" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="formUser.email" label="Email*" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="formUser.password"
                    label="Password*"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogUser = false">Close</v-btn>
            <v-btn color="success" @click="addUser()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

  <script>
import CardUser from "./CardUser";
import { get, sync, call } from "vuex-pathify";
export default {
  name: "Root",
  components: { CardUser },
  props: {},
  data() {
    return {
      show1: false,
      password: "",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match",
        email: v => /.+@.+/.test(v) || "E-mail must be valid"
      }
    };
  },
  async mounted() {
    this.load();
  },
  async beforeRouteEnter(to, from, next) {
    next();
  },
  computed: {
    formProfile: sync("manage/formProfile"),
    formUser: sync("manage/formUser"),
    usCard: sync("manage/userCard"),
    dialogUser: sync("manage/dialogUser")
  },
  methods: {
    addUser: call("manage/addUser"),
    submit() {
      console.log("formUser", this.formUser);
    },
    load: async function() {}
  }
};
</script>