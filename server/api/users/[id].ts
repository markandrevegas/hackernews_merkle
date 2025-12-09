// server/api/users/[id].ts
const EXTERNAL_BASE_URL = "https://hacker-news.firebaseio.com/v0"

export default defineEventHandler(async (event) => {
	const userId = getRouterParam(event, "id")

	if (!userId) {
		throw createError({
			statusCode: 400,
			statusMessage: "Valid ID is required."
		})
	}

	const HN_USER_URL = EXTERNAL_BASE_URL + "/user/" + userId + ".json"

	try {
		const userData = await $fetch(HN_USER_URL)
		return userData
	} catch (error) {
		console.error(error)
		throw createError({
			statusCode: 500,
			statusMessage: "Failed to retrieve user " + userId + " from external API."
		})
	}
})