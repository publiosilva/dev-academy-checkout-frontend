import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../pages/home/Home.vue")
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () => import("../pages/checkout/Checkout.vue")
  },
  {
    path: "/create-product",
    name: "create-product",
    component: () => import("../pages/product/CreateProduct.vue")
  },
  {
    path: "/product-details",
    name: "product-details",
    component: () => import("../pages/product/ProductDetails.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
