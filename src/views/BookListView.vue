<script setup>
import { Modal } from 'flowbite'
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../store/auth';
import { useBookStore } from '../store/book';
import ModalCollectionComponent from '../components/ModalCollectionComponent.vue';
import { useFavoriteStore } from '../store/favorite';


const authStore = useAuthStore()
const bookStore = useBookStore()
const idBook = ref('')
let modal

onMounted(() => {
    if(!bookStore.books.length){
        bookStore.getBooks()
    }

    const $modalElement = document.querySelector('#collection-modal');
    const modalOptions = {
        backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40 modalCollection',
        backdrop: 'static',
    }

    if ($modalElement) {
        modal = new Modal($modalElement, modalOptions);
    }
})

const addBookFavorite = (id) => {
    idBook.value = id
    modal.show()
}

const closeModal = () => {
    modal.hide()
}


</script>
     
<template>
    <section class="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
        <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4 px-8">
                <template v-for="book in bookStore.books" :key="book._id">
                    <div
                    class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div class="h-56 w-full">
                        <a href="#">
                            <img class="mx-auto h-full" :src="book.cover"/>
                        </a>
                    </div>
                    <div class="pt-6">
                        <a href="#"
                            class="text-lg font-bold leading-tight text-gray-900 hover:underline dark:text-white">{{ book.title }}</a>
                        <ul class="mt-2 items-center gap-4">
                            <li class="flex items-center mb-2">
                                <p class="text-sm font-medium text-gray-700 dark:text-gray-400"><strong>Autor:</strong> {{ book.author }}</p>
                            </li>
                            <li class="flex items-center">
                                <p class="text-sm font-medium text-gray-700 dark:text-gray-400"><strong>Categoria:</strong> {{ book.category }}</p>
                            </li>
                        </ul>

                        <div class="mt-4">
                            <p class="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">S/. {{ book.price }}</p>

                            <button
                                v-if="authStore.isAuthenticated"
                                type="button" 
                                class="w-full text-center mt-10 rounded-lg bg-primary-700 px-5 py-2.5 text-base font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                                @click="addBookFavorite(book._id)"
                                >
                                Agregar Libro
                            </button>
                            <router-link
                                v-else
                                :to="{ name: 'login' }"
                                class="w-full block text-center mt-10 rounded-lg bg-primary-700 px-5 py-2.5 text-base font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300">
                                Agregar Libro
                            </router-link>
                        </div>
                    </div>
                    </div>
                </template>
            </div>
        </div>
    </section>
    <ModalCollectionComponent 
        :idBook="idBook" 
        @close="closeModal" />
</template>