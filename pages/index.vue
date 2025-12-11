<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAsyncData } from 'nuxt/app'
import { useHackerNews } from '~/composables/useHackerNewsApi'
import type { ArticleAndUser } from '~/types/hacker-news'
import { usePageHeader } from '~/composables/usePageHeader'

const { getData } = useHackerNews()

type SortKey = 'score' | 'time' | 'authorKarma'
const sortBy = ref<SortKey>('score')
const sortDirection = ref<'asc' | 'desc'>('asc')

const {
	data: stories,
	pending,
	error
} = await useAsyncData<ArticleAndUser[]>('top-stories', () => getData(), {
	server: true
})
onMounted(() => {
	const { setHeader } = usePageHeader()
	setHeader('Top Stories', false, '')
})

// sorting
const sortedStories = computed(() => {
	if (!stories.value) return []

	// Create a copy to sort
	const sorted = [...stories.value]

	// Get the key to use the sort
	const key = sortBy.value
	const directionMultiplier = sortDirection.value === 'asc' ? 1 : -1

	sorted.sort((a, b) => {
		if (a[key] < b[key]) {
			return -1 * directionMultiplier
		}
		if (a[key] > b[key]) {
			return 1 * directionMultiplier
		}
		return 0
	})

	return sorted
})
const updateSort = (key: SortKey) => {
	if (sortBy.value === key) {
		// toggle the direction of sorting
		sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
	} else {
		// reset to have asc be default on new
		sortBy.value = key
		sortDirection.value = 'asc'
	}
}
const getSortIndicator = (key: SortKey) => {
	if (sortBy.value !== key) return ''
	return sortDirection.value
}
useHead({
	title: 'Top Stories from Hacker News',
	meta: [
		{
			name: 'description',
			content: 'Simple Layout for Hacker News Top Stories with sorting options'
		}
	]
})
</script>
<template>
	<div class="app-container">
		<div class="app-content">
			<div v-if="pending" class="loading-state">
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
					<path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><circle cx="12" cy="2.5" r="1.5" fill="currentColor">
					<animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></circle>
				</svg>
			</div>
			<div v-else-if="error" class="error-state">
				<p>An error occurred fetching stories: {{ error.message }}</p>
			</div>
			<div v-else-if="!stories || stories.length === 0" class="empty-state">
				<p>No stories found. Please try refreshing.</p>
			</div>
			<div v-else>
				<div class="sort-controls">
					<div class="sort-controls__layout">
						<button @click="updateSort('score')" :class="{ active: sortBy === 'score' }" aria-label="Sort by article score">
							Score
							<svg v-if="getSortIndicator('score') === 'asc'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
								<path fill="currentColor" fill-rule="evenodd" d="M5.307 15.287A.75.75 0 0 0 6 15.75h12a.75.75 0 0 0 .53-1.28l-6-6a.75.75 0 0 0-1.06 0l-6 6a.75.75 0 0 0-.163.817" clip-rule="evenodd"/></svg>
							<svg v-if="getSortIndicator('score') === 'desc'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
								<path fill="currentColor" fill-rule="evenodd" d="M5.307 8.713A.75.75 0 0 1 6 8.25h12a.75.75 0 0 1 .53 1.28l-6 6a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 0 1-.163-.817" clip-rule="evenodd"/></svg>
						</button>
						<button @click="updateSort('time')" :class="{ active: sortBy === 'time' }" aria-label="Sort by date">
							Date
							<svg v-if="getSortIndicator('time') === 'asc'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
								<path fill="currentColor" fill-rule="evenodd" d="M5.307 15.287A.75.75 0 0 0 6 15.75h12a.75.75 0 0 0 .53-1.28l-6-6a.75.75 0 0 0-1.06 0l-6 6a.75.75 0 0 0-.163.817" clip-rule="evenodd"/></svg>
							<svg v-if="getSortIndicator('time') === 'desc'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
								<path fill="currentColor" fill-rule="evenodd" d="M5.307 8.713A.75.75 0 0 1 6 8.25h12a.75.75 0 0 1 .53 1.28l-6 6a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 0 1-.163-.817" clip-rule="evenodd"/></svg>
						</button>
						<button @click="updateSort('authorKarma')" :class="{ active: sortBy === 'authorKarma' }" aria-label="Sort by author karma score">
							Karma
							<svg v-if="getSortIndicator('authorKarma') === 'asc'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
								<path fill="currentColor" fill-rule="evenodd" d="M5.307 15.287A.75.75 0 0 0 6 15.75h12a.75.75 0 0 0 .53-1.28l-6-6a.75.75 0 0 0-1.06 0l-6 6a.75.75 0 0 0-.163.817" clip-rule="evenodd"/></svg>
							<svg v-if="getSortIndicator('authorKarma') === 'desc'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
								<path fill="currentColor" fill-rule="evenodd" d="M5.307 8.713A.75.75 0 0 1 6 8.25h12a.75.75 0 0 1 .53 1.28l-6 6a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 0 1-.163-.817" clip-rule="evenodd"/></svg>
						</button>
					</div>
				</div>
				<div class="story-grid">
					<ClientOnly>
						<Card v-for="story in sortedStories" :key="story.id" :story="story" />
					</ClientOnly>
				</div>
			</div>
		</div>
	</div>
</template>
