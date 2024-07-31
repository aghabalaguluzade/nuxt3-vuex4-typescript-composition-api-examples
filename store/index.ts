import { createStore } from 'vuex';
import todosModule from './modules/todo';
import productsModule from './modules/products';
import cartModule from './modules/cart';

export default createStore({
  modules: {
    todos : todosModule,
    products : productsModule,
    cart : cartModule
  }
});