import { ActionsCartEnum } from "~/constants/Cart";
import store from "~/store";

export function useCart() {
    const cartProducts = computed(() => store.state.cart.cartProducts);
    const total = computed<number>(() => store.getters.cartTotal);
    const checkoutStatusMessage = computed<string | null>(() => store.state.cart.checkoutStatus);

    const checkout = () => {
        store.dispatch(ActionsCartEnum.Checkout);
    };

    return {
        cartProducts,
        total,
        checkoutStatusMessage,
        checkout
    };
}