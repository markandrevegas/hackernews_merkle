// server/api/stories/top.ts
const HN_FIREBASE = 'https://hacker-news.firebaseio.com/v0/topstories.json'

export default defineEventHandler(async (event) => {
	try {
		const storyIds = await $fetch<number[]>(HN_FIREBASE)
		return storyIds
	} catch (error) {
		console.error(error)
		throw createError({
			statusCode: 500,
			statusMessage: 'Failed to retrieve top story IDs.',
			data: {
				api: 'HackerNews',
				error: error as string
			}
		})
	}
})
