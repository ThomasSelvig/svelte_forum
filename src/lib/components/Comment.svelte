<style lang="scss">
    .comment {
        display: flex;
        // background-color: $main_background;
        margin: 1rem 0;

        .username {
            margin-bottom: .33rem;
        }
        
        &_body {
            margin: 0 0 0 1rem;
            & p {
                margin: 0;
            }
        }
    }
</style>

<script lang="ts">
	import type { CommentsPublicResponse, ForumsResponse, UsersPublicResponse } from "$lib/pocketbase-types";
    import Avatar from "./Avatar.svelte";

    export let view_user: UsersPublicResponse
    export let view_comment: CommentsPublicResponse<any>
</script>

<div class="comment">
    <Avatar {view_user} size="5rem" />
    <div class="comment_body">

        <div class="username">
            <h3>
                <a href={`/user/${view_user.id}`}>{view_user.username}</a>
                {#if view_comment.expand?.post.expand.forum}
                in
                <a href={`/forums/${view_comment.expand.post.expand.forum.id}`}>
                    {view_comment.expand.post.expand.forum.name}
                </a>
                {/if}
            </h3>
            <!-- TODO put user actions here -->
        </div>
        <p>{view_comment.comment}</p>

    </div>
</div>
