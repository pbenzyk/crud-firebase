<!----------Make By YourName---------------->
 <template>
  <div>
    <LoginForm />
  </div>
</template>

    <script>
import LoginForm from "../components/Login";
import { get, sync, call } from "vuex-pathify";
export default {
  name: "Root",
  /*-------------------------Load Component---------------------------------------*/
  components: { LoginForm },
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