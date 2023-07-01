import { pb } from '$lib/pocketbase';
import type { ForumCategoriesResponse, ForumsResponse } from '$lib/pocketbase-types';
import type { PageLoad } from './$types';

export const load = (async () => {
    return {
        forums_by_category: pb.collection("forum_categories").getFullList({
            sort: "-id",
            expand: "forums(category)"
        })
    } as {forums_by_category: Promise<
        ForumCategoriesResponse<{ "forums(category)": ForumsResponse[] }>[]
    >};
}) satisfies PageLoad;