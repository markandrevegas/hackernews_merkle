<script setup lang="ts">
import { ref, computed } from "vue"
import { useAsyncData } from "nuxt/app"
import { useHackerNews } from "~/composables/useHackerNewsApi"
import type { ArticleAndUser } from "~/types/hacker-news"
import { usePageHeader } from '~/composables/usePageHeader'

// implement composable
const { getData } = useHackerNews()

// states
type SortKey = "score" | "authorKarma"
const sortBy = ref<SortKey>("score")
const sortDirection = ref<"asc" | "desc">("asc")

const {
	data: stories,
	pending,
	error
} = await useAsyncData<ArticleAndUser[]>("top-stories", () => getData(), {
	server: true
})
const { message, showBackLink } = usePageHeader()
message.value = stories.value?.[0]?.title || ''
showBackLink.value = false

// sorting
const sortedStories = computed(() => {
	if (!stories.value) return []

	// Create a copy to sort
	const sorted = [...stories.value]

	// Get the key we are sorting by
	const key = sortBy.value
	const directionMultiplier = sortDirection.value === "asc" ? 1 : -1

	sorted.sort((a, b) => {
		// TypeScript ensures a[key] and b[key] are accessible number values
		if (a[key] < b[key]) {
			return -1 * directionMultiplier
		}
		if (a[key] > b[key]) {
			return 1 * directionMultiplier
		}
		return 0 // Values are equal
	})

	return sorted
})
const updateSort = (key: SortKey) => {
	if (sortBy.value === key) {
		// If clicking the current sort key, toggle direction
		sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc"
	} else {
		// If clicking a new sort key, set it and reset direction to ascending
		sortBy.value = key
		sortDirection.value = "asc"
	}
}
const getSortIndicator = (key: SortKey) => {
	if (sortBy.value !== key) return ""
	return sortDirection.value
}
</script>
<template>
	<div class="app-container">
		<div class="app-content">
			<div v-if="pending" class="loading-state">
				<p>Loading stories...</p>
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
								<g fill="none" stroke="currentColor" stroke-width="1.5">
									<circle cx="12" cy="12" r="10" opacity=".5" />
									<path stroke-linecap="round" stroke-linejoin="round" d="M12 16V8m0 0l3 3m-3-3l-3 3" />
								</g>
							</svg>
							<svg v-if="getSortIndicator('score') === 'desc'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
								<g fill="none" stroke="currentColor" stroke-width="1.5">
									<circle cx="12" cy="12" r="10" opacity=".5" />
									<path stroke-linecap="round" stroke-linejoin="round" d="M12 8v8m0 0l3-3m-3 3l-3-3" />
								</g>
							</svg>
						</button>
						<button @click="updateSort('authorKarma')" :class="{ active: sortBy === 'authorKarma' }" aria-label="Sort by author karma score">
							Karma
							<svg v-if="getSortIndicator('authorKarma') === 'asc'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
								<g fill="none" stroke="currentColor" stroke-width="1.5">
									<circle cx="12" cy="12" r="10" opacity=".5" />
									<path stroke-linecap="round" stroke-linejoin="round" d="M12 16V8m0 0l3 3m-3-3l-3 3" />
								</g>
							</svg>
							<svg v-if="getSortIndicator('authorKarma') === 'desc'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
								<g fill="none" stroke="currentColor" stroke-width="1.5">
									<circle cx="12" cy="12" r="10" opacity=".5" />
									<path stroke-linecap="round" stroke-linejoin="round" d="M12 8v8m0 0l3-3m-3 3l-3-3" />
								</g>
							</svg>
						</button>
					</div>
				</div>
			</div>

			<div class="story-grid">
				<ClientOnly>
					<Card v-for="story in sortedStories" :key="story.id" :story="story" />
				</ClientOnly>
			</div>
		</div>
	</div>
</template>
