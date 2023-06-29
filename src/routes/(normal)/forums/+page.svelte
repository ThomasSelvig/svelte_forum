<script lang="ts">
    import { pb, type ExpandRecord } from "$lib/pocketbase"
	import type { Record } from "pocketbase";

    async function get_forums_by_category(): Promise<ExpandRecord<Record[]>[]> {
        return pb.collection("forum_categories").getFullList({
            sort: "-id",
            expand: "forums(category)"
        })
    }

</script>

<h2>Forums</h2>

{#await get_forums_by_category()}
    <h3>loading...</h3>
{:then categories} 

    {#each categories as category (category.id)}
        <section class="category">
            <h3>{category.name}</h3>
            {#each category.expand["forums(category)"] as forum}
                <p><a data-sveltekit-preload-data="hover" href={`/forums/${forum.id}`}>{forum.name}</a></p>
            {/each}
        </section>
    {/each}

{:catch error}
    <h3>error: {error}</h3>
{/await}
