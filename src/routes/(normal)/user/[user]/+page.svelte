<script lang="ts">
	import { writable } from 'svelte/store';
    import type { PageData } from './$types';
	import type { ForumsResponse, PostsPublicResponse, UsersPublicResponse } from '$lib/pocketbase-types';
	import Loading from '$lib/components/Loading.svelte';
	import Post from '$lib/components/Post.svelte';
	import { pb } from '$lib/pocketbase';
	import PaginatedList from '$lib/components/PaginatedList.svelte';
    
    export let data: PageData;
    $: req_user_id = data.req_user_id

    let page = 1
    $: posts = writable(
        pb.collection("posts_public").getList<PostsPublicResponse<
            number,
            {author: UsersPublicResponse, forum: ForumsResponse}
        >>(page, 20, {
            filter: `author = "${req_user_id}"`,
            expand: "author,forum",
            sort: "-updated"
        })
    )
</script>

<h2 class="title_bar">Latest Posts {#await $posts}<Loading />{/await}</h2>
{#await $posts then posts}
    {#each posts.items as post}
        <Post {post} />
    {/each}
    <PaginatedList list={posts} bind:page={page} />
{/await}
