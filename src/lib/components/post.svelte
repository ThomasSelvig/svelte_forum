

<script lang="ts">
    // import MdiThumbsUpDown from '~icons/mdi/thumbs-up-down'
    // import MdiEye from '~icons/mdi/eye'
    import MdiComment from '~icons/mdi/comment'
    import MdiPlus from '~icons/mdi/plus'
    import MdiMinus from '~icons/mdi/minus'
    import MdiSubdirectoryArrowRight  from "~icons/mdi/subdirectory-arrow-right"
	import type { ForumsResponse, PostsPublicResponse, UsersPublicResponse } from "$lib/pocketbase-types";
	import { calc_time_diff } from '$lib/helpers';
	import Avatar from './Avatar.svelte';

    export let post: PostsPublicResponse<
        unknown,
        {author: UsersPublicResponse, forum: ForumsResponse} |
        {author: UsersPublicResponse}
    >

</script>

<div class="container">
    <!-- top bar -->
    <div class="meta">
        <!-- forum -->
        {#if post.expand && "forum" in post.expand}
        <div class="forum">
            <span class="icon"><MdiSubdirectoryArrowRight /></span>
            <a data-sveltekit-preload-data="hover" href={`/forums/${post.expand.forum.id}`}>
                {post.expand.forum.name}
            </a>
        </div>
        {/if}

        <!-- author -->
        {#if post.expand && "author" in post.expand}
        <div class="author">
            <a href={`/user/${post.expand.author.id}`}>
                <Avatar margin="0 .5rem 0 0" size="1.8rem" view_user={post.expand.author}/>
                {post.expand.author.username}
            </a>
        </div>
        {/if}

        <!-- comments -->
        <div class="comments">
            {post.comments_count}
            <MdiComment class="icon" />
        </div>

        <!-- time since last update -->
        <span>{calc_time_diff(post.updated)}</span>

        <!-- any child elements are extra meta to show -->
        <slot />
    </div>

    <div class="post">
        <!-- left bar -->
        <div class="controls">
            <button class="icon text"><MdiPlus /></button>
            <pre>{post.score}</pre>
            <button class="icon text"><MdiMinus /></button>
        </div>

        <!-- post content -->
        <div class="content">
            <a href={`/forums/${post.forum}/${post.id}`}>
                <h2>{post.title}</h2>
            </a>
        </div>
    </div>
</div>

<style lang="scss">
    .meta {
        display: flex;
        align-items: center;
        gap: 2rem;
        margin-left: 10%;

        .author > a {
            display: flex;
            align-items: center;
        }
    }

    .post {
        display: grid;
        align-items: center;
        grid-template-columns: 1fr 9fr;
    }

    .controls {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .content {
        & h2 {
            margin: 0;
        }

        & a {
            color: $text;
            &:hover {
                color: $link_hover;
            }
        }
    }

    .container {
        margin: 1rem 0;
        padding: 1rem;
        box-shadow: 0px 0px 20px -5px transparentize($color: $alt_background, $amount: .25);
    }
</style>