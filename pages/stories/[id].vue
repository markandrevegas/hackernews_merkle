
<script setup lang="ts">
	import { ref, computed } from 'vue'
	import { useRoute } from 'vue-router'
	import { useHackerNews } from '~/composables/useHackerNewsApi'
	import type { ArticleAndUser } from '~/types/hacker-news'

	const fadeOut = ref(false)
	const route = useRoute()
	const storyId = Number(route.params.id)

	const { story, user } = useHackerNews()

	const { data: storyData, pending, error } = await useAsyncData('story-' + storyId,
		async () => {
			if (isNaN(storyId)) {
				throw new Error("id is not valid")
			}

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
	console.log(storyComputed.value)
	const formattedTime = computed(() => {
		if (!storyComputed.value) return ''
		return new Date(storyComputed.value.time * 1000).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		})
	})
	const cleanString = computed(() => {
    if (!storyComputed.value || !storyComputed.value.text) return ''
    return storyComputed.value.text
	})

</script>
<template>
	<div class="details-container" :class="{ 'fade-out': fadeOut }">
		<div v-if="pending">
			<p>Loading story details...</p>
		</div>
		<div v-else-if="error">
			<p>Error loading story: {{ error.message }}</p>
		</div>
		<div v-else-if="story" class="detail-card">
			<img :src="`https://picsum.photos/seed/${storyId}/360/240`" :alt="`Image for ${story.title}`" loading="lazy" width="360" height="240" />
      <header class="story-header">
        <a v-if="story.url" :href="story.url" target="_blank" rel="noopener noreferrer" class="story-title-link">
          <span class="url-hint">({{ story.url }})</span>
        </a>
        <h1 v-else>{{ story.title }}</h1>
      </header>
      
      <p class="metadata">
        <span>Score: {{ story.score }}</span> |
        <span>Author: {{ story.by }} (Karma: {{ story.authorKarma }})</span> |
        <span>Posted: {{ formattedTime }}</span>
      </p>

      <section v-if="storyComputed.value.text" class="story-text-content">
        <h2>Content:</h2>
        <div v-html="cleanString"></div>
      </section>
      <section v-else class="story-link-info">
        <p>This is a link post. Click the title to visit the URL.</p>
      </section>

      <div v-if="story.descendants > 0" class="comments-section">
        <h2>Comments ({{ story.descendants }})</h2>
        <p>Comments feature to be implemented.</p>
      </div>
    </div>
	</div>
</template>
<style scoped>
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