<script setup lang="ts">

const emit = defineEmits(["back"])
const props = defineProps({
	today: {
		type: String,
		required: false
	},
	message: {
		type: String,
		required: false
	},
	showBackLink: {
		type: Boolean,
		required: false,
		default: false
	}
})
</script>
<template>
	<div class="app-header">
		<div class="left">
			<NuxtLink v-if="props.showBackLink" to="/" class="back-link" @click.prevent="emit('back')">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10" opacity=".5"/><path stroke-linecap="round" stroke-linejoin="round" d="M16 12H8m0 0l3-3m-3 3l3 3"/></g>
				</svg>
				<span style="display:inline-block">Back to Top Stories</span>
			</NuxtLink>
		</div>
		
		<span class="app-date" v-if="!props.showBackLink">{{ today }}</span>
		<h1 class="title">{{ props.message }}</h1>
	</div>
</template>
