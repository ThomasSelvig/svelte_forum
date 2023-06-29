import type { PageLoad } from './$types'
import { pb, type ExpandRecord } from "$lib/pocketbase"

export const load = (async ({ params }) => {
    return {
        post: await pb.collection("posts")
            .getOne(params.post, {expand: "author,forum"})
    } as {post: ExpandRecord}
}) satisfies PageLoad