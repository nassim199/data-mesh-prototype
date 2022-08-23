<template>
    <div class="surface-0 overflow-hidden">
        <div class="grid py-4 px-4 lg:px-8 relative" id="hero">
            <div class="mx-4 md:mx-8 mt-0 md:mt-4">
                <h1 class="text-6xl font-bold text-gray-900 line-height-2"><span class="font-light block"></span>Dataverse</h1>
                <p class="font-normal text-2xl line-height-3 md:mt-3 text-gray-700"> Welcome to dataverse a data mesh solution allowing you to create a decentralized data ecosystem and become data driven. </p>
                <router-link to="/register"><Button label="Register" class="p-button-rounded text-xl border-none mt-5 bg-blue-500 font-normal text-white line-height-3 px-3"></Button></router-link>
            </div>
        </div>
        
        <div class="py-4 px-4 lg:px-8 mt-5 mx-0 lg:mx-8" id="features">
            <div class="grid justify-content-center">
                <div class="col-12 text-center mt-8 mb-4">
                    <h2 class="text-900 font-normal mb-2">Marvelous Features</h2>
                </div>

                <div class="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0">
                    <div style="height:160px; padding:2px; border-radius:10px; background: linear-gradient(90deg, rgba(253, 228, 165, 0.2),rgba(187, 199, 205, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2),rgba(187, 199, 205, 0.2));">
                        <div class="p-3 surface-card h-full" style="border-radius:8px;">
                            <div class="flex align-items-center justify-content-center bg-yellow-200 mb-3" style="width:3.5rem;height:3.5rem; border-radius:10px;">
                                <i class="pi pi-fw pi-users text-2xl text-yellow-700"></i>
                            </div>
                            <h5 class="mb-2 text-900">Authentication</h5>
                            <span class="text-600">Create your own account and participate</span>
                        </div>
                    </div>
                </div>
        
                <div class="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0">
                    <div style="height:160px; padding:2px; border-radius:10px; background: linear-gradient(90deg, rgba(145,226,237,0.2),rgba(251, 199, 145, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(172, 180, 223, 0.2));">
                        <div class="p-3 surface-card h-full" style="border-radius:8px;">
                            <div class="flex align-items-center justify-content-center bg-cyan-200 mb-3" style="width:3.5rem;height:3.5rem; border-radius:10px;">
                                <i class="pi pi-fw pi-palette text-2xl text-cyan-700"></i>
                            </div>
                            <h5 class="mb-2 text-900">Fresh Design</h5>
                            <span class="text-600">With different themes and responsive layout.</span>
                        </div>
                    </div>
                </div>
        
                <div class="col-12 md:col-12 lg:col-4 p-0 lg:pb-5 mt-4 lg:mt-0">
                    <div style="height:160px; padding:2px; border-radius:10px; background: linear-gradient(90deg, rgba(145, 226, 237, 0.2), rgba(172, 180, 223, 0.2)), linear-gradient(180deg, rgba(172, 180, 223, 0.2), rgba(246, 158, 188, 0.2));">
                        <div class="p-3 surface-card h-full" style="border-radius:8px;">
                            <div class="flex align-items-center justify-content-center bg-indigo-200" style="width:3.5rem;height:3.5rem; border-radius:10px;">
                                <i class="pi pi-fw pi-map text-2xl text-indigo-700"></i>
                            </div>
                            <h5 class="mb-2 text-900">Data products</h5>
                            <span class="text-600">Create your own catalogue of data products and contribute</span>
                        </div>
                    </div>
                </div>
        
            </div>
        </div>
            
        <div class="py-4 px-4 lg:px-8 mx-0 my-6 lg:mx-8" id="highlight">
            <div class="text-center">
                <h2 class="text-900 font-normal mb-2">Data Mesh</h2>
                <span class="text-600 text-2xl">The future of data architecture</span>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    methods: {
        smoothScroll(id){
            document.querySelector(id).scrollIntoView({
                behavior: 'smooth'
            });
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

<style>
#hero{
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #EEEFAF 0%, #C3E3FA 100%);
    height:500px;
    overflow:hidden;
}

@media screen and (min-width: 768px) {
    #hero{
        -webkit-clip-path: ellipse(150% 87% at 93% 13%);
        clip-path: ellipse(150% 87% at 93% 13%);
        height: 430px;
    }
}

@media screen and (min-width: 1300px){
    #hero > img {
        position: absolute;
    }

    #hero > div > p { 
        max-width: 450px;
    }
}

@media screen and (max-width: 1300px){
    #hero {
        height: 400px;
    }

    #hero > img {
        position:static;
        transform: scale(1);
        margin-left: auto;
    }

    #hero > div {
        width: 100%;
    }

    #hero > div > p {
        width: 100%;
        max-width: 100%;
    }
}
</style>