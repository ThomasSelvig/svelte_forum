<script lang="ts">
    import { pb } from "$lib/pocketbase"
	import type { ForumCategoriesResponse, ForumsResponse } from "$lib/pocketbase-types";
	import type { Record } from "pocketbase";

    async function get_forums_by_category(): Promise<
        ForumCategoriesResponse<{ "forums(category)": ForumsResponse[] }>[]
    > {
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
        {@const forums = category.expand?.["forums(category)"]}
        <section class="category">
            <h3>{category.name}</h3>
            {#if forums}
            {#each forums as forum}
                <p><a data-sveltekit-preload-data="hover" href={`/forums/${forum.id}`}>{forum.name}</a></p>
            {/each}
            {/if}
        </section>
    {/each}

{:catch error}
    <h3>error: {error}</h3>
{/await}
