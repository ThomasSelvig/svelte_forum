import type { PageLoad } from './$types'
import { pb } from "$lib/pocketbase"
import type { ForumsResponse, PostsPublicResponse, UsersPublicResponse } from '$lib/pocketbase-types'

export const load = (async ({ params }) => {
    return {
        post: await pb.collection("posts_public")
            .getOne<
                PostsPublicResponse<unknown, {author: UsersPublicResponse, forum: ForumsResponse}>
            >(params.post, {expand: "author,forum"})
    }
}) satisfies PageLoad