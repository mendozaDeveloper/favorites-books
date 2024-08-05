import { defineStore } from "pinia";
import api from "../plugins/axios";
import { ref } from "vue";
import { useAuthStore } from "./auth";

export const useFavoriteStore = defineStore('favorite', () => {
    const authStore = useAuthStore()
    const collections = ref([])
    const favorites = ref([])

    const getCollections = async() => {
        try {
            const res = await api({
                method: 'GET',
                url: '/collections',
                headers: {
                    Authorization: "Bearer " + authStore.token
                }
            })            
            collections.value = res.data.data
        } catch (error) {
            if(error.response){
                throw error.response.data
            }
        }
    }

    const getFavorites = async (id) => {
        try {
            const res = await api({
                method: 'GET',
                url: `/collections/${id}/items`,
                headers: {
                    Authorization: "Bearer " + authStore.token
                },
            })
            favorites.value = res.data.data            
        } catch (error) {
            if(error.response){
                throw error.response.data
            } 
        }
    }

    return {
        collections,
        favorites,
        getCollections,
        getFavorites
    }

},
{
    persist:  [
        {
            key: 'collections',
            paths: ['collections'],
            storage: sessionStorage,
        },
        {
            key: 'favorites',
            paths: ['favorites'],
            storage: sessionStorage,
        },
      ],
})