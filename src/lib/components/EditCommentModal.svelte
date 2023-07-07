<script lang="ts">
	import type { CommentsResponse } from "$lib/pocketbase-types";
	import { writable } from "svelte/store";
	import Modal from "./Modal.svelte";
	import { pb } from "$lib/pocketbase";
	import { get_data_entries } from "$lib/helpers";

    let edit_comment_modal: Modal
    let editing_comment = writable<CommentsResponse>()
    let done_editing_cb: CallableFunction

    // uses the set `$comment`
    let error: string
    async function edit_comment(e: SubmitEvent) {
        const data = get_data_entries(e)
        pb.collection("comments").update(data.id.toString(), {
            comment: data.comment.toString()
        })
            .then(r => {
                edit_comment_modal.get_dialog().close()
                done_editing_cb()
                // $comments = get_comments(post.id)
            })
            .catch(err => {
                error = err.toString()
            })
    }

    export function start_edit_comment(comment: CommentsResponse, cb: CallableFunction) {
        done_editing_cb = cb
        $editing_comment = comment
        edit_comment_modal.get_dialog().show()
    }


</script>


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
