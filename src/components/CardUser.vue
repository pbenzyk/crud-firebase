<!----------Make By YourName---------------->
 <template>
  <v-container>
    <v-row justify="center">
      <v-card class="md4 sm12 mr-4" width="362" v-for="cards, i in usCard" :key="i">
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="headline">{{cards.firstname+" "+cards.lastname}}</v-card-title>

            <v-card-subtitle>
              Age: {{cards.age}}
              <br />
              Phone: {{cards.phone}}
              <br />
              Address: {{cards.address}}
            </v-card-subtitle>
          </div>

          <v-avatar class="ma-3" size="115" tile>
            <v-img src="https://pngimage.net/wp-content/uploads/2018/05/account-png-2.png"></v-img>
          </v-avatar>
        </div>
        <v-card-actions>
          <v-btn color="deep-purple accent-4" dark>
            <v-icon left>mdi-pencil</v-icon>edit user
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
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
    usCard: sync("manage/userCard")
  },
  /*-------------------------Methods------------------------------------------*/
  methods: {
    readData: call("manage/readData"),
    /******* Methods default run ******/
    load: async function() {
      await this.readData();
      console.log("data", this.usCard);
    }
  }
};
</script>