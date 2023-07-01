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
	import type { ForumsResponse, PostsResponse, UsersResponse } from "$lib/pocketbase-types";
    import Modal from "$lib/components/Modal.svelte";
    import MicroModal from "micromodal"
    
    export let data: PageData

    async function get_posts(forum: ForumsResponse) {
        return pb.collection("posts").getList(1, 20, {
            filter: `forum = "${forum.id}"`,
            expand: "author",
            sort: "-updated"
        }).then(r => r.items as unknown as PostsResponse<{author: UsersResponse, forum: any}>[])
    }

    let error: string
    async function submit_post(e: SubmitEvent) {
        const data = Object.fromEntries((new FormData(e.target as HTMLFormElement)).entries())
        pb.collection("posts").create(data)
            .then(r => {
                MicroModal.close()
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
        <!-- <button data-micromodal-close>Submit</button> -->
        <!-- <button on:click={() => {MicroModal.close()}}>Submit</button> -->
        <button>Submit</button>
        <p class="error">{error}</p>
    </form>
</Modal>

<div class="title_bar">
    <h2>
        {#if data.forum.expand}{data.forum.expand.category.name}{/if}
        <MdiArrowRight class="icon" />
        {data.forum.name}
    </h2>
    {#if $user}
        <button data-micromodal-trigger="write-post-modal"><h2>Write Post</h2></button>
    {/if}
</div>

{#await get_posts(data.forum)}
    <h3>loading...</h3>
{:then posts} 
    {#each posts as post}
        <Post {post} />
    {/each}
{/await}
