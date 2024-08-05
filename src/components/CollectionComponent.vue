<script setup>
import { useFavoriteStore } from '../store/favorite';
import { useRoute } from 'vue-router';
const route = useRoute()
const favStore = useFavoriteStore()

defineProps({
    collection: Object
})

const showFavorites = async (id) => {
    let elm = id
    await favStore.getFavorites(elm)
}

</script>

<template>
    <li>
        <router-link 
        :to="{
            name: 'favorite-user',
            params: {id: collection._id}
        }"
        @click="showFavorites(collection._id)"
        :class="{
            'bg-blue-600 text-white': route.params.id === collection._id
        }"
        class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-blue-600 hover:text-white group">
            <span class="ml-3">{{ collection.name }}</span>
        </router-link>
    </li>
</template>