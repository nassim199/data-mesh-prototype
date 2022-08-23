<template>
    <div class="surface-0 overflow-hidden">
        <div class="grid py-4 px-4 lg:px-8 relative" id="hero">
            <div class="mx-4 md:mx-8 mt-0 md:mt-4">
                <h1 class="text-6xl font-bold text-gray-900 line-height-2"><span class="font-light block"></span>Dataverse</h1>
                <p class="font-normal text-2xl line-height-3 md:mt-3 text-gray-700">Sed blandit libero volutpat sed cras. Fames ac turpis egestas integer. Placerat in egestas erat... </p>
                <router-link to="/register"><Button label="Register" class="p-button-rounded text-xl border-none mt-5 bg-blue-500 font-normal text-white line-height-3 px-3"></Button></router-link>
            </div>
        </div>
        
        <div class="py-4 px-4 lg:px-8 mt-5 mx-0 lg:mx-8" id="features">
            <div class="grid justify-content-center">
                <div class="col-12 text-center mt-8 mb-4">
                    <h2 class="text-900 font-normal mb-2">Marvelous Features</h2>
                    <span class="text-600 text-2xl">Placerat in egestas erat...</span>
                </div>

                <div class="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0">
                    <div style="height:160px; padding:2px; border-radius:10px; background: linear-gradient(90deg, rgba(253, 228, 165, 0.2),rgba(187, 199, 205, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2),rgba(187, 199, 205, 0.2));">
                        <div class="p-3 surface-card h-full" style="border-radius:8px;">
                            <div class="flex align-items-center justify-content-center bg-yellow-200 mb-3" style="width:3.5rem;height:3.5rem; border-radius:10px;">
                                <i class="pi pi-fw pi-users text-2xl text-yellow-700"></i>
                            </div>
                            <h5 class="mb-2 text-900">Easy to Use</h5>
                            <span class="text-600">Posuere morbi leo urna molestie.</span>
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
                            <span class="text-600">Semper risus in hendrerit.</span>
                        </div>
                    </div>
                </div>
        
                <div class="col-12 md:col-12 lg:col-4 p-0 lg:pb-5 mt-4 lg:mt-0">
                    <div style="height:160px; padding:2px; border-radius:10px; background: linear-gradient(90deg, rgba(145, 226, 237, 0.2), rgba(172, 180, 223, 0.2)), linear-gradient(180deg, rgba(172, 180, 223, 0.2), rgba(246, 158, 188, 0.2));">
                        <div class="p-3 surface-card h-full" style="border-radius:8px;">
                            <div class="flex align-items-center justify-content-center bg-indigo-200" style="width:3.5rem;height:3.5rem; border-radius:10px;">
                                <i class="pi pi-fw pi-map text-2xl text-indigo-700"></i>
                            </div>
                            <h5 class="mb-2 text-900">Well Documented</h5>
                            <span class="text-600">Non arcu risus quis varius quam quisque.</span>
                        </div>
                    </div>
                </div>
        
                <div class="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0">
                    <div style="height:160px; padding:2px; border-radius:10px; background: linear-gradient(90deg, rgba(187, 199, 205, 0.2),rgba(251, 199, 145, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2),rgba(145, 210, 204, 0.2));">
                        <div class="p-3 surface-card h-full" style="border-radius:8px;">
                            <div class="flex align-items-center justify-content-center bg-bluegray-200 mb-3" style="width:3.5rem;height:3.5rem; border-radius:10px;">
                                <i class="pi pi-fw pi-id-card text-2xl text-bluegray-700"></i>
                            </div>
                            <h5 class="mb-2 text-900">Responsive Layout</h5>
                            <span class="text-600">Nulla malesuada pellentesque elit.</span>
                        </div>
                    </div>
                </div>
        
                <div class="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0">
                    <div style="height:160px; padding:2px; border-radius:10px; background: linear-gradient(90deg, rgba(187, 199, 205, 0.2),rgba(246, 158, 188, 0.2)), linear-gradient(180deg, rgba(145, 226, 237, 0.2),rgba(160, 210, 250, 0.2));">
                        <div class="p-3 surface-card h-full" style="border-radius:8px;">
                            <div class="flex align-items-center justify-content-center bg-orange-200 mb-3" style="width:3.5rem;height:3.5rem; border-radius:10px;">
                                <i class="pi pi-fw pi-star text-2xl text-orange-700"></i>
                            </div>
                            <h5 class="mb-2 text-900">Clean Code</h5>
                            <span class="text-600">Condimentum lacinia quis vel eros.</span>
                        </div>
                    </div>
                </div>
        
                <div class="col-12 md:col-12 lg:col-4 p-0 lg:pb-5 mt-4 lg:mt-0">
                    <div style="height:160px; padding:2px; border-radius:10px; background: linear-gradient(90deg, rgba(251, 199, 145, 0.2), rgba(246, 158, 188, 0.2)), linear-gradient(180deg, rgba(172, 180, 223, 0.2), rgba(212, 162, 221, 0.2));">
                        <div class="p-3 surface-card h-full" style="border-radius:8px;">
                            <div class="flex align-items-center justify-content-center bg-pink-200 mb-3" style="width:3.5rem;height:3.5rem; border-radius:10px;">
                                <i class="pi pi-fw pi-moon text-2xl text-pink-700"></i>
                            </div>
                            <h5 class="mb-2 text-900">Dark Mode</h5>
                            <span class="text-600">Convallis tellus id interdum velit laoreet.</span>
                        </div>
                    </div>
                </div>
        
                <div class="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 mt-4 lg:mt-0">
                    <div style="height:160px; padding:2px; border-radius:10px; background: linear-gradient(90deg, rgba(145, 210, 204, 0.2), rgba(160, 210, 250, 0.2)), linear-gradient(180deg, rgba(187, 199, 205, 0.2), rgba(145, 210, 204, 0.2));">
                        <div class="p-3 surface-card h-full" style="border-radius:8px;">
                            <div class="flex align-items-center justify-content-center bg-teal-200 mb-3" style="width:3.5rem;height:3.5rem; border-radius:10px;">
                                <i class="pi pi-fw pi-shopping-cart text-2xl text-teal-700"></i>
                            </div>
                            <h5 class="mb-2 text-900">Ready to Use</h5>
                            <span class="text-600">Mauris sit amet massa vitae.</span>
                        </div>
                    </div>
                </div>
        
                <div class="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 mt-4 lg:mt-0">
                    <div style="height:160px; padding:2px; border-radius:10px; background: linear-gradient(90deg, rgba(145, 210, 204, 0.2), rgba(212, 162, 221, 0.2)), linear-gradient(180deg, rgba(251, 199, 145, 0.2), rgba(160, 210, 250, 0.2));">
                        <div class="p-3 surface-card h-full" style="border-radius:8px;">
                            <div class="flex align-items-center justify-content-center bg-blue-200 mb-3" style="width:3.5rem;height:3.5rem; border-radius:10px;">
                                <i class="pi pi-fw pi-globe text-2xl text-blue-700"></i>
                            </div>
                            <h5 class="mb-2 text-900">Modern Practices</h5>
                            <span class="text-600">Elementum nibh tellus molestie nunc non.</span>
                        </div>
                    </div>
                </div>
        
                <div class="col-12 md:col-12 lg:col-4 p-0 lg-4 mt-4 lg:mt-0">
                    <div style="height:160px; padding:2px; border-radius:10px; background: linear-gradient(90deg, rgba(160, 210, 250, 0.2), rgba(212, 162, 221, 0.2)), linear-gradient(180deg, rgba(246, 158, 188, 0.2), rgba(212, 162, 221, 0.2));">
                        <div class="p-3 surface-card h-full" style="border-radius:8px;">
                            <div class="flex align-items-center justify-content-center bg-purple-200 mb-3" style="width:3.5rem;height:3.5rem; border-radius:10px;">
                                <i class="pi pi-fw pi-eye text-2xl text-purple-700"></i>
                            </div>
                            <h5 class="mb-2 text-900">Privacy</h5>
                            <span class="text-600">Neque egestas congue quisque.</span>
                        </div>
                    </div>
                </div>

                <div class="col-12 mt-8 mb-8 p-2 md:p-8" style="border-radius:20px; background:linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #EFE1AF 0%, #C3DCFA 100%);">
                    <div class="flex flex-column justify-content-center align-items-center text-center px-3 py-3 md:py-0">
                        <h3 class="text-gray-900 mb-2">Joséphine Miller</h3>
                        <span class="text-gray-600 text-2xl">Peak Interactive</span>
                        <p class="text-gray-900 sm:line-height-2 md:line-height-4 text-2xl mt-4" style="max-width:800px;">“Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.”</p>
                        <img src="layout/images/peak-logo.svg" class="mt-4" alt="">

                    </div>
                </div>
            </div>
        </div>
            
        <div class="py-4 px-4 lg:px-8 mx-0 my-6 lg:mx-8" id="highlight">
            <div class="text-center">
                <h2 class="text-900 font-normal mb-2">Powerful Everywhere</h2>
                <span class="text-600 text-2xl">Amet consectetur adipiscing elit...</span>
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
    height:700px;
    overflow:hidden;
}

@media screen and (min-width: 768px) {
    #hero{
        -webkit-clip-path: ellipse(150% 87% at 93% 13%);
        clip-path: ellipse(150% 87% at 93% 13%);
        height: 530px;
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
        height: 600px;
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