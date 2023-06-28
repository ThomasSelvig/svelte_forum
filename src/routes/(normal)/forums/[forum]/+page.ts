import type { PageLoad } from './$types'
import { pb, type ExpandRecordSingle } from "$lib/pocketbase"

export const load = (async ({ params }) => {
    return {
        forum: await pb.collection("forums")
            .getOne(params.forum, {expand: "category"})
    } as {forum: ExpandRecordSingle}
}) satisfies PageLoad