<style lang="scss">
    .post, .comment {
        padding: 1rem;
        // margin: 1rem;
        background: $main_background;
    }
    .comment {
        margin: 1rem 0;
    }
    .comments {
        margin: 2rem 0 0 0;
    }
</style>

<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import type { CommentsResponse, RecordIdString } from '$lib/pocketbase-types';
	import type { ListResult } from 'pocketbase';
    import type { PageData } from './$types';
    
    export let data: PageData;
    const { post } = data

    async function get_comments(post: RecordIdString) {
        return pb.collection("comments").getList(1, 20, {
            sort: "+created",
            expand: "author",
            filter: `post = "${post}"`
        }) as Promise<ListResult<CommentsResponse>>
    }
</script>

<h1>Post</h1>
<article class="post">
    <h2>{post.title}</h2>
    <p>{post.body}</p>
</article>
<section class="comments">
    <h2>Comments</h2>
    {#await get_comments(post.id)}
        <h3>Loading...</h3>
    {:then comments} 
        {#each comments.items as comment}
            <div class="comment">
                <span>{comment.comment}</span>
            </div>
        {/each}
    {/await}
</section>
