// composables/usePageHeader.ts
import { ref } from "vue"

export const usePageHeader = () => {
	const message = ref("Top Stories")
	const today = ref(new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }))
	const showBackLink = ref(false)

	return { message, today, showBackLink }
}