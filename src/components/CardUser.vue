<!----------Make By YourName---------------->
 <template>
  <v-container>
    <v-row justify="start">
      <v-card
        class="md4 sm12 mr-4"
        width="362"
        v-for="cards, i in usCard"
        :key="i"
        v-if="checkEmail != cards.email"
      >
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="headline">{{cards.firstname+" "+cards.lastname}}</v-card-title>

            <v-card-subtitle>
              Age: {{cards.age}}
              <br />
              Phone: {{cards.phone}}
              <br />
              Address: {{cards.address}}
              <br />
              e-mail: {{cards.email}}
            </v-card-subtitle>
          </div>

          <v-avatar class="ma-3" size="100" tile>
            <v-img src="https://pngimage.net/wp-content/uploads/2018/05/account-png-2.png"></v-img>
          </v-avatar>
        </div>
        <v-card-actions>
          <v-btn color="deep-purple accent-4" block dark @click="clickUpdate(cards.email)">
            <v-icon left>mdi-pencil</v-icon>edit user
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
    <div class="text-center">
      <v-dialog v-model="dialogEditUser" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>Update User</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="formUpdateProfile.firstname" label="First name*" required></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="formUpdateProfile.lastname" label="Last name*" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="formUpdateProfile.age" label="Age*" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="formUpdateProfile.phone" label="Phone*" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="formUpdateProfile.address" label="Address*" required></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogEditUser = false">Close</v-btn>
            <v-btn color="success" @click="saveUpdate()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
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
    return {
      checkEmail: localStorage.getItem("e-mail")
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
    usCard: sync("manage/userCard"),
    dialogEditUser: sync("manage/dialogEditUser"),
    formUpdateProfile: sync("manage/formUpdateProfile"),
    readEmail: sync("manage/readEmail")
  },
  /*-------------------------Methods------------------------------------------*/
  methods: {
    readData: call("manage/readData"),
    getProfileUpdate: call("manage/getProfileUpdate"),
    updateProfileUpdate: call("manage/updateProfileUpdate"),
    clickUpdate: async function(email) {
      console.log("clickUpdate", email);
      this.readEmail = email;
      await this.getProfileUpdate();
      this.dialogEditUser = true;
    },
    saveUpdate: async function() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then(async result => {
        await this.updateProfileUpdate();
        if (result.value) {
          Swal.fire({
            title: "Success!",
            text: "Your file has been updated.",
            icon: "success",
            timer: 1100
          });
        }
      });
    },
    /******* Methods default run ******/
    load: async function() {
      await this.readData();
      console.log("data", this.usCard);
    }
  }
};
</script>