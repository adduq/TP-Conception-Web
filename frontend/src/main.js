import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from "axios";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

createApp(App)
  .use(store)
  .use(router, axios)
  .mount("#app");

// import * as Sentry from "@sentry/vue"
// import { Integrations } from "@sentry/tracing";

// import App from "@/App.vue";
// import "./registerServiceWorker";

// Vue.config.productionTip = false;

// Sentry for logging frontend errors
// Sentry.init({
//   Vue: Vue,
//   dsn: process.env.VUE_APP_SENTRY_PUBLIC_DSN,
//   integrations: [new Integrations.BrowserTracing()],
//   tracingOptions: {
//     trackComponents: true,
//   },
//   logError: process.env.NODE_ENV === 'development'
// });

// new Vue({
//   router,
//   store,

//   render: h => h(App)
// }).$mount("#app");
