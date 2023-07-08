<style lang="scss">
    .comments {
        margin: 2rem 0 0 0;
    }
</style>

<script lang="ts">
	import { pb, user } from '$lib/pocketbase';
	import type { CommentsPublicResponse, RecordIdString, UsersPublicResponse } from '$lib/pocketbase-types';
    import type { PageData } from './$types';
	import Modal from '$lib/components/Modal.svelte';
	import { calc_time_diff, get_data_entries } from '$lib/helpers';
	import { writable } from 'svelte/store';
	import Loading from '$lib/components/Loading.svelte';
	import EditCommentModal from '$lib/components/EditCommentModal.svelte';
    import MdiEdit from "~icons/mdi/edit"
    import MdiDelete from "~icons/mdi/delete"
	import Comment from '$lib/components/Comment.svelte';
	import PaginatedList from '$lib/components/PaginatedList.svelte';
	import Post from '$lib/components/Post.svelte';
	import EditPostModal from '$lib/components/EditPostModal.svelte';
	import { invalidateAll } from '$app/navigation';
    
    export let data: PageData;
    const { post } = data

    let edit_comm: EditCommentModal
    let edit_post: EditPostModal
    let write_comment_modal: Modal

    let page = 1
    $: comments = writable(get_comments(post.id, page))
    async function get_comments(post: RecordIdString, page: number) {
        return pb.collection("comments_public").getList<
            CommentsPublicResponse<{author: UsersPublicResponse}>
        >(page, 20, {
            sort: "+created",
            expand: "author",
            filter: `post = "${post}"`
        })
    }

    let error: string
    async function submit_comment(e: SubmitEvent) {
        pb.collection("comments").create(get_data_entries(e))
            .then(r => {
                write_comment_modal.close()
                $comments = get_comments(post.id, page)
            })
            .catch(err => {
                error = err.toString()
            })
    }

    async function refresh_comments() {
        $comments = get_comments(post.id, page)
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

<EditPostModal {post} done_editing_cb={() => {invalidateAll()}} bind:this={edit_post} />

<EditCommentModal bind:this={edit_comm} done_editing_cb={refresh_comments} />

<div class="title_bar">
    <h1>Post</h1>
    {#if $user}
        <button on:click={() => {
            write_comment_modal.open()
        }}><h2>Write Comment</h2></button>
    {/if}
</div>

<Post {post}>
    <!-- children of Post are extra meta info -->
    <span>Created {calc_time_diff(post.created)}</span>
    <!-- edit controls -->
    {#if post.author == $user?.id}
    <span>
        <button class="text" on:click={edit_post.start_edit_post}> <MdiEdit /> </button>
        <button class="text"> <MdiDelete /> </button>
    </span>
    {/if}
</Post>

<section class="comments">
    <h2>Comments {#await $comments}<Loading />{/await}</h2>
    {#await $comments then comments}
        {#each comments.items as comment}
            {#if comment.expand}
            <Comment view_user={comment.expand.author} view_comment={comment} {edit_comm} /> 
            {/if}
        {/each}
        <PaginatedList list={comments} bind:page={page} />
    {/await}
</section>
