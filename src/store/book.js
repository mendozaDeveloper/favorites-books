import { defineStore } from "pinia";
import api from "../plugins/axios";
import { ref } from "vue";


export const useBookStore = defineStore('book', () => {
    const books = ref([])

    /*const createBook = async () => {
        try {
            
        } catch (error) {
            console.log(error)
        }
    }*/

    const getBooks =  async () => {
        console.log('obteniendo los libros')
        try {
            const res = await api({
                url: '/books',
                method: 'GET',
            })
            books.value = res.data.data
        } catch (error) {
            if(error.response){
                throw error.response.data
            }
        }
    } 

    return {
        books,
        getBooks
    }
},
{
    persist: {
        storage: sessionStorage,
        paths: ['books']
      }
  },
)

