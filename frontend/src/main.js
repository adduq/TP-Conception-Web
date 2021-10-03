import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "./assets/reset.css";

require("dotenv").config();

axios.defaults.baseURL = process.env.VUE_APP_AXIOS_URL;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

createApp(App)
	.use(store)
	.use(router, axios)
	.mount("#app");
