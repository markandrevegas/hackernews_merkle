// server/api/stories/[id].ts

const EXTERNAL_BASE_URL = "https://hacker-news.firebaseio.com/v0"

export default defineEventHandler(async (event) => {
	const storyId = getRouterParam(event, "id")

	if (!storyId) {
		throw createError({
			statusCode: 400,
			statusMessage: "Valid ID is required."
		})
	}

	const HN_ITEM_URL = EXTERNAL_BASE_URL + "/item/" + storyId + ".json"

	try {
		const storyData = await $fetch(HN_ITEM_URL)
		return storyData
	} catch (error) {
		console.error(error)
		throw createError({
			statusCode: 500,
			statusMessage: "Failed to retrieve story " + storyId + " from hacker-news api"
		})
	}
})