<template>
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
                <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Bienvenue</div>
                        <span class="text-600 font-medium">Register to continue</span>
                    </div>

                    <Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
                        <div class="flex align-items-center flex-column pt-6 px-3">
                            <i class="pi pi-check-circle" :style="{fontSize: '5rem', color: 'var(--green-500)' }"></i>
                            <h5>Registration Successful!</h5>
                            <p :style="{lineHeight: 1.5, textIndent: '1rem'}">
                                Your account is registered under name <b>{{state.name}}</b> ; it'll be valid next 30 days without activation. Please check <b>{{state.email}}</b> for activation instructions.
                            </p>
                        </div>
                        <template #footer>
                            <div class="flex justify-content-center">
                                <Button label="OK" @click="toggleDialog" class="p-button-text" />
                            </div>
                        </template>
                    </Dialog>
                
                    <div class="w-full md:w-10 mx-auto">
                        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
                        <label for="name" class="block text-900 text-xl font-medium mb-2">Name</label>
                        <InputText id="name" v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && submitted}" class="w-full mb-3" placeholder="Name" style="padding:1rem;" />

                        <label for="email" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error" class="w-full mb-3" placeholder="Email" style="padding:1rem;" />
                
                        <label for="password" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password" v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}"  placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem" >
                                <template #header>
                                    <h6>Pick a password</h6>
                                </template>
                                <template #footer="sp">
                                    {{sp.level}}
                                    <Divider />
                                    <p class="mt-2">Suggestions</p>
                                    <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                                        <li>At least one lowercase</li>
                                        <li>At least one uppercase</li>
                                        <li>At least one numeric</li>
                                        <li>Minimum 8 characters</li>
                                    </ul>
                                </template>
                            </Password>
                        <div class="field-checkbox">
                            <Checkbox id="accept" name="accept" value="Accept" v-model="v$.accept.$model" :class="{'p-invalid':v$.accept.$invalid && submitted}" />
                            <label for="accept" :class="{'p-error': v$.accept.$invalid && submitted}">I agree to the terms and conditions*</label>
                        </div>
                        <Button type="submit" label="Register" class="w-full p-3 text-xl"></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import axios from "axios";
// import { navigate } from "svelte-routing";
import router from '../router';

export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            name: '',
            email: '',
            password: '',
            accept: null,
            submitted: false,
            showMessage: false,
            API_URL: "http://localhost:3000"
        }
    },
    validations() {
        return {
            name: {
                required
            },
            email: {
                required,
                email
            },
            password: {
                required
            },
            accept: {
                required
            }
        }
    },
    methods: {
        handleSubmit(isFormValid) {
            this.submitted = true;

            if (!isFormValid) {
                return;
            }
        axios({
        method: 'post',
        url: this.API_URL + '/auth/register',
        data: {
            nom: this.name,
            email: this.email,
            password: this.password
        }
        })
        .then((res) => {
            console.log(res)
            router.replace({ path: '/login' })
            })
        .catch((error) => console.log(error))

        // this.toggleDialog();
        },
        toggleDialog() {
            this.showMessage = !this.showMessage;
        
            if(!this.showMessage) {
                this.resetForm();
            }
        },
        resetForm() {
            this.name = '';
            this.email = '';
            this.password = '';
            this.accept = null;
            this.submitted = false;
        }
    },
    computed: {
        logoColor() {
            if (this.$appState.darkTheme) return 'white';
            return 'dark';
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