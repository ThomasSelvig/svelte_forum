<script lang="ts">
    import { pb, user } from "$lib/pocketbase"
    import Post from "$lib/components/Post.svelte"
    import type { PageData } from './$types'
    import MdiArrowRight from "~icons/mdi/arrow-right"
	import type { PostsPublicResponse, RecordIdString, UsersPublicResponse } from "$lib/pocketbase-types"
    import Modal from "$lib/components/Modal.svelte"
	import { writable } from "svelte/store"
	import { get_data_entries } from "$lib/helpers";
	import Loading from "$lib/components/Loading.svelte";
	import PaginatedList from "$lib/components/PaginatedList.svelte";
    
    export let data: PageData
    let { forum } = data

    let write_post_modal: Modal

    let page = 1
    $: posts = writable(get_posts(forum.id, page))
    async function get_posts(forum_id: RecordIdString, page: number) {
        return pb.collection("posts_public").getList<
            PostsPublicResponse<unknown, {author: UsersPublicResponse}>
        >(page, 20, {
            filter: `forum = "${forum_id}"`,
            expand: "author",
            sort: "-updated"
        })
    }
    

    let error: string
    async function submit_post(e: SubmitEvent) {
        pb.collection("posts").create(get_data_entries(e))
            .then(r => {
                write_post_modal.close()
                posts.set(get_posts(forum.id, page))
            })
            .catch(err => {
                error = err.toString()
            })
    }

</script>


<Modal title="Write Post" bind:this={write_post_modal}>
    <form method="post" on:submit|preventDefault={submit_post}>
        <label>
            Title *
            <input type="text" name="title" required>
        </label>
        <label>
            Body
            <textarea name="body" rows="5"></textarea>
        </label>
        <input type="hidden" name="forum" value={data.forum.id}>
        <input type="hidden" name="author" value={$user?.id}>
        <button>Submit</button>
        {#if error}<p class="error">{error}</p>{/if}
    </form>
</Modal>

<div class="title_bar">
    <h1>
        {#if forum.expand}{forum.expand.category.name}{/if}
        <MdiArrowRight class="icon" />
        {forum.name}
        {#await $posts}<Loading />{/await}
    </h1>
    {#if $user}
        <button on:click={() => {write_post_modal.open()}}><h2>Write Post</h2></button>
    {/if}
</div>

{#await $posts then posts}
    {#each posts.items as post}
        <Post {post} />
    {/each}
    <PaginatedList list={posts} bind:page={page} />
{/await}
