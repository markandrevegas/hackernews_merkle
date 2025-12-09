<script setup lang="ts">
import type { StoryWithAuthor } from "~/types/hacker-news"

const props = defineProps<{
	story: StoryWithAuthor
}>()

const formattedTime = computed(() => {
	return new Date(props.story.time * 1000).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric"
	})
})

const storyTitle = computed(() => props.story.title)
const storyScore = computed(() => props.story.score)
const storyAuthorKarma = computed(() => props.story.authorKarma)
const storyAuthorId = computed(() => props.story.by)
const storyType = computed(() => props.story.type)
</script>
<template>
	<NuxtLink :to="`/stories/${props.story.id}`" class="story-link">
		<div class="card">
			<img :src="`https://picsum.photos/seed/${props.story.id}/120/120`" :alt="`Image for ${props.story.title}`" loading="lazy" width="120" height="120" style="max-width:100%;height:auto;" />
			<div class="card-text">
				<div style="display:flex;justify-content:space-between;align-items:center;">
					<span class="time type">{{ storyType }}</span>
					<p class="time">{{ formattedTime }}</p>
				</div>
				<a :href="props.story.url" target="_blank" rel="noopener noreferrer" class="external-link">
					<h2>{{ storyTitle }}</h2>
				</a>
				<p class="metadata">
					<span class="id">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
							<g fill="none" stroke="currentColor" stroke-width="1.5">
								<circle cx="9" cy="9" r="2" />
								<path d="M13 15c0 1.105 0 2-4 2s-4-.895-4-2s1.79-2 4-2s4 .895 4 2Z" />
								<path d="M2 12c0-3.771 0-5.657 1.172-6.828S6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172S22 8.229 22 12s0 5.657-1.172 6.828S17.771 20 14 20h-4c-3.771 0-5.657 0-6.828-1.172S2 15.771 2 12Z" opacity=".5" />
								<path stroke-linecap="round" d="M19 12h-4m4-3h-5" />
								<path stroke-linecap="round" d="M19 15h-3" opacity=".9" />
							</g>
						</svg>
						{{ storyAuthorId }}</span
					>
					<span class="score">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
							<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
								<path d="m22 7l-7.38 7.335c-.997.991-1.496 1.487-2.115 1.487s-1.117-.496-2.115-1.488l-.24-.238c-.997-.992-1.497-1.489-2.116-1.489s-1.118.497-2.115 1.49L2 18" opacity=".5" />
								<path d="M22 12.546V7h-5.582" />
							</g>
						</svg>
						{{ storyScore }}</span
					>
					<span class="author">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 14 14">
							<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
								<circle cx="6.87" cy="5" r="4.5" />
								<circle cx="6.87" cy="5" r="2" />
								<path d="m6 9.42l-.88 3.7a.51.51 0 0 1-.26.33a.54.54 0 0 1-.43 0L1.11 12a.51.51 0 0 1-.18-.78L3.5 8M8 9.37l.9 3.75a.5.5 0 0 0 .27.33a.51.51 0 0 0 .42 0l3.3-1.45a.5.5 0 0 0 .28-.35a.48.48 0 0 0-.1-.43l-2.68-3.41" />
							</g>
						</svg>
						{{ storyAuthorKarma }}</span
					>
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
