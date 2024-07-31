import { ActionsCartEnum } from "~/constants/Cart";
import { ActionsProductEnum } from "~/constants/Products";
import store from "~/store";
import type { ProductType } from "~/types/Products";

export function useProducts() {
    const products: ComputedRef<ProductType[]> = computed(() => store.state.products.products);
    const loading: ComputedRef<ProductType[]> = computed(() => store.state.products.loading);

    const fetchProducts = () => {
        store.dispatch(ActionsProductEnum.FetchProducts);
    };

    const productIsInStock = (product: ProductType) => {        
        return product.inventory > 0;
    };

    const addProductToCart = (product: ProductType) => {
        store.dispatch(ActionsCartEnum.AddProductToCart, product);
    };

    return {
        products,
        loading,
        fetchProducts,
        productIsInStock,
        addProductToCart
    };
}