import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../plugins/axios";

export const useAuthStore = defineStore('auth', () => {
    const token = ref(null)

    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login', {
                email: email,
                password: password
            })
            console.log(res.data);
            console.log(res.data.data.accessToken);
            token.value = res.data.data.accessToken
        } catch (error) {
            if(error.response){
                throw error.response.data
            }
        }
    }
    return {
        token,
        login
    }
})



/*
{
    state: () => {
        return {
            token: null
        }
    },
    actions: {
        async register(name, email, password){

        },
        async login(email, password){

        },
        async getBooks() {

        },
        async createBook(){

        }
    }
}
*/


