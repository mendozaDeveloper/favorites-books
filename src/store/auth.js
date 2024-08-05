import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../plugins/axios";

export const useAuthStore = defineStore('auth', () => {
    const token = ref(null)
    const userAuth = ref([])
    const isAuthenticated = ref(false) 
    const router = useRouter()

    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login',{
                email: email,
                password: password                
            })
            token.value = res.data.data.accessToken

            isAuthenticated.value = true
        } catch (error) {
            isAuthenticated.value = false

            if(error.response){
                throw error.response.data
            }
        }
    }

    const userLoged = async () => {      
        try {
            const res = await api({
                method: 'GET',
                url: '/auth/me',
                headers: {
                    Authorization: "Bearer " + token.value
                }
            })
            userAuth.value = res.data.data
        } catch (error) {
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
        userAuth,
        isAuthenticated,
        login,
        userLoged,
        logout
    }
},
{
    persist:  [
        {
            key: 'auth',
            paths: ['token'],
            storage: sessionStorage,
        },
        {
            key: 'isAuthenticated',
            paths: ['isAuthenticated'],
            storage: sessionStorage,
        },
      ],
})



