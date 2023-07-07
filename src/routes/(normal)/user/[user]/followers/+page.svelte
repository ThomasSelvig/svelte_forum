<script lang="ts">
	import { writable } from 'svelte/store';
	import type { FollowingPublicResponse, UsersPublicResponse } from '$lib/pocketbase-types';
	import { pb } from '$lib/pocketbase';
	import type { ListResult } from 'pocketbase';
	import Loading from '$lib/components/Loading.svelte';
	import User from '$lib/components/User.svelte';
	import type { PageData } from './$types';

    export let data: PageData
    
    let followers = writable<Promise<ListResult<
        FollowingPublicResponse<{user: UsersPublicResponse}>
    >>>()

    async function load_followers(page: number) {
        $followers = pb.collection("following_public").getList(page, 20, {
            filter: `following="${data.req_user_id}"`,
            sort: "-created",
            expand: "user"
        })
    }
    load_followers(1)
</script>

<h2>Followers {#await $followers}<Loading />{/await}</h2>
{#await $followers then followers}
    {#each followers.items as follower}
        {#if follower.expand}
        <User view_user={follower.expand.user} />
        {/if}
    {/each}
{/await}
