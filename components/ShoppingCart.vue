<script setup lang="ts">
import { useCart } from "@/composables/cart";

const { cartProducts, total, checkoutStatusMessage, checkout } = useCart();
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Shopping Cart</h1>
    <ul>
      <li
        v-for="product in cartProducts"
        :key="product.id"
        class="border-b border-gray-200 py-4"
      >
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-semibold">{{ product.title }}</h2>
            <p class="text-gray-600">
              {{ $filters.currency(product.price) }} x {{ product.quantity }}
            </p>
          </div>
          <p class="text-xl font-bold">
            {{ $filters.currency(product.price * product.quantity) }}
          </p>
        </div>
      </li>
    </ul>
    <div class="mt-4 flex justify-end items-center">
      <p class="text-xl font-bold">Total: {{ $filters.currency(total) }}</p>
      <button
        @click="checkout"
        class="ml-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Checkout
      </button>
    </div>
  </div>
</template>