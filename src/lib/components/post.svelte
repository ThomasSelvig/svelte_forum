<style lang="scss">
    .post {
        padding: .5rem 0;
        display: flex;
        justify-content: space-between;

        & > span {
            flex-basis: 100%;

            .rating {
                display: inline-block;
                padding: 0 .33rem;
            }

            .ratings {
                background-color: $alt_background;
                padding: .5rem;
                vertical-align: middle;
            }
        }
    }
</style>

<script lang="ts">
    import type { ExpandRecord } from "$lib/pocketbase"
    import MdiThumbsUpDown from '~icons/mdi/thumbs-up-down'
    import MdiEye from '~icons/mdi/eye'
    import MdiComment from '~icons/mdi/comment'

    export let post: ExpandRecord
    export let show_forum = false;

    const calculateTimeDifference = (date: string) => {
        const diffInMinutes = Math.floor((Date.now() - (new Date(date)).getTime()) / 1000 / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

        if (diffInDays > 0) {
            return rtf.format(-diffInDays, 'day');
        } else if (diffInHours > 0) {
            return rtf.format(-diffInHours, 'hour');
        } else {
            return rtf.format(-diffInMinutes, 'minute');
        }
    }

</script>

<article class="post">
    <span><a href={`/forums/${post.forum}/${post.id}`}>{post.title}</a></span>
    <span>
        <span class="ratings">
            <span class="rating">
                7
                <MdiThumbsUpDown class="icon" />
            </span>
            <!-- <span class="rating">
                60
                <MdiEye />
            </span> -->
            <span class="rating">
                15
                <MdiComment class="icon" />
            </span>
        </span>
    </span>
    <span>
        {post.expand?.author.username}
        {#if show_forum}in <a href={`/forums/${post.expand?.forum.id}`}>{post.expand?.forum.name}</a> {/if}
    </span>
    <span>Updated {calculateTimeDifference(post.updated)}</span>
</article>