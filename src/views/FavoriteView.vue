<script setup>
import { onMounted, ref, computed } from 'vue';
import { useAuthStore } from '../store/auth';
import { useFavoriteStore } from '../store/favorite';
import ListFavoriteComponent from '../components/ListFavoriteComponent.vue';
import CollectionComponent from '../components/CollectionComponent.vue';

const authStore = useAuthStore()
const favStore = useFavoriteStore()

onMounted(() => {
    
    authStore.userLoged()
    
    //if(!favStore.collections.length){
        favStore.getCollections() 

        
   // }    
})

</script>

<template>
    <div class="antialiased bg-gray-50 dark:bg-gray-900 md:flex relative md:min-h-[800px]">
        <aside class="md:absolute  md:w-64 w-full md:h-full pt-1 md:pb-14 bg-white md:border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div class="overflow-y-auto pb-5 md:pt-5 px-3 h-full bg-white dark:bg-gray-800">
                <div class="py-3">
                    <span class="block text-sm font-semibold text-gray-900 dark:text-white">{{ authStore.userAuth.username }}</span>
                    <span class="block text-sm text-gray-900 truncate dark:text-white">{{ authStore.userAuth.email }}</span>
                </div>

                <div class="py-2">
                    <div class="flex items-center text-base font-medium text-gray-900 rounded-lg transition duration-75 group">
                        <svg class="mr-2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
                        </svg>
                        <span class="ml-3">Mis Colecciones</span>
                    </div>
                </div>

                <ul class="mt-2 space-y-2">
                    <template v-for="collection in favStore.collections" :key="collection._id">
                        <CollectionComponent :collection="collection" />
                    </template>
                </ul>
            </div>
        </aside>
        <section class="p-4 h-auto md:ml-64 w-full">
            <div class="mb-4 grid gap-4 sm:grid-cols-1 md:mb-8 lg:grid-cols-2 xl:grid-cols-3 px-8">
                <template v-for="favorite in favStore.favorites" :key="favorite._id" v-if="favStore.favorites.length">
                    <ListFavoriteComponent :list="favorite" />
                </template>
                <div v-else class="col-span-3 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span class="font-medium">No hay libros agregados a esta colección</span>
                </div>
            </div>
        </section>
    </div>
</template>