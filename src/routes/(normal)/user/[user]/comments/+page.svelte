<script lang="ts">
	import { writable } from 'svelte/store';
    import type { PageData } from './$types';
	import type { ListResult } from 'pocketbase';
	import type { CommentsPublicResponse, ForumsResponse, PostsPublicResponse, UsersPublicResponse } from '$lib/pocketbase-types';
	import { pb } from '$lib/pocketbase';
	import Comment from '$lib/components/Comment.svelte';
	import EditCommentModal from '$lib/components/EditCommentModal.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import PaginatedList from '$lib/components/PaginatedList.svelte';
    
    export let data: PageData;
    let edit_comm: EditCommentModal

    let page = 1
    let comments = writable<Promise<ListResult<
        CommentsPublicResponse<{
            post: PostsPublicResponse<number, {
                forum: ForumsResponse
            }>,
            author: UsersPublicResponse
        }>
    >>>()

    function load_comments(page: number) {
        $comments = pb.collection("comments_public").getList(page, 20, {
            filter: `author="${data.req_user_id}"`,
            sort: "-created",
            expand: "post,post.forum,author"
        })
    }

    $: load_comments(page)
</script>

<EditCommentModal bind:this={edit_comm} done_editing_cb={() => {load_comments(page)}} />

<h2>Comments {#await $comments}<Loading />{/await}</h2>
{#await $comments then comments}
    {#each comments.items as comment}
        {#if comment.expand && comment.expand.post.expand}
            <Comment view_user={comment.expand.author} view_comment={comment} {edit_comm} />
        {/if}
    {/each}
    <PaginatedList list={comments} bind:page={page} />
{/await}
