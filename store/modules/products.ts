import { useToast } from 'vue-toastification';
import shop from '~/api/shop';
import { ActionsProductEnum, ProductMutationsEnum } from '~/constants/Products';
import type { ProductState, ProductType } from '~/types/Products';
import { Commit } from 'vuex';

const state = {
    loading: false,
    products: []
}

const getters = {
    availableProducts(state: ProductState) {
        return state.products.filter(product => product.inventory > 0);
    },
    productIsInStock(state: ProductState) {
        return (product) => {
            if (product.inventory > 0) {
                return true;
            } else {
                useToast().error('Out of stock.');
                return false;
            }
        };
    },
}

const mutations = {
    [ProductMutationsEnum.SetProducts](state: ProductState, products: ProductType) {
        state.products = products;
    },
    [ProductMutationsEnum.DecrementProductInventory](state: ProductState, product: ProductType) {       
        product.inventory--;
    },
}

const actions = {
    async [ActionsProductEnum.FetchProducts]({ state, commit }: { state: ProductState, commit: Commit }) {
        state.loading = true;
        const fetchedProduct = await shop.getProducts();
        commit(ProductMutationsEnum.SetProducts, fetchedProduct);
        state.loading = false;
    },
    async [ActionsProductEnum.DecrementProductInventory]({ commit }: { commit: Commit }, product: ProductType) {
        commit(ProductMutationsEnum.DecrementProductInventory, product);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}