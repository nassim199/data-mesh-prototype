<template>
	<div class="layout-topbar">
		<router-link to="/" class="layout-topbar-logo">
			<img alt="Logo" :src="topbarImage()" />
			<span>Dataverse</span>
		</router-link>
		<button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle">
			<i class="pi pi-bars"></i>
		</button>

		<button class="p-link layout-topbar-menu-button layout-topbar-button"
			v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein', 
			leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true}">
			<i class="pi pi-ellipsis-v"></i>
		</button>
		<ul class="layout-topbar-menu hidden lg:flex origin-top">
			<li>
				<button class="p-link layout-topbar-button" @click="toggleConfigurator">
					<i class="pi pi-cog"></i>
					<span>Settings</span>
				</button>
			</li>
			<li v-if="!authenticated">
				<router-link to="/login">
					<button class="p-link layout-topbar-button">
						<i class="pi pi-user"></i>
						<span>Profile</span>
					</button>
				</router-link>
			</li>
			<li v-else>
				<button class="p-link layout-topbar-button" @click="signOut">
					<i class="pi pi-sign-out"></i>
					<span>Logout</span>
				</button>
			</li>
		</ul>
	</div>
</template>

<script>
import EventBus from './AppEventBus';

import { acteurStore } from './stores/acteur'

export default {
    methods: {
        onMenuToggle(event) {
            this.$emit('menu-toggle', event);
        },
		onTopbarMenuToggle(event) {
            this.$emit('topbar-menu-toggle', event);
        },
		topbarImage() {
			return this.$appState.darkTheme ? 'images/logo-white.svg' : 'images/logo-dark.svg';
		},
		toggleConfigurator(event) {
			EventBus.emit('toggle-configurator', { event: event });
			event.preventDefault();
		},
		signOut() {
			this.acteur.id = ""
			this.acteur.token = ""
			this.acteur.email = ""
		}
    },
	computed: {
		darkTheme() {
			return this.$appState.darkTheme;
		},
		authenticated() {
			return this.acteur.id != ''
		}
	},
	data() {
		return {
			acteur: acteurStore()
		}
	}
}
</script>