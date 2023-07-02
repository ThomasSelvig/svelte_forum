import type { PageLoad } from './$types'
import { pb } from "$lib/pocketbase"
import type { ForumCategoriesResponse, ForumsResponse } from '$lib/pocketbase-types'

export const load = (async ({ params }) => {
    return {
        forum: pb.collection("forums").getOne<
            ForumsResponse<{category: ForumCategoriesResponse}>
        >(params.forum, {expand: "category"})
    }
}) satisfies PageLoad