<script setup>
import { initFlowbite } from 'flowbite'
import NavBar from './NavBar.vue';

initFlowbite();
</script>

<template>
  <div>
    <header>
      <NavBar />
    </header>

    <section class="bg-white dark:bg-gray-900 container mx-auto px-4 lg:px-6 py-10">
      <div class="mx-auto w-full max-w-screen-xl">
        <slot></slot>
      </div>
    </section>

  </div>
</template>
