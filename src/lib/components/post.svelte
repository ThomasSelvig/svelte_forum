<style lang="scss">
    .post {
        padding: .5rem 0;
        display: flex;
        justify-content: space-between;

        span {
            flex-basis: 100%;
        }
    }
</style>

<script lang="ts">
    import type { ExpandRecord } from "$lib/pocketbase"
	import type { Record } from "pocketbase";
	import { fade } from "svelte/transition";

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
    <span>{post.title}</span>
    <!-- <span>{JSON.stringify(post.expand)}</span> -->
    <span>
        By {post.expand?.author.username}
        {#if show_forum}in <a href={`/forums/${post.expand?.forum.id}`}>{post.expand?.forum.name}</a> {/if}
    </span>
    <span>Updated {calculateTimeDifference(post.updated)}</span>
</article>