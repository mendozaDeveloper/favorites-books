import { defineStore } from "pinia";
import api from "../plugins/axios";
import { ref } from "vue";
import { useAuthStore } from "./auth";

export const useBookStore = defineStore("book", () => {
    const books = ref([]);
    const authStore = useAuthStore();
    let isSubmiting = ref(false)
    const statusMsg = ref([])

    const createBook = async (dataForm) => {
      isSubmiting.value = true;

      try {
        const res = await api({
          method: "POST",
          url: "/books",
          headers: {
            Authorization: "Bearer " + authStore.token,
          },
          data: dataForm,
        }).then((response) => {
          books.value.push(response.data.data)
          statusMsg.value = response.data.status
          
          console.log(response.data.status);
          
        })
        
      } catch (error) {
        if (error.response) {
          throw error.response.data;
        }
      } finally {
        isSubmiting.value = false;
      }
    };

    const getBooks = async () => {
      try {
        const res = await api({
          url: "/books",
          method: "GET",
        });
        books.value = res.data.data;
      } catch (error) {
        if (error.response) {
          throw error.response.data;
        }
      }
    };

    return {
      books,
      isSubmiting,
      statusMsg,
      createBook,
      getBooks,
    };
  },
  {
    persist: {
      storage: localStorage,
      paths: ["books"],
    },
  }
);
