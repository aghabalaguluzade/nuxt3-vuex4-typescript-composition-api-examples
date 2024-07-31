<script setup lang="ts">
import TheNavigation from '~/components/TheNavigation.vue';
</script>

<template>
    <TheNavigation />
    <NuxtPage />
</template>

<style>
    .nuxt-link-exact-active {
        font-weight: bolder;
        color: rgb(229, 231, 235);
        background-color: rgb(34, 197, 94);
   }
</style>