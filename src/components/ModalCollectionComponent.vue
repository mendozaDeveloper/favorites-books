<script setup>
import { computed, onMounted } from 'vue';
import { useAuthStore } from '../store/auth';
import { useFavoriteStore } from '../store/favorite';

const authStore = useAuthStore()
const favStore = useFavoriteStore()

defineProps({
    idBook: {
        type: String,
        required: true
    }
})
onMounted(() => {    
    authStore.userLoged()
    
   if(!favStore.collections.length){
        favStore.getCollections()
    }
})

    


const handlerAddBook = async(idBook, idCollection) => {
    await favStore.addBook(idBook, idCollection)
    if(favStore.addFavorites === 'success'){
        alert('El libro se agregó con éxito');
        closeModal()
    }
    
}


const emit = defineEmits(['close']);
const closeModal = () =>{
    emit('close');
}

</script>

<template>
    
    <div 
        id="collection-modal" 
        tabindex="-1" 
        aria-hidden="true"
        class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Colecciones</h3>
                    <button 
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        @click="closeModal"
                        >
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>
                <div class="p-4 md:p-5">
                    <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Agregar el libro a una de las siguientes colecciones:</p>
                    <ul class="my-4 space-y-3">
                        <template v-for="collection in favStore.collections" :key="collection._id">
                            <li v-if="!favStore.isCollectionHidden">
                                <button
                                    class="w-full p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                                    data-modal-hide="collection-modal"
                                    @click="handlerAddBook(idBook, collection._id)"
                                    >
                                        <span class="flex ms-3">
                                            {{ collection.name }}
                                        </span>
                                </button>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>