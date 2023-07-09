<script lang="ts">
	import { writable } from 'svelte/store';
    import type { PageData } from './$types';
	import type { ListResult } from 'pocketbase';
	import type { ForumsResponse, PostsPublicResponse, UsersPublicResponse } from '$lib/pocketbase-types';
	import { pb } from '$lib/pocketbase';
	import Loading from '$lib/components/Loading.svelte';
	import Post from '$lib/components/Post.svelte';
	import PaginatedList from '$lib/components/PaginatedList.svelte';
    
    export let data: PageData;

    let page = 1
    let posts = writable<Promise<ListResult<
        PostsPublicResponse<number, {
            forum: ForumsResponse,
            author: UsersPublicResponse
        }>
    >>>()

    function load_posts(page: number) {
        $posts = pb.collection("posts_public").getList(page, 20, {
            filter: `author="${data.req_user_id}"`,
            sort: "-created",
            expand: "forum,author"
        })
    }
    $: load_posts(page)
</script>

<h2>Posts {#await $posts}<Loading />{/await}</h2>
{#await $posts then posts}

    {#each posts.items as post}
        <Post {post} />
    {/each}
    <PaginatedList list={posts} bind:page={page} />

{/await}
