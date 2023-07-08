<script lang="ts">
	import type { CommentsResponse, PostsPublicResponse } from "$lib/pocketbase-types";
	import Modal from "./Modal.svelte";
	import { pb } from "$lib/pocketbase";
	import { get_data_entries } from "$lib/helpers";

    let edit_post_modal: Modal
    export let post: PostsPublicResponse
    export let done_editing_cb: CallableFunction

    let error: string
    async function edit_post(e: SubmitEvent) {
        const data = get_data_entries(e)
        pb.collection("posts").update(post.id, {
            title: data.title.toString(),
            body: data.body.toString()
        })
            .then(r => {
                edit_post_modal.close()
                done_editing_cb()
            })
            .catch(err => {
                error = err.toString()
            })
    }

    export function start_edit_post() {
        edit_post_modal.open()
    }

    export function delete_post() {
        pb.collection("posts").delete(post.id)
            .then(r => {done_editing_cb()})
    }


</script>


<Modal title="Edit Post" bind:this={edit_post_modal} clear_on_close={false}>
    <form method="post" on:submit|preventDefault={edit_post}>
        <label>
            Title *
            <input type="text" name="title" value={post.title} required>
        </label>
        <label>
            Body
            <textarea name="body" rows="5">{post.body}</textarea>
        </label>
        <input type="hidden" name="forum" value={post.forum}>
        <input type="hidden" name="author" value={post.author}>
        <button>Submit</button>
        {#if error}<p class="error">{error}</p>{/if}
    </form>
</Modal>
