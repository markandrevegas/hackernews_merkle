// composable/useHackerNewsApi.ts
import type { Article, User, ArticleAndUser } from "~/types/hacker-news"

export const useHackerNews = () => {
	// get story/user
	const story = (id: number) => $fetch<Article>(`/api/stories/${id}`)
	const user = (id: string) => $fetch<User>(`/api/users/${id}`)

	// number of ids to get as described in assignment
	const idCount = (arr: number[], n = 10) => {
		const a = [...arr]
		for (let i = a.length - 1; i > 0 && n > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[a[i], a[j]] = [a[j], a[i]]
		}
		return a.slice(0, n)
	}

	const getData = async (take = 10): Promise<ArticleAndUser[]> => {
		const top = await $fetch<number[]>("/api/stories/top").catch(() => [])

		const stories = await Promise.all(idCount([...top], take).map(story))

		const ids = [...new Set(stories.map((s) => s.by))]
		const authors = await Promise.all(ids.map(user))

		const karma: Record<string, number> = {}
		for (const a of authors) karma[a.id] = a.karma

		// merge story with author karma
		return stories.map((s) => ({
			...s,
			authorKarma: karma[s.by] ?? 0
		}))
	}
	// expose the functions for use in components
	return {
		getData,
		story,
		user
	}
}
