// composable/useHackerNewsApi.ts
import type { Article, User, ArticleAndUser } from '~/types/hacker-news'

export const useHackerNews = () => {

	// get the articles and authors
	const story = (id: number) => $fetch<Article>('/api/stories/' + id)
	const user = (id: string) => $fetch<User>('/api/users/' + id)

	// function to get top 10 as random
	const randomIds = (arr: number[], n = 10) => {
		const a = [...arr]
		for (let i = a.length - 1; i > 0 && n > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[a[i], a[j]] = [a[j], a[i]]
		}
		return a.slice(0, n)
	}

	const getData = async (itemCount = 10): Promise<ArticleAndUser[]> => {
		// check if there are any cached stories
		if (process.client) {
			const cached = localStorage.getItem('cachedStories')
			if (cached) {
				return JSON.parse(cached) as ArticleAndUser[]
			}
		}
		// if not cached, fetch from hn using server/api
		// Fetch top story IDs
		const top = await $fetch<number[]>('/api/stories/top').catch(() => [])
		const stories = await Promise.all(randomIds([...top], itemCount).map(story))

		// Fetch unique authors
		const ids = [...new Set(stories.map((s) => s.by))]
		const authors = await Promise.all(ids.map((id) => user(id)))
		const karma = Object.fromEntries(authors.map((a) => [a.id, a.karma])) as Record<string, number>

		// Merge story with author karma
		const mergedStories: ArticleAndUser[] = stories.map((s) => ({
			...s,
			authorKarma: karma[s.by] ?? 0
		}))

		// now that we have our top 10 stash them
		if (process.client) {
			localStorage.setItem('cachedStories', JSON.stringify(mergedStories))
		}

		return mergedStories
	}

	return { getData, story, user }
}

