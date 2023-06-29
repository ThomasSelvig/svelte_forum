/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	CommentVotes = "comment_votes",
	Comments = "comments",
	ForumCategories = "forum_categories",
	Forums = "forums",
	PostVotes = "post_votes",
	Posts = "posts",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type CommentVotesRecord = {
	user: RecordIdString
	comment: RecordIdString
	vote: number
}

export type CommentsRecord = {
	comment: string
	author: RecordIdString
	post: RecordIdString
}

export type ForumCategoriesRecord = {
	name?: string
}

export type ForumsRecord = {
	name?: string
	category: RecordIdString
}

export type PostVotesRecord = {
	user: RecordIdString
	post: RecordIdString
	vote: number
}

export type PostsRecord = {
	title: string
	body?: string
	forum: RecordIdString
	author: RecordIdString
}

export type UsersRecord = {
	name?: string
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type CommentVotesResponse<Texpand = unknown> = Required<CommentVotesRecord> & BaseSystemFields<Texpand>
export type CommentsResponse<Texpand = unknown> = Required<CommentsRecord> & BaseSystemFields<Texpand>
export type ForumCategoriesResponse<Texpand = unknown> = Required<ForumCategoriesRecord> & BaseSystemFields<Texpand>
export type ForumsResponse<Texpand = unknown> = Required<ForumsRecord> & BaseSystemFields<Texpand>
export type PostVotesResponse<Texpand = unknown> = Required<PostVotesRecord> & BaseSystemFields<Texpand>
export type PostsResponse<Texpand = unknown> = Required<PostsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	comment_votes: CommentVotesRecord
	comments: CommentsRecord
	forum_categories: ForumCategoriesRecord
	forums: ForumsRecord
	post_votes: PostVotesRecord
	posts: PostsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	comment_votes: CommentVotesResponse
	comments: CommentsResponse
	forum_categories: ForumCategoriesResponse
	forums: ForumsResponse
	post_votes: PostVotesResponse
	posts: PostsResponse
	users: UsersResponse
}