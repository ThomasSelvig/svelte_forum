<script lang="ts">
    import { pb, type ExpandRecord, type ExpandRecordSingle } from "$lib/pocketbase"
    import type { PageData } from './$types'
    
    export let data: PageData

    async function get_posts(forum: ExpandRecordSingle) {
        return pb.collection("posts").getList(1, 20, {
            filter: `forum = "${forum.id}"`
        })
            .then(r => r.items)
    }
</script>

<h2>{data.forum.expand.category.name} -> {data.forum.name}</h2>

{#await get_posts(data.forum)}
    <h3>loading...</h3>
{:then forum} 
    <p>{JSON.stringify(forum)}</p>
{/await}