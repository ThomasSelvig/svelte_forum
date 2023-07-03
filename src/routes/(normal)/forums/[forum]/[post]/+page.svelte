<style lang="scss">
    .post, .comment {
        padding: 1rem;
        background: $main_background;
    }
    .post > .title_bar {
        margin-bottom: 1rem;
    }
    .comment {
        margin: 1rem 0;
    }
    .comments {
        margin: 2rem 0 0 0;
    }
    .meta {
        flex-basis: 58%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        & * {
            flex-basis: 20%;
            text-align: center;
        }
    }
</style>

<script lang="ts">
	import { pb, user } from '$lib/pocketbase';
	import type { CommentsPublicResponse, CommentsResponse, RecordIdString, UsersPublicResponse } from '$lib/pocketbase-types';
    import type { PageData } from './$types';
	import Modal from '$lib/components/Modal.svelte';
	import { calc_time_diff, get_data_entries } from '$lib/helpers';
	import { writable } from 'svelte/store';
	import Loading from '$lib/components/Loading.svelte';
    import MdiEdit from "~icons/mdi/edit"
    import MdiDelete from "~icons/mdi/delete"
    
    export let data: PageData;
    const { post } = data

    let write_comment_modal: Modal
    let edit_comment_modal: Modal
    let editing_comment = writable<CommentsResponse>()

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
                write_comment_modal.get_dialog().close()
                $comments = get_comments(post.id)
            })
            .catch(err => {
                error = err.toString()
            })
    }

    async function edit_comment(e: SubmitEvent) {
        const data = get_data_entries(e)
        pb.collection("comments").update(data.id.toString(), {
            comment: data.comment.toString()
        })
            .then(r => {
                edit_comment_modal.get_dialog().close()
                $comments = get_comments(post.id)
            })
            .catch(err => {
                error = err.toString()
            })
    }
</script>


<Modal title="Write Comment" bind:this={write_comment_modal}>
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

<Modal title="Edit Comment" bind:this={edit_comment_modal}>
    <form method="post" on:submit|preventDefault={edit_comment}>
        <label>
            Comment *
            <textarea name="comment" rows="5">{$editing_comment?.comment}</textarea>
        </label>
        <input type="hidden" name="id" value={$editing_comment?.id}>
        <button>Submit</button>
        {#if error}<p class="error">{error}</p>{/if}
    </form>
</Modal>

<div class="title_bar">
    <h1>Post</h1>
    {#if $user}
        <button on:click={() => {
            write_comment_modal.get_dialog().showModal()
        }}><h2>Write Comment</h2></button>
    {/if}
</div>

<article class="post">
    <div class="title_bar">
        <h3>{post.title}</h3>
        <div class="meta">
            <span>By <a href={`/user/${post.expand?.author.id}`}>{post.expand?.author.username}</a></span>
            <span>In <a href=".">{post.expand?.forum.name}</a></span>
            <span>{calc_time_diff(post.updated)}</span>
            {#if post.author == $user?.id}
                <span>
                    <button class="text"> <MdiEdit /> </button>
                    <button class="text"> <MdiDelete /> </button>
                </span>
            {/if}
        </div>
    </div>
    {#if post.body}<p>{post.body}</p>{/if}
</article>

<section class="comments">
    <h2>Comments {#await $comments}<Loading />{/await}</h2>
    {#await $comments then comments}
        {#each comments.items as comment}
            <div class="comment">
                <span>{comment.comment}</span>
                {#if $user?.id == comment.author}
                    <span>
                        <button class="text icon" on:click={() => {
                            $editing_comment = comment
                            edit_comment_modal.get_dialog().showModal()
                        }}>
                            <MdiEdit />
                        </button>
    
                        <button class="text icon"><MdiDelete /></button>
                    </span>
                {/if}
            </div>
        {/each}
    {/await}
</section>
