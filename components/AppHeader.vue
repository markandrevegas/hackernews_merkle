<!-- components/AppHeader.vue-->
<script setup lang="ts">
import { usePageHeader } from '~/composables/usePageHeader'
import { useRouter } from 'vue-router'

const { today, message, showBackLink, url } = usePageHeader()
const router = useRouter()
const goBack = () => {
	router.back()
}
</script>
<template>
	<div class="app-header">
		<div class="control-container" style="color: var(-dark)">
			<NuxtLink v-if="showBackLink" to="/" class="back-link" @click.prevent="goBack">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<g fill="none" stroke="currentColor" stroke-width="1.5">
						<circle cx="12" cy="12" r="10" />
						<path stroke-linecap="round" stroke-linejoin="round" d="M16 12H8m0 0l3-3m-3 3l3 3" />
					</g>
				</svg>
			</NuxtLink>
			<p v-else>{{ today }}</p>
		</div>
		<a v-if="url" :href="url" target="_blank" rel="noopener noreferrer" class="story-link">
			<h1 :class="['title', { 'title--small': showBackLink }]">{{ message }}</h1>
		</a>

		<h1 v-else class="title">{{ message }}</h1>
	</div>
</template>
<style scoped lang="scss">
a {
	text-decoration: none;
	color: inherit;
	&.hover\:underline:hover {
		text-decoration: underline;
	}
}
@media (min-width: var(--md-breakpoint)) {
	h1 {
		font-size: 2.5rem;
	}
}
</style>
