<script setup lang="ts">
import type { ArticleAndUser } from '~/types/hacker-news'

const props = defineProps<{
	story: ArticleAndUser
}>()

const formattedTime = computed(() => {
	return new Date(props.story.time * 1000).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	})
})

const storyTitle = computed(() => props.story.title)
const storyScore = computed(() => props.story.score)
const storyAuthorKarma = computed(() => props.story.authorKarma)
// truncate the user id if more than 12 charactrs
const storyAuthorId = computed(() => {
	const id = props.story.by
	return id.length > 12 ? id.slice(0, 12) + '…' : id
})
const storyType = computed(() => props.story.type)
</script>
<template>
	<NuxtLink :to="`/stories/${props.story.id}`" class="story-link">
		<div class="card">
			<img :src="`https://picsum.photos/seed/${props.story.id}/120/120`" :alt="`Image for ${props.story.title}`" loading="lazy" width="120" height="120" />
			<div class="card-text">
				<a :href="props.story.url" target="_blank" rel="noopener noreferrer" class="external-link">
					<h2>{{ storyTitle }}</h2>
				</a>
				<p class="time">Published: {{ formattedTime }}</p>
				<p class="metadata">
					<span class="id">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
							<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 20v-1a7 7 0 0 1 7-7v0a7 7 0 0 1 7 7v1m-7-8a4 4 0 1 0 0-8a4 4 0 0 0 0 8" />
						</svg>
						{{ storyAuthorId }}
					</span>
					<span class="score">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
							<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19H9V8.6a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6zm0-14H9m11.4 14H15v-3.9a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6v3.3a.6.6 0 0 1-.6.6M9 19v-5.9a.6.6 0 0 0-.6-.6H3.6a.6.6 0 0 0-.6.6v5.3a.6.6 0 0 0 .6.6z" />
						</svg>
						{{ storyScore }}
					</span>
					<span class="author">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
							<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.272 10.445L18 2m-8.684 8.632L5 2m7.762 8.048L8.835 2m5.525 0l-1.04 2.5M6 16a6 6 0 1 0 12 0a6 6 0 0 0-12 0" />
						</svg>
						{{ storyAuthorKarma }}
					</span>
				</p>
			</div>
		</div>
	</NuxtLink>
</template>
<style lang="scss" scoped>
.external-link,
.story-link {
	text-decoration: none;
	color: inherit;
}
</style>
