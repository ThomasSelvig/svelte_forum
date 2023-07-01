<script lang="ts">
	import type { PageData } from "./$types";

    export let data: PageData
    let { forums_by_category } = data

</script>

<h1>Forums</h1>

{#each forums_by_category as category (category.id)}
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
