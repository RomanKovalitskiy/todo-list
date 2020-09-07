import Vue from "vue";
import Vuetify from "vuetify/lib";
// eslint-disable-next-line import/no-extraneous-dependencies
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
  },
});
