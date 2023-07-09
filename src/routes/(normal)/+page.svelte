<script lang="ts">
    import { pb } from "$lib/pocketbase"
    import Post from "$lib/components/Post.svelte"
	import type { ForumsResponse, PostsPublicResponse, UsersPublicResponse } from "$lib/pocketbase-types";
	import { writable } from "svelte/store";
	import Loading from "$lib/components/Loading.svelte";
	import PaginatedList from "$lib/components/PaginatedList.svelte";
    

    let page = 1
    $: posts = writable(get_latest_posts(page))
    async function get_latest_posts(page: number) {
        return pb.collection("posts_public").getList<
            PostsPublicResponse<number, {author: UsersPublicResponse, forum: ForumsResponse}>
        > (1, 20, {
            expand: "forum,author",
            sort: "-updated"
        })
    }
</script>


<h1 class="title_bar">Latest posts {#await $posts}<Loading />{/await}</h1>

{#await $posts then posts}
    {#each posts.items as post}
        <Post {post} />
    {/each}
    <PaginatedList list={posts} bind:page={page} />
{/await}
