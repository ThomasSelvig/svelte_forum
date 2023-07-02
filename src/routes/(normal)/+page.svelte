<script lang="ts">
    import { pb } from "$lib/pocketbase"
    import Post from "$lib/components/Post.svelte"
	import type { ForumsResponse, PostsPublicResponse, UsersPublicResponse } from "$lib/pocketbase-types";
	import { writable } from "svelte/store";
	import type { ListResult } from "pocketbase";

    let posts = writable(get_latest_posts())
    async function get_latest_posts() {
        return pb.collection("posts_public").getList<
            PostsPublicResponse<{author: UsersPublicResponse, forum: ForumsResponse}>
        > (1, 20, {
            expand: "forum,author",
            sort: "-updated"
        })
    }

    // pb.collection("posts").subscribe("*", _ => {
    //     $posts = get_latest_posts()
    // })
</script>

<h1>Latest posts</h1>

{#await $posts}
    <h2>loading...</h2>
{:then postslist}
    {#each postslist.items as post}
        <Post {post} />
    {/each}
    
{/await}
