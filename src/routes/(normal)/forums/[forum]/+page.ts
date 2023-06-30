import type { PageLoad } from './$types'
import { pb } from "$lib/pocketbase"
import type { ForumCategoriesResponse, ForumsResponse } from '$lib/pocketbase-types'

export const load = (async ({ params }) => {
    return {
        forum: await pb.collection("forums")
            .getOne(params.forum, {expand: "category"})
    } as {forum: ForumsResponse<{category: ForumCategoriesResponse}>}
}) satisfies PageLoad