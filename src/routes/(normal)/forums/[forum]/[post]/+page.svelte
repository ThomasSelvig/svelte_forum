<style lang="scss">
    .post, .comment {
        padding: 1rem;
        background: $main_background;
    }
    .comment {
        margin: 1rem 0;
    }
    .comments {
        margin: 2rem 0 0 0;
    }
</style>

<script lang="ts">
	import { pb, user } from '$lib/pocketbase';
	import type { CommentsResponse, RecordIdString } from '$lib/pocketbase-types';
	import type { ListResult } from 'pocketbase';
    import type { PageData } from './$types';
	import Modal from '$lib/components/Modal.svelte';
	import { get_data_entries } from '$lib/form_helpers';
	import { writable } from 'svelte/store';
    import MicroModal from "micromodal"
    
    export let data: PageData;
    const { post } = data

    let comments = writable(get_comments(post.id))
    async function get_comments(post: RecordIdString) {
        return pb.collection("comments").getList(1, 20, {
            sort: "+created",
            expand: "author",
            filter: `post = "${post}"`
        }) as Promise<ListResult<CommentsResponse>>
    }

    let error: string
    async function submit_comment(e: SubmitEvent) {
        pb.collection("comments").create(get_data_entries(e))
            .then(r => {
                MicroModal.close("write-comment-modal")
                $comments = get_comments(post.id)
            })
            .catch(err => {
                error = err.toString()
            })
    }
</script>


<Modal title="Write Comment" modal_id="write-comment-modal">
    <form method="post" on:submit|preventDefault={submit_comment}>
        <label>
            Comment *
            <textarea name="comment" rows="5"></textarea>
        </label>
        <input type="hidden" name="author" value={$user?.id}>
        <input type="hidden" name="post" value={post.id}>
        <button>Submit</button>
        {#if error}<p class="error">{error}</p>{/if}
    </form>
</Modal>

<div class="title_bar">
    <h1>Post</h1>
    {#if $user}
        <button data-micromodal-trigger="write-comment-modal"><h2>Write Comment</h2></button>
    {/if}
</div>

<article class="post">
    <h3>{post.title}</h3>
    <p>{post.body}</p>
</article>
<section class="comments">
    <h2>Comments</h2>
    {#await $comments}
        <h3>Loading...</h3>
    {:then comments} 
        {#each comments.items as comment}
            <div class="comment">
                <span>{comment.comment}</span>
            </div>
        {/each}
    {/await}
</section>
