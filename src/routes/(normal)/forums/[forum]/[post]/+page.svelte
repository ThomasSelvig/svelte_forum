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
    .meta {
        flex-basis: 40%;
        display: flex;
        justify-content: space-between;
        & * {
            flex-basis: 33%;
        }
    }
</style>

<script lang="ts">
	import { pb, user } from '$lib/pocketbase';
	import type { CommentsPublicResponse, RecordIdString, UsersPublicResponse } from '$lib/pocketbase-types';
    import type { PageData } from './$types';
	import Modal from '$lib/components/Modal.svelte';
	import { calc_time_diff, get_data_entries } from '$lib/helpers';
	import { writable } from 'svelte/store';
    import MicroModal from "micromodal"
	import Loading from '$lib/components/Loading.svelte';
    
    export let data: PageData;
    const { post } = data

    let comments = writable(get_comments(post.id))
    async function get_comments(post: RecordIdString) {
        return pb.collection("comments_public").getList<
            CommentsPublicResponse<{author: UsersPublicResponse}>
        >(1, 20, {
            sort: "+created",
            expand: "author",
            filter: `post = "${post}"`
        })
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
    <div class="title_bar">
        <h3>{post.title}</h3>
        <div class="meta">
            <span>By {post.expand?.author.username}</span>
            <span>In {post.expand?.forum.name}</span>
            <span>{calc_time_diff(post.updated)}</span>
        </div>
    </div>
    <p>{post.body}</p>
</article>

<section class="comments">
    <h2>Comments {#await $comments}<Loading />{/await}</h2>
    {#await $comments then comments}
        {#each comments.items as comment}
            <div class="comment">
                <span>{comment.comment}</span>
            </div>
        {/each}
    {/await}
</section>
