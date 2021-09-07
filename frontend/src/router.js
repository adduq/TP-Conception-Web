// import Vue from 'vue'
// import VueRouter from 'vue-router'

// import ExampleComponent from '@/components/ExampleComponent.vue'

// const routes = [
//   {path: '*', component: ExampleComponent}
// ]

// Vue.use(VueRouter)
// const router = new VueRouter({
//   scrollBehavior (to, from, savedPosition) { return {x: 0, y: 0} },
//   mode: 'history',
//   routes
// })

// export default router

import { createRouter, createWebHistory } from "vue-router";
import store from "./store";
import Home from "./views/Home.vue";

import Product from "./views/Product.vue";
import Category from "./views/Category.vue";
import Search from "./views/Search.vue";
import Cart from "./views/Cart.vue";
import SignUp from "./views/SignUp.vue";
import LogIn from "./views/LogIn.vue";
import MyAccount from "./views/MyAccount.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/search",
    name: "Search",
    component: Search
  },
  {
    path: "/inscription",
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/connexion",
    name: "LogIn",
    component: LogIn
  },
  {
    path: "/mon-compte",
    name: "MyAccount",
    component: MyAccount,
    meta: {
      requireLogin: true
    }
  },
  {
    path: "/panier",
    name: "Cart",
    component: Cart
  },
  {
    path: "/:category_slug/:product_slug/",
    name: "Product",
    component: Product
  },
  {
    path: "/:category_slug/",
    name: "Category",
    component: Category
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some(record => record.meta.requireLogin) &&
    !store.state.isAuthenticated
  ) {
    next({ name: "LogIn", query: { to: to.path } });
  } else {
    next();
  }
});

export default router;
