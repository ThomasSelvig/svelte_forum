import type { PageLoad } from './$types'
import { pb } from "$lib/pocketbase"
import type { ForumsResponse, PostsResponse, UsersResponse } from '$lib/pocketbase-types'

export const load = (async ({ params }) => {
    return {
        post: await pb.collection("posts")
            .getOne(params.post, {expand: "author,forum"})
    } as {post: PostsResponse<{author: UsersResponse, forum: ForumsResponse}>}
}) satisfies PageLoad