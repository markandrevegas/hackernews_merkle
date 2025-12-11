
<script setup lang="ts">
	import { ref, computed } from 'vue'
	import { useRoute } from 'vue-router'
	import { useHackerNews } from '~/composables/useHackerNewsApi'
	import type { ArticleAndUser } from '~/types/hacker-news'
	import { usePageHeader } from '~/composables/usePageHeader'

	const fadeOut = ref(false)
	// get the story ID from the route
	const route = useRoute()
	const storyId = Number(route.params.id)
	const { setHeader } = usePageHeader()
	// load story + author once, but refresh if the route id changes
	const { story, user } = useHackerNews()
	
	const { data: storyData, pending, error } = await useAsyncData('story-' + storyId,
		async () => {
			if (isNaN(storyId)) {
				throw new Error("id is not valid")
			}
			// fetch article then lookup the author
			const fetchedStory = await story(storyId)
			const author = await user(fetchedStory.by)

			// merge the results here
			const combinedStory: ArticleAndUser = {
				...fetchedStory,
				authorKarma: author.karma,
			}

			return combinedStory
		},
		{
			watch: [() => route.params.id],
			server: true
		}
	)

	const storyComputed = computed(() => storyData.value)
	watch(storyComputed, (newStory) => {
		if (newStory) {
			setHeader(newStory.title, true, newStory.url)
		}
	}, { immediate: true })
	useHead({
		title: storyComputed.value?.title,
		meta: [
			{
				name: 'description',
				content: storyComputed.value?.by ? 'Story by ' + storyComputed.value.by + ' with score of ' + storyComputed.value.score : 'Hacker News Story Details'
			}
		]
	})
	// console.log(storyComputed.value)
	// helper to fromat the time
	const formattedTime = computed(() => {
		if (!storyComputed.value) return ''
		return new Date(storyComputed.value.time * 1000).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		})
	})
	// sanitize story text
	const cleanString = computed(() => {
		if (!storyComputed.value || !storyComputed.value.text) return ''

		return storyComputed.value.text.replace(/<[^>]*>/g, '')
	})
</script>
<template>
	<div class="details-container" :class="{ 'fade-out': fadeOut }">
		<div v-if="pending" style="height:100%;padding:var(--spacing-base);display:flex;flex-direction:column;justify-content:center;align-items:center;">
			<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
				<path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><circle cx="12" cy="2.5" r="1.5" fill="currentColor">
				<animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></circle>
			</svg>
		</div>
		<div v-else-if="error">
			<p>Error loading story: {{ error.message }}</p>
		</div>
		<div v-else-if="storyComputed" class="detail-card">
			<img :src="'https://picsum.photos/seed/' + storyId + '/360/240'" :alt="'Image for ' + storyComputed.title" loading="lazy" width="360" height="240" />
      <div class="detail-card-text">
				<p class="metadata">
					<span class="score">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
							<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19H9V8.6a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6zm0-14H9m11.4 14H15v-3.9a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6v3.3a.6.6 0 0 1-.6.6M9 19v-5.9a.6.6 0 0 0-.6-.6H3.6a.6.6 0 0 0-.6.6v5.3a.6.6 0 0 0 .6.6z"/>
						</svg>{{ storyComputed.score }}
					</span>
					<span class="author">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
							<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 20v-1a7 7 0 0 1 7-7v0a7 7 0 0 1 7 7v1m-7-8a4 4 0 1 0 0-8a4 4 0 0 0 0 8"/>
						</svg>{{ storyComputed.by }}
					</span>
					<span class="id">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
							<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.272 10.445L18 2m-8.684 8.632L5 2m7.762 8.048L8.835 2m5.525 0l-1.04 2.5M6 16a6 6 0 1 0 12 0a6 6 0 0 0-12 0"/>
						</svg>{{ storyComputed.authorKarma }}
					</span>
				</p>

				<section v-if="storyComputed?.text" class="story-text-content">
					<h2>Content:</h2>
					<div v-html="cleanString"></div>
				</section>
				<section v-else class="story-link-info">
					<p>This is a link post. Click the title to visit the URL.</p>
				</section>

				<div v-if="storyComputed?.descendants" class="comments">
					<h2>Comments ({{ storyComputed.descendants }})</h2>
					<p>Comments feature to be implemented.</p>
				</div>
				<div v-else class="no-comments">
					<p>No comments available for this story.</p>
				</div>
			</div>
    </div>
	</div>
</template>
<style lang="scss">
	.fade-out {
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.details-container {
		opacity: 1;
		transition: opacity 0.3s ease;
	}

	h1 {
		transition: opacity 0.3s ease;
	}

</style>