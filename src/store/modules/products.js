import { productService } from "@/services";

const state = {
  products: [],
  product: {},
  productForm: {
    id: "",
    name: "",
    description: "",
    price: "",
    brand: ""
  }
};

const getters = {
  totalValue(state) {
    return state.products.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    );
  }
};

const actions = {
  fetchAllProducts({ commit }) {
    return productService.getAll().then(response => {
      const products = [...response.data].map(product => ({
        ...product,
        quantity: 0
      }));

      commit("setProducts", products);
    });
  },

  fetchProductById({ state, commit }) {
    return productService.getById(state.productForm.id).then(response => {
      const product = response.data;

      commit("setProduct", product);
    });
  },

  createProduct({ state }) {
    return productService.create(state.productForm).then(() => {
      state.productForm.id = "";
      state.productForm.name = "";
      state.productForm.description = "";
      state.productForm.price = "";
      state.productForm.brand = "";
    });
  }
};

const mutations = {
  decreaseProductQuantity(state, productId) {
    const product = state.products.find(product => product.id === productId);
    if (product.quantity > 0) product.quantity--;
  },
  increaseProductQuantity(state, productId) {
    const product = state.products.find(product => product.id === productId);
    product.quantity++;
  },
  setProducts(state, payload) {
    state.products = payload;
  },
  setProduct(state, payload) {
    state.product = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
