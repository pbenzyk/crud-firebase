<!----------Make By YourName---------------->
 <template>
  <div class="text-center">
    <v-dialog v-model="loading" persistent width="90">
      <v-card>
        <v-card-text class="pdt-20">
          <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-dialog>
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
    return {
      dialog: false
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
    loading: sync("loading/loading")
  },
  /*-------------------------Methods------------------------------------------*/
  methods: {
    /******* Methods default run ******/
    load: async function() {}
  }
};
</script>