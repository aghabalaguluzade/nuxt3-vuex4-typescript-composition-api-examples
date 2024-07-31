<script setup lang="ts">

</script>

<template>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex flex-shrink-0 items-center"></div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <NuxtLink
                to="/"
                class="px-3 py-2 text-sm font-medium text-white"
                aria-current="page">Home</NuxtLink>
              <NuxtLink
                to="/todoapp"
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >Todo</NuxtLink>
              <NuxtLink
                to="/products"
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >Products</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>