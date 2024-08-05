import { defineStore } from "pinia";
import api from "../plugins/axios";
import { ref } from "vue";
import { useAuthStore } from "./auth";

export const useBookStore = defineStore("book", () => {
    const books = ref([]);
    const authStore = useAuthStore();
    let isSubmiting = ref(false)

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
        });
        books.value.push(res.data.data)
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
