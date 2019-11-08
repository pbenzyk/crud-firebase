<!----------Make By YourName---------------->
 <template>
  <div>
    <Profile />
  </div>
</template>

    <script>
import Profile from "../components/Profile";
import { get, sync, call } from "vuex-pathify";
export default {
  name: "Root",
  /*-------------------------Load Component---------------------------------------*/
  components: { Profile },
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
  computed: {},
  /*-------------------------Methods------------------------------------------*/
  methods: {
    /******* Methods default run ******/
    load: async function() {}
  }
};
</script>