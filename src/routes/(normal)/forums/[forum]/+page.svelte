<style lang="scss">
    .title_bar {
        margin: 1rem 0 2rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .title_bar > h2 {
        margin: 0;
    }
    .title_bar > button {
        padding: 0 2rem;
    }
</style>

<script lang="ts">
    import { pb } from "$lib/pocketbase"
    import Post from "$lib/components/post.svelte"
    import type { PageData } from './$types'
    import MdiArrowRight from "~icons/mdi/arrow-right"
	import type { ForumsResponse, PostsResponse, UsersResponse } from "$lib/pocketbase-types";
    
    export let data: PageData

    async function get_posts(forum: ForumsResponse) {
        return pb.collection("posts").getList(1, 20, {
            filter: `forum = "${forum.id}"`,
            expand: "author",
            sort: "-updated"
        }).then(r => r.items as unknown as PostsResponse<{author: UsersResponse, forum: any}>[])
    }
</script>

<div class="title_bar">
    <h2>
        {#if data.forum.expand}{data.forum.expand.category.name}{/if}
        <MdiArrowRight class="icon" />
        {data.forum.name}
    </h2>
    <button><h2>Write Post</h2></button>
</div>

{#await get_posts(data.forum)}
    <h3>loading...</h3>
{:then posts} 
    {#each posts as post}
        <Post {post} />
    {/each}
{/await}
