// types/hacker-news.ts
export interface Article {
	id: number
	by: string // author ID
	descendants?: number // Number of comments
	kids?: number[] // IDs of the comments
	score: number
	time: number
	title: string
	type: 'story' | 'job' | 'comment' | 'poll' | 'pollopt'
	url: string
	deleted?: boolean
	dead?: boolean
	text?: string
}

export interface User {
	id: string
	karma: number
	created: number
	submitted?: number[]
}

export interface ArticleAndUser extends Article {
	authorKarma: number
}
