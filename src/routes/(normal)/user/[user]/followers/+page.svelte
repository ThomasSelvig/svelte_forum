<script lang="ts">
	import { writable } from 'svelte/store';
	import type { FollowingPublicResponse, UsersPublicResponse } from '$lib/pocketbase-types';
	import { pb } from '$lib/pocketbase';
	import type { ListResult } from 'pocketbase';
	import Loading from '$lib/components/Loading.svelte';
	import User from '$lib/components/User.svelte';
	import type { PageData } from './$types';
	import PaginatedList from '$lib/components/PaginatedList.svelte';

    export let data: PageData
    
    let page = 1
    let followers = writable<Promise<ListResult<
        FollowingPublicResponse<{user: UsersPublicResponse}>
    >>>()

    function load_followers(page: number) {
        $followers = pb.collection("following_public").getList(page, 20, {
            filter: `following="${data.req_user_id}"`,
            sort: "-created",
            expand: "user"
        })
    }
    $: load_followers(page)
</script>

<h2>Followers {#await $followers}<Loading />{/await}</h2>
{#await $followers then followers}
    {#each followers.items as follower}
        {#if follower.expand}
        <User view_user={follower.expand.user} />
        {/if}
    {/each}
    <PaginatedList list={followers} bind:page={page} />
{/await}
