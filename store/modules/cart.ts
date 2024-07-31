import shop from "~/api/shop";
import { useToast } from "vue-toastification";
import type { CartProductType, CartState } from "~/types/Cart";
import { ActionsCartEnum, CartMutationsEnum } from "~/constants/Cart";
import { ProductMutationsEnum } from "~/constants/Products";
import { Commit } from "vuex";

interface RootState {
    products: {
        products: CartProductType[];
    };
}

const state = {
    cartProducts: [],
    checkoutStatus: '',
    loading: false,
}

const getters = {
    cartProducts(state: CartState, getters: any, rootState: RootState) {
        return state.cartProducts.map(cartItem => {
            const product = rootState.products.products.find(product => product.id === cartItem.id);
            if (product) {
                return {
                    ...cartItem,
                    title: product.title,
                    price: product.price
                };
            } else {
                return cartItem;
            }
        });
    },
    cartTotal(state: CartState, getters: any) {
        return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
    }
}

const mutations = {
    [CartMutationsEnum.PushProductToCart](state: CartState, cart: CartProductType) {
        state.cartProducts.push({
            id: cart.id,
            title: cart.title,
            price: cart.price,
            quantity: 1
        });
    },
    [CartMutationsEnum.IncrementItemQuantity](state: CartState, cartItem: CartProductType) {
        cartItem.quantity++;
    },
    [CartMutationsEnum.EmptyCart](state: CartState) {
        state.cartProducts = [];
    },
    [CartMutationsEnum.SetCheckoutStatus](state: CartState, checkoutStatus: CartProductType) {
        state.checkoutStatus = checkoutStatus;
    }
}

const actions = {
    async [ActionsCartEnum.AddProductToCart]({ state, getters, commit }: { state: CartState, getters: any, commit: Commit }, product: CartProductType) {
        if (!getters.productIsInStock(product)) {
            return;
        }

        const cartItem = state.cartProducts.find(item => item.id === product.id);

        if (!cartItem) {
            commit(CartMutationsEnum.PushProductToCart, product);
            useToast().success('Add to Shopping Cart.');
        } else {
            commit(CartMutationsEnum.IncrementItemQuantity, cartItem);
        }
        commit(ProductMutationsEnum.DecrementProductInventory, product);
    },
    async [ActionsCartEnum.Checkout]({ state, commit }: { state: CartState, commit: Commit }) {
        try {
            await shop.buyProducts(
                state.cartProducts,
                () => {
                    commit(CartMutationsEnum.EmptyCart);
                    commit(CartMutationsEnum.SetCheckoutStatus, 'success');
                    useToast().success('Purchase completed successfully! Thank you for shopping with us.');
                },
                () => {
                    commit(CartMutationsEnum.SetCheckoutStatus, 'fail');
                    useToast().error('Oops! Something went wrong during checkout. Please try again later.');
                }
            );
        } catch (error) {
            console.error('Error during checkout:', error);
            commit(CartMutationsEnum.SetCheckoutStatus, 'fail');
            useToast().error('Oops! Something went wrong. Please try again later.');
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}   