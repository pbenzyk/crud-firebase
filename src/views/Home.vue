<!----------Make By YourName---------------->
 <template>
  <div>
    <ManageUser />
  </div>
</template>

  <script>
import ManageUser from "../components/ManageUser";
import { get, sync, call } from "vuex-pathify";
export default {
  name: "Root",
  /*-------------------------Load Component---------------------------------------*/
  components: { ManageUser },
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
    AuthUser: sync("user/AuthUser")
  },
  /*-------------------------Methods------------------------------------------*/
  methods: {
    setToken: call("user/setToken"),
    /******* Methods default run ******/
    load: async function() {
      this.setToken();
    }
  }
};
</script>