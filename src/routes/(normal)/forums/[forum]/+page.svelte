<script lang="ts">
    import { pb, user } from "$lib/pocketbase"
    import Post from "$lib/components/post.svelte"
    import type { PageData } from './$types'
    import MdiArrowRight from "~icons/mdi/arrow-right"
	import type { ForumsResponse, PostsResponse, UsersResponse } from "$lib/pocketbase-types"
    import Modal from "$lib/components/Modal.svelte"
    import MicroModal from "micromodal"
	import { writable } from "svelte/store"
	import type { ListResult } from "pocketbase"
    
    export let data: PageData
    let { forum } = data

    let posts = writable(get_posts(forum))
    async function get_posts(forum: ForumsResponse) {
        // await new Promise(r => setTimeout(r, 3000))  // simulate loading
        return pb.collection("posts").getList(1, 20, {
            filter: `forum = "${forum.id}"`,
            expand: "author",
            sort: "-updated"
        }) as Promise<ListResult<PostsResponse<{author: UsersResponse, forum: any}>>>
    }
    

    let error: string
    async function submit_post(e: SubmitEvent) {
        const data = Object.fromEntries((new FormData(e.target as HTMLFormElement)).entries())
        pb.collection("posts").create(data)
            .then(r => {
                MicroModal.close()
                posts.set(get_posts(forum))
            })
            .catch(err => {
                error = err.toString()
            })
    }

</script>


<Modal title="Write Post">
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
