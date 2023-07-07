<style lang="scss">
    .comment {
        display: flex;

        margin: 1rem 0;

        .avatar {
            flex-basis: 10%;
        }
        
        &_body {
            margin: 0 0 0 1rem;
            flex-basis: 100%;

            & p {
                margin: 0;
            }

            .username {
                margin-bottom: .33rem;
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>

<script lang="ts">
	import { user } from "$lib/pocketbase";
	import type { CommentsPublicResponse, ForumsResponse, UsersPublicResponse } from "$lib/pocketbase-types";
    import Avatar from "./Avatar.svelte";
	import type EditCommentModal from "./EditCommentModal.svelte";
    import MdiEdit from "~icons/mdi/edit"
    import MdiDelete from "~icons/mdi/delete"

    export let view_user: UsersPublicResponse
    export let view_comment: CommentsPublicResponse<any>
    export let edit_comm: EditCommentModal

</script>

<div class="comment">
    <div class="avatar"><Avatar {view_user} size="5rem" /></div>
    <div class="comment_body">

        <div class="username">
            <h3>
                <a href={`/user/${view_user.id}`}>{view_user.username}</a>
                {#if "post" in view_comment.expand}
                on
                <a href={`/forums/${view_comment.expand.post.forum}/${view_comment.expand.post.id}`}>
                    {view_comment.expand.post.title}
                </a>

                    {#if view_comment.expand?.post.expand?.forum}
                    in
                    <a href={`/forums/${view_comment.expand.post.expand.forum.id}`}>
                        {view_comment.expand.post.expand.forum.name}
                    </a>
                    {/if}

                {/if}
            </h3>

            {#if $user?.id == view_comment.author}
            <h3>
                <button class="text icon" on:click={() => {
                    edit_comm.start_edit_comment(view_comment)
                }}>
                    <MdiEdit />
                </button>

                <button class="text icon" on:click={() => {
                    edit_comm.delete_comment(view_comment)
                }}><MdiDelete /></button>
            </h3>
            {/if}

        </div>
        <p>{view_comment.comment}</p>

    </div>
</div>
