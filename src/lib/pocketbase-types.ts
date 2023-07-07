/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	CommentVotes = "comment_votes",
	Comments = "comments",
	CommentsPublic = "comments_public",
	Following = "following",
	FollowingPublic = "following_public",
	ForumCategories = "forum_categories",
	Forums = "forums",
	PostScores = "post_scores",
	PostVotes = "post_votes",
	Posts = "posts",
	PostsPublic = "posts_public",
	Users = "users",
	UsersPublic = "users_public",
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

export type CommentsPublicRecord = {
	comment: string
	post?: RecordIdString
	author?: RecordIdString
}

export type FollowingRecord = {
	user: RecordIdString
	following: RecordIdString
	notifications?: boolean
}

export type FollowingPublicRecord = {
	user: RecordIdString
	following?: RecordIdString
}

export type ForumCategoriesRecord = {
	name?: string
}

export type ForumsRecord = {
	name?: string
	category: RecordIdString
}

export type PostScoresRecord<Tscore = unknown> = {
	score?: null | Tscore
	author: RecordIdString
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

export type PostsPublicRecord<Tscore = unknown> = {
	title: string
	body?: string
	forum?: RecordIdString
	author?: RecordIdString
	comments_count?: number
	score?: null | Tscore
}

export type UsersRecord = {
	avatar?: string
	bio?: string
}

export type UsersPublicRecord<Tscore = unknown> = {
	username?: string
	bio?: string
	avatar?: string
	score?: null | Tscore
}

// Response types include system fields and match responses from the PocketBase API
export type CommentVotesResponse<Texpand = unknown> = Required<CommentVotesRecord> & BaseSystemFields<Texpand>
export type CommentsResponse<Texpand = unknown> = Required<CommentsRecord> & BaseSystemFields<Texpand>
export type CommentsPublicResponse<Texpand = unknown> = Required<CommentsPublicRecord> & BaseSystemFields<Texpand>
export type FollowingResponse<Texpand = unknown> = Required<FollowingRecord> & BaseSystemFields<Texpand>
export type FollowingPublicResponse<Texpand = unknown> = Required<FollowingPublicRecord> & BaseSystemFields<Texpand>
export type ForumCategoriesResponse<Texpand = unknown> = Required<ForumCategoriesRecord> & BaseSystemFields<Texpand>
export type ForumsResponse<Texpand = unknown> = Required<ForumsRecord> & BaseSystemFields<Texpand>
export type PostScoresResponse<Tscore = unknown, Texpand = unknown> = Required<PostScoresRecord<Tscore>> & BaseSystemFields<Texpand>
export type PostVotesResponse<Texpand = unknown> = Required<PostVotesRecord> & BaseSystemFields<Texpand>
export type PostsResponse<Texpand = unknown> = Required<PostsRecord> & BaseSystemFields<Texpand>
export type PostsPublicResponse<Tscore = unknown, Texpand = unknown> = Required<PostsPublicRecord<Tscore>> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>
export type UsersPublicResponse<Tscore = unknown, Texpand = unknown> = Required<UsersPublicRecord<Tscore>> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	comment_votes: CommentVotesRecord
	comments: CommentsRecord
	comments_public: CommentsPublicRecord
	following: FollowingRecord
	following_public: FollowingPublicRecord
	forum_categories: ForumCategoriesRecord
	forums: ForumsRecord
	post_scores: PostScoresRecord
	post_votes: PostVotesRecord
	posts: PostsRecord
	posts_public: PostsPublicRecord
	users: UsersRecord
	users_public: UsersPublicRecord
}

export type CollectionResponses = {
	comment_votes: CommentVotesResponse
	comments: CommentsResponse
	comments_public: CommentsPublicResponse
	following: FollowingResponse
	following_public: FollowingPublicResponse
	forum_categories: ForumCategoriesResponse
	forums: ForumsResponse
	post_scores: PostScoresResponse
	post_votes: PostVotesResponse
	posts: PostsResponse
	posts_public: PostsPublicResponse
	users: UsersResponse
	users_public: UsersPublicResponse
}