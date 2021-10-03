import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "./assets/reset.css";

axios.defaults.baseURL = process.env.VUE_APP_AXIOS_URL;

// ! Note: Fonctionne !
// if (process.env.VUE_APP_AXIOS_URL === undefined)
// 	axios.defaults.baseURL = "https://api-communoservice.herokuapp.com/";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

createApp(App)
	.use(store)
	.use(router, axios)
	.mount("#app");
