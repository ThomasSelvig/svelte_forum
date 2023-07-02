import { pb } from '$lib/pocketbase';
import type { ForumCategoriesResponse, ForumsResponse } from '$lib/pocketbase-types';
import type { PageLoad } from './$types';

export const load = (async () => {
    return {
        forums_by_category: pb.collection("forum_categories").getFullList<
            ForumCategoriesResponse<{ "forums(category)": ForumsResponse[] }>[]
        >({
            sort: "-id",
            expand: "forums(category)"
        })
    }
}) satisfies PageLoad;