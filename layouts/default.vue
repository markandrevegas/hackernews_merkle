<script setup>
	import AppHeader from '~/components/AppHeader.vue'
	import AppFooter from '~/components/AppFooter.vue'
	import { usePageHeader } from '~/composables/usePageHeader'
	const { message, today, showBackLink } = usePageHeader()
	useHead({
		link: [
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
			}
		]
	})

	const emit = defineEmits(['back'])
	function handleBack() {
		emit('back')
	}
</script>
<template>
	<div style="display:flex; flex-direction: column; min-height: 100vh;">
		<AppHeader :showBackLink="showBackLink" :today="today" :message="message" @back="handleBack" />
		<NuxtPage :showBackLink="showBackLink" :today="today" :message="message" />
		<AppFooter />
	</div>
</template>

