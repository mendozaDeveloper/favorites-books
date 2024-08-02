import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../plugins/axios";

export const useAuthStore = defineStore('auth', () => {
    const token = ref(null)
    const isAuthenticated = ref(false) 
    const router = useRouter()

    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login',{
                email: email,
                password: password                
            })
            console.log(res.data);
            console.log(res.data.data.accessToken);
            token.value = res.data.data.accessToken

            isAuthenticated.value = true
        } catch (error) {
            isAuthenticated.value = false

            if(error.response){
                throw error.response.data
            }
        }
    }

    const logout = () => {
        token.value = null;
        isAuthenticated.value = false;
        
        alert('¡Has cerrado sesión correctamente!')
        router.push('/login')
    }

    
    return {
        token,
        isAuthenticated,
        login,
        logout
    }
},
{
    persist: true
})



