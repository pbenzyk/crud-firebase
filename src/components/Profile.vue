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
                    :readonly="readonly"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="profile.lastname"
                    prepend-inner-icon="mdi-account"
                    label="Last name"
                    required
                    :readonly="readonly"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="profile.age"
                    prepend-inner-icon="mdi-emoticon"
                    label="Age"
                    required
                    :readonly="readonly"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="8">
                  <v-text-field
                    v-model="profile.address"
                    prepend-inner-icon="mdi-map"
                    label="Address"
                    required
                    :readonly="readonly"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="profile.phone"
                    prepend-inner-icon="mdi-cellphone"
                    label="Phone"
                    required
                    :readonly="readonly"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-list-item-content>

        <v-list-item-avatar tile size="80">
          <v-img src="https://pngimage.net/wp-content/uploads/2018/05/account-png-2.png"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" v-if="readonly" @click="clickUpdate()">Update Profile</v-btn>
        <v-btn color="success" v-else @click="saveUpdate()">Save Profile</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

    <script>
import { get, sync, call } from "vuex-pathify";
export default {
  name: "Root",
  components: {},
  props: {},
  data() {
    return {
      valid: false,
      readonly: true,
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
  async mounted() {
    this.load();
  },
  async beforeRouteEnter(to, from, next) {
    next();
  },
  computed: {
    profile: sync("user/profile")
  },
  methods: {
    getProfile: call("user/getProfile"),
    readData: call("manage/readData"),
    updateProfile: call("user/updateProfile"),
    clickUpdate() {
      this.readonly = false;
    },
    saveUpdate() {
      this.readonly = true;
      this.updateProfile();
    },

    load: async function() {
      await this.getProfile();
      await this.readData();
    }
  }
};
</script>