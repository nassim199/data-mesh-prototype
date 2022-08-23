<template>
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
                <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Bienvenue</div>
                        <span class="text-600 font-medium">Sign in to continue</span>
                    </div>
                
                    <div class="w-full md:w-10 mx-auto">
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" v-model="email" type="text" class="w-full mb-3" placeholder="Email" style="padding:1rem;" />
                
                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                
                        <div class="flex align-items-center justify-content-between mb-5">
                            <div class="flex align-items-center">
                                <Checkbox id="rememberme1" v-model="checked" :binary="true" class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                        </div>
                        <Button label="Sign In" class="w-full p-3 text-xl" @click="login"></button>
                        <div>
                            <br>
                            Don't have an account? <router-link to="/register"> <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)"> Register</a> </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

import router from '../router';
import { acteurStore } from '../stores/acteur'

export default {
    data() {
        return {
            email: '',
            password: '',
            checked: false,
            API_URL: "http://ec2-54-161-217-174.compute-1.amazonaws.com:3000"
        }
    },
    computed: {
        logoColor() {
            if (this.$appState.darkTheme) return 'white';
            return 'dark';
        }
    },
    methods: {
      login(e) {
        e.preventDefault();
        axios({
        method: 'post',
        url: this.API_URL + '/auth/login',
        data: {
            email: this.email,
            password: this.password
        }
        })
        .then((res) => {
            console.log(res)
            const acteur = acteurStore()
            acteur.id = res.data.acteur.id
            acteur.email = res.data.acteur.email
            acteur.token = res.data.accessToken
            
            router.replace({ path: '/table' })

        })
        .catch((error) => console.log(error));
        }
    }
}
</script>

<style scoped>
.pi-eye {
    transform:scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform:scale(1.6);
    margin-right: 1rem;
}
</style>