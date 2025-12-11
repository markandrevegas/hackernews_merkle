// composables/usePageHeader.ts
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const message = ref('Top Stories')
const today = ref(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))
const showBackLink = ref(false)
const url = ref<string>('')

export const usePageHeader = () => {
	const route = useRoute()
	const setHeader = (title: string, back = false, link: string) => {
		message.value = title
		showBackLink.value = back
		url.value = link || ''
	}

	watch(
		() => route.path,
		(path) => {
			if (path.startsWith('/stories/')) {
				showBackLink.value = true
			} else {
				message.value = 'Top Stories'
				showBackLink.value = false
				url.value = ''
			}
		},
		{ immediate: true }
	)

	return { message, today, showBackLink, url, setHeader }
}
