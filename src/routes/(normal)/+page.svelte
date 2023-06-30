<script lang="ts">
    import { pb } from "$lib/pocketbase"
    import Post from "$lib/components/post.svelte"
	import type { ForumsResponse, PostsResponse, UsersResponse } from "$lib/pocketbase-types";

    async function get_latest_posts() {
        return pb.collection("posts").getList(1, 20, {
            expand: "forum,author",
            sort: "-updated"
        }).then(r => r.items as unknown as PostsResponse<{author: UsersResponse, forum: ForumsResponse}>[])
    }
</script>

<h2>Latest posts</h2>

{#await get_latest_posts()}
    <h3>loading...</h3>
{:then posts}
    {#each posts as post}
        <Post {post} show_forum={true} />
    {/each}
    
{/await}
