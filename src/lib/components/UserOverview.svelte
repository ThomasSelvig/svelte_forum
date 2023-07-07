<style lang="scss">
    .card {
        // background-color: $main_background;
        width: 12rem;
    }

    .stats {
        margin: 0rem 2rem 0rem;
        // padding-top: 1rem;
        display: flex;
        justify-content: center;
        & > * {
            margin: 0 .5rem .5rem;
        }
    }

    .account_age, .score {
        color: $darker_text;
        text-align: center;
        margin: .5rem;
    }
</style>

<script lang="ts">
    import MdiMessageDraw from '~icons/mdi/message-draw'
    import MdiComment from '~icons/mdi/comment'
	import type { CommentsPublicResponse, PostsPublicResponse, UsersPublicResponse } from "$lib/pocketbase-types";
	import { writable } from "svelte/store";
	import { pb } from "$lib/pocketbase";
	import Avatar from "./Avatar.svelte";

    export let view_user: UsersPublicResponse

    // use getlist with items=1 just to get the totalItems count
    let comments = writable(
        pb.collection("comments_public").getList<CommentsPublicResponse>(1, 1, {
            filter: `author = "${view_user.id}"`,
            fields: "id",
            $autoCancel: false
        })
    )
    let posts = writable(
        pb.collection("posts_public").getList<PostsPublicResponse>(1, 1, {
            filter: `author = "${view_user.id}"`,
            fields: "id",
            // this component should not autocancel other "GET posts_public" on same page
            $autoCancel: false
        })
    )
</script>


<div class="card">

    <Avatar {view_user} />

    <div class="stats">
        <!-- <span>
            7
            <span class="icon"><MdiThumbsUpDown /></span>
        </span> -->
        <a href={`/user/${view_user.id}/posts`}>
            {#await $posts then posts}{posts.totalItems}{/await}
            <span class="icon"><MdiMessageDraw /></span>
        </a>
        <a href={`/user/${view_user.id}/comments`}>
            {#await $comments then comments}{comments.totalItems}{/await}
            <span class="icon"><MdiComment /></span>
        </a>
    </div>
    
    <p class="account_age">Joined {new Date(view_user.created).toLocaleDateString("us")}</p>
    <p class="score">
        {view_user.score}
        Social Credit
    </p>

</div>