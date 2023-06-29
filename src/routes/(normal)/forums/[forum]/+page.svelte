<script lang="ts">
    import { pb, type ExpandRecord } from "$lib/pocketbase"
    import Post from "$lib/components/post.svelte"
    import type { PageData } from './$types'
    import { fade, fly } from "svelte/transition";
    
    export let data: PageData

    async function get_posts(forum: ExpandRecord) {
        return pb.collection("posts").getList(1, 20, {
            filter: `forum = "${forum.id}"`,
            expand: "author",
            sort: "-updated"
        }).then(r => r.items as ExpandRecord[])
    }
</script>

<h2>{data.forum.expand.category.name} -> {data.forum.name}</h2>

{#await get_posts(data.forum)}
    <h3>loading...</h3>
{:then posts} 
    {#each posts as post}
        <Post {post} />
    {/each}
{/await}