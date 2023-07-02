<script lang="ts">
    import { pb } from "$lib/pocketbase"
    import Post from "$lib/components/Post.svelte"
	import type { ForumsResponse, PostsPublicResponse, UsersPublicResponse } from "$lib/pocketbase-types";
	import { writable } from "svelte/store";
	import Loading from "$lib/components/Loading.svelte";
    

    let posts = writable(get_latest_posts())
    async function get_latest_posts() {
        return pb.collection("posts_public").getList<
            PostsPublicResponse<unknown, {author: UsersPublicResponse, forum: ForumsResponse}>
        > (1, 20, {
            expand: "forum,author",
            sort: "-updated"
        })
    }
</script>


<h1>Latest posts {#await $posts}<Loading />{/await}</h1>

{#await $posts then postslist}
    {#each postslist.items as post}
        <Post {post} />
    {/each}
{/await}
