import { defineStore } from "pinia";
import api from "../plugins/axios";
import { ref } from "vue";
import { useAuthStore } from "./auth";

export const useFavoriteStore = defineStore('favorite', () => {
    const authStore = useAuthStore()
    const collections = ref([])
    const favorites = ref([])
    const addFavorites = ref([])

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

    const addBook = async (idBook, idCollection) => {
        try {
          const res = await api({
            method: 'POST',
            url: `/collections/${idCollection}/add-item`,
            headers: {
              Authorization: "Bearer " + authStore.token
            },
            data: {
              bookId: idBook
            }
          })
          addFavorites.value = res.data.status
          console.log(addFavorites.value);
              
        } catch (error) {
            if(error.response){
              throw error.response.data
            }
        }
      }

    return {
        collections,
        favorites,
        addFavorites,
        getCollections,
        getFavorites,
        addBook
    }

},
{
    persist:  [
        {
            key: 'collections',
            paths: ['collections'],
            storage: localStorage,
        },
        {
            key: 'favorites',
            paths: ['favorites'],
            storage: localStorage,
        },
      ],
})