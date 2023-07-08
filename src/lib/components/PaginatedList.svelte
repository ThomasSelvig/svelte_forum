<script lang="ts">
	import type { ListResult } from "pocketbase";

    export let list: ListResult<any>
    export let page: number
</script>

<!-- 
    This component doesn't show the items of the list, only the
    buttons for pagination based on the ListResult. I would've
    had it like this:

// in some +page.svelte:

<PaginatedList let:item list={posts}>
    <Post post={item} />
</PaginatedList>


// in PaginatedList.svelte:

{#each list.items as item}
    <slot {item} />
{/each}

    if it weren't for the fact that you can't pass types to components,
    leading to {item} being passed as "any".
 -->

<div class="meta">
    Showing
    {(list.page - 1) * list.perPage}-{list.items.length + (list.page - 1) * list.perPage}
    out of
    {list.totalItems}
</div>

<div class="page_buttons">
    {#each {length: list.totalItems / list.perPage} as _, i}
        {@const page_i = i+1}

        <button class="icon" on:click={ () => {page = page_i} }>Page {page_i}</button>

    {/each}
</div>
