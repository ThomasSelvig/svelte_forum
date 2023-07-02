<style lang="scss">
    .post {
        padding: .5rem 0;
        display: flex;
        justify-content: space-between;

        & > span {
            // flex-basis: 100%;  // set to give all equal columns
            flex-basis: 20%;
            &:nth-child(1) {
                flex-basis: 40%;
            }

            .rating {
                display: inline-block;
                padding: 0 .33rem;
            }

            .ratings {
                background-color: $main_background;
                padding: .5rem;
                vertical-align: middle;
            }
        }
    }
</style>

<script lang="ts">
    import MdiThumbsUpDown from '~icons/mdi/thumbs-up-down'
    import MdiEye from '~icons/mdi/eye'
    import MdiComment from '~icons/mdi/comment'
	import type { ForumsResponse, PostsPublicResponse, UsersPublicResponse } from "$lib/pocketbase-types";
	import { calc_time_diff } from '$lib/helpers';

    export let post: PostsPublicResponse<
        unknown,
        {author: UsersPublicResponse, forum: ForumsResponse} |
        {author: UsersPublicResponse}
    >

</script>

<article class="post">
    <span><a data-sveltekit-preload-data="hover" href={`/forums/${post.forum}/${post.id}`}>{post.title}</a></span>
    <span>
        <span class="ratings">
            <span class="rating">
                {post.score}
                <MdiThumbsUpDown class="icon" />
            </span>
            <!-- <span class="rating">
                60
                <MdiEye />
            </span> -->
            <span class="rating">
                {post.comments_count}
                <MdiComment class="icon" />
            </span>
        </span>
    </span>
    <span>
        {post.expand?.author.username}
        {#if post.expand && "forum" in post.expand}
            in <a data-sveltekit-preload-data="hover" href={`/forums/${post.expand?.forum.id}`}>{post.expand?.forum.name}</a>
        {/if}
    </span>
    <span>Updated {calc_time_diff(post.updated)}</span>
</article>