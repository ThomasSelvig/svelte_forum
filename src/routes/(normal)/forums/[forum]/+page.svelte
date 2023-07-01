<style lang="scss">
    .title_bar {
        margin: 1rem 0 2rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .title_bar > h2 {
        margin: 0;
    }
    .title_bar > button {
        padding: 0 2rem;
    }
</style>

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
    <h2>
        {#if forum.expand}{forum.expand.category.name}{/if}
        <MdiArrowRight class="icon" />
        {forum.name}
    </h2>
    {#if $user}
        <button data-micromodal-trigger="write-post-modal"><h2>Write Post</h2></button>
    {/if}
</div>

{#await $posts}
    <h3>loading...</h3>
{:then postslist}
    {#each postslist.items as post}
        <Post {post} />
    {/each}
{/await}
