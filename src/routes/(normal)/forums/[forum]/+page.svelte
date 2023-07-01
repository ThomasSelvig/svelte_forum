<script lang="ts">
    import { pb, user } from "$lib/pocketbase"
    import Post from "$lib/components/post.svelte"
    import type { PageData } from './$types'
    import MdiArrowRight from "~icons/mdi/arrow-right"
	import type { PostsResponse, RecordIdString, UsersResponse } from "$lib/pocketbase-types"
    import Modal from "$lib/components/Modal.svelte"
	import { writable } from "svelte/store"
	import type { ListResult } from "pocketbase"
	import { get_data_entries } from "$lib/form_helpers";
    import MicroModal from "micromodal"
    
    export let data: PageData
    let { forum } = data

    let posts = writable(get_posts(forum.id))
    async function get_posts(forum_id: RecordIdString) {
        return pb.collection("posts").getList(1, 20, {
            filter: `forum = "${forum_id}"`,
            expand: "author",
            sort: "-updated"
        }) as Promise<ListResult<PostsResponse<{author: UsersResponse}>>>
    }
    

    let error: string
    async function submit_post(e: SubmitEvent) {
        pb.collection("posts").create(get_data_entries(e))
            .then(r => {
                MicroModal.close("write-post-modal")
                posts.set(get_posts(forum.id))
            })
            .catch(err => {
                error = err.toString()
            })
    }

</script>


<Modal title="Write Post" modal_id="write-post-modal">
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
    </h1>
    {#if $user}
        <button data-micromodal-trigger="write-post-modal"><h2>Write Post</h2></button>
    {/if}
</div>

{#await $posts}
    <h2>loading...</h2>
{:then postslist}
    {#each postslist.items as post}
        <Post {post} />
    {/each}
{/await}
