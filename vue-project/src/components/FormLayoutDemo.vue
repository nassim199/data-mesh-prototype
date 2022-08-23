<template>
    <div class="form-demo">
        <Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
            <div class="flex align-items-center flex-column pt-6 px-3">
                <i class="pi pi-check-circle" :style="{fontSize: '5rem', color: 'var(--green-500)' }"></i>
                <h5>Data Product added successfully !</h5>
            </div>
            <template #footer>
                <div class="flex justify-content-center">
                    <Button label="OK" @click="toggleDialog" class="p-button-text" />
                </div>
            </template>
        </Dialog>

        <div class="flex justify-content-center">
            <div class="card">
                <h5 class="text-center">Add Data Product</h5>
                <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
                    <div class="field">
                        <div class="p-float-label">
                            <InputText id="name" v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && submitted}" />
                            <label for="name" :class="{'p-error':v$.name.$invalid && submitted}">Name*</label>
                        </div>
                        <small v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response" class="p-error">{{v$.name.required.$message.replace('Value', 'Name')}}</small>
                    </div>
                    <div class="field">
                        <div class="p-float-label">
                            <Textarea id="description" v-model="v$.description.$model" :class="{'p-invalid':v$.description.$invalid && submitted}" aria-describedby="description-error"/>
                            <label for="description" :class="{'p-error':v$.description.$invalid && submitted}">description*</label>
                        </div>
						<small v-if="(v$.description.$invalid && submitted) || v$.description.$pending.$response" class="p-error">{{v$.description.required.$message.replace('Value', 'Name')}}</small>
                    </div>
                    <div class="field">
                        <div class="p-float-label">
                            <Dropdown id="format" v-model="format" :options="formats" optionLabel="name" />
                            <label for="format">Format</label>
                        </div>
                    </div> 
					<div class="field">
						<div class="p-float-label">
							<TreeSelect id="folder" v-model="selectedNode" :options="folders" @node-select="onNodeSelect"/>
							<label for="folder">Folder</label>
						</div>
					</div>
					<div class="field">
						<MultiSelect id="previous_dps" v-model="selectedDPs" :options="dataProducts" :filter="true" optionLabel="nom" placeholder="Data Products Used"/>						
					</div>
					<div class="field">
						<label for="checked">External Source</label>
						<ToggleButton id="checked" v-model="checked"  onIcon="pi pi-check" offIcon="pi pi-times"/>
					</div>
					<div class="field">
                        <div class="p-float-label">
                            <InputText id="externalSource" v-model="externalSourceLink" :disabled="!checked" />
                            <label for="externalSource">externalSource*</label>
                        </div>
                    </div>
					<div class="field">
						<label for="hasNotebook">Has Notebook</label>
						<ToggleButton id="hasNotebook" v-model="hasNotebook"  onIcon="pi pi-check" offIcon="pi pi-times"/>
					</div>
                    <Button type="submit" label="Submit" class="mt-2" />
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import axios from "axios";
import router from "../router"

import { acteurStore } from '../stores/acteur'

export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            name: '',
            description: '',
            format: null,
			selectedFolder: '',
			selectedDPs: [],
			checked: false,
			externalSource: '',
			hasNotebook: true,
            submitted: false,
            externalSourceLink: '',
            formats: [{name: 'json', code: 'json'}, {name: 'csv', code: 'csv'}],
			dataProducts: [{name: 'historique disponibilite'}, {name: 'avis'}],
            folders: null,
            showMessage: false,
            selectedNode: null,
            acteur: acteurStore()
        }
    },
    validations() {
        return {
            name: {
                required
            },
            description: {
                required
            }
        }
    },
    methods: {
        handleSubmit(isFormValid) {
            this.submitted = true;
            //let folder = JSON.parse(JSON.stringify(this.selectedFolder))

            if (!isFormValid) {
                return;
            }
            
            axios({
                method: 'post',
                url:  'http://ec2-54-161-217-174.compute-1.amazonaws.com:3000/dp/create-dp',
                data: {
                nom: this.name,
                description: this.description,
                formatData: this.format.code,
                dateCreation: new Date(),
                selectedFolder: this.selectedFolder,
                selectedIds: this.selectedDPs.map(dp => dp._id),
                isExternal: this.checked,
                checked: this.hasNotebook,
                hasNotebook: this.hasNotebook,
                externalSourceLink: this.externalSourceLink
                },
                headers: {
                authorization: "JWT " +  this.acteur.token
                }
            })
            .then(() => this.toggleDialog())
            .catch((error) => console.log(error));

        },
        toggleDialog() {
            this.showMessage = !this.showMessage;
        
            if(!this.showMessage) {
                this.resetForm();
            }
        },
        resetForm() {
            this.name = '';
            this.submitted = false;
        },
        generateFolders(tree) {
            let f = tree.children.map(c => this.generateFolders(c))
            return {
                label: tree.nom,
                data: tree.nom,
                key: tree._id,
                children: f
            }
        },
        onNodeSelect(node) {
            this.selectedFolder = node.key
        }
    },
    created() {
        if (this.acteur.id == '') {
            router.replace('/access')
        }
        axios({
            method: 'get',
            url: 'http://ec2-54-161-217-174.compute-1.amazonaws.com:3000/dp/get-my-dps',
            headers: {
            authorization: "JWT " + this.acteur.token
        }
        }).then((res) => {
            this.folders = [this.generateFolders(res.data.tree)]
            this.folders[0].label = "root"
            this.selectedFolder = this.folders[0].key
        }).catch((error) => console.log(error))

        axios({
            method: 'get',
            url: 'http://ec2-54-161-217-174.compute-1.amazonaws.com:3000/dp/get-dps',
        }).then((res) => {
            this.dataProducts = res.data.dataProducts;
        }).catch((error) => console.log(error));
        }
}
</script>

<style lang="scss" scoped>
.form-demo {
    .card {
        min-width: 450px;

        form {
            margin-top: 2rem;
        }

        .field {
            margin-bottom: 1.5rem;
        }
    }

    @media screen and (max-width: 960px) {
        .card {
            width: 80%;
        }
    }
}

</style>