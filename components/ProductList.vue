<script setup lang="ts">
import { useProducts } from "@/composables/products";

const { products, loading, fetchProducts, productIsInStock, addProductToCart } = useProducts();

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Product List</h1>
    <img
      v-if="loading"
      src="https://i.imgur.com/JfPpwOA.gif"
      alt="loading..."
      class="my-8 mx-auto"
    />
    <ul v-else>
      <li
        v-for="product in products"
        :key="product.id"
        class="border-b border-gray-200 py-4"
      >
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-semibold">{{ product.title }}</h2>
            <p class="text-gray-600">{{ $filters.currency(product.price) }}</p>
            <p v-if="product.inventory > 0" class="text-green-600">
              In stock: {{ product.inventory }}
            </p>
            <p v-else class="text-red-600">Out of stock</p>
          </div>
          <button
            :disabled="!productIsInStock"
            @click="addProductToCart(product)"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Add to Cart
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>