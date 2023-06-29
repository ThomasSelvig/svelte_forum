<script lang="ts">
    import { pb, type ExpandRecord } from "$lib/pocketbase"
    import Post from "$lib/components/post.svelte"

    async function get_latest_posts() {
        return pb.collection("posts").getList(1, 20, {
            expand: "forum,author",
            sort: "-updated"
        })
            .then(r => r.items) as Promise<ExpandRecord[]>
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
