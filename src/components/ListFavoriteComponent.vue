<script setup>

defineProps({
    list: Object
})

</script>

<template>
    <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div class="h-56 w-full">
            <a href="#">
                <img class="mx-auto h-full" :src="list.cover"/>
            </a>
        </div>
        <div class="pt-6">
            <a href="#" class="text-lg font-bold leading-tight text-gray-900 hover:underline dark:text-white">{{ list.title }}</a>
            <ul class="mt-2 items-center gap-4">
                <li class="flex items-center">
                    <p class="text-sm font-medium text-gray-700 dark:text-gray-400"><strong>Categoria:</strong> {{ list.category }}</p>
                </li>
            </ul>

            <div class="mt-4 flex items-center justify-between gap-4">
                <p class="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">S/. {{ list.price }}</p>
            </div>
        </div>
    </div>
</template>

