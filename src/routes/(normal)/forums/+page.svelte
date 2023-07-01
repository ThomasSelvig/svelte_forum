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

<h1>Forums</h1>

{#await get_forums_by_category()}
    <h2>loading...</h2>
{:then categories} 

    {#each categories as category (category.id)}
        {@const forums = category.expand?.["forums(category)"]}
        <section class="category">
            <h2>{category.name}</h2>
            {#if forums}
            {#each forums as forum}
                <p><a data-sveltekit-preload-data="hover" href={`/forums/${forum.id}`}>{forum.name}</a></p>
            {/each}
            {/if}
        </section>
    {/each}

{:catch error}
    <h2>error: {error}</h2>
{/await}
