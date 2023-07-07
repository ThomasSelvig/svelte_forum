<script lang="ts">
	import { writable } from 'svelte/store';
    import type { PageData } from './$types';
	import type { ListResult } from 'pocketbase';
	import type { CommentsPublicResponse, ForumsResponse, PostsPublicResponse, UsersPublicResponse } from '$lib/pocketbase-types';
	import { pb } from '$lib/pocketbase';
	import Comment from '$lib/components/Comment.svelte';
    
    export let data: PageData;

    let comments = writable<Promise<ListResult<
        CommentsPublicResponse<{
            post: PostsPublicResponse<unknown, {
                forum: ForumsResponse
            }>,
            author: UsersPublicResponse
        }>
    >>>()

    async function load_comments(page: number) {
        $comments = pb.collection("comments_public").getList(page, 20, {
            filter: `author="${data.req_user_id}"`,
            sort: "-created",
            expand: "post,post.forum,author"
        })
    }
    load_comments(1)
</script>

<h2>Comments</h2>
{#await $comments then comments}
    {#each comments.items as comment}
        {#if comment.expand && comment.expand.post.expand}
            <Comment view_user={comment.expand.author} view_comment={comment} />
        {/if}
    {/each}
{/await}
