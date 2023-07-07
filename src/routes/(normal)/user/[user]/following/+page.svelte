<script lang="ts">
	import { writable } from 'svelte/store';
	import type { FollowingPublicResponse, UsersPublicResponse } from '$lib/pocketbase-types';
	import { pb } from '$lib/pocketbase';
	import type { ListResult } from 'pocketbase';
	import Loading from '$lib/components/Loading.svelte';
	import User from '$lib/components/User.svelte';
	import type { PageData } from './$types';

    export let data: PageData
    
    let following = writable<Promise<ListResult<
        FollowingPublicResponse<{following: UsersPublicResponse}>
    >>>()

    async function load_following(page: number) {
        $following = pb.collection("following_public").getList(page, 20, {
            filter: `user="${data.req_user_id}"`,
            sort: "-created",
            expand: "following"
        })
    }
    load_following(1)
</script>

<h2>Following {#await $following}<Loading />{/await}</h2>
{#await $following then followers}
    {#each followers.items as follower}
        {#if follower.expand}
        <User view_user={follower.expand.following} />
        {/if}
    {/each}
{/await}
