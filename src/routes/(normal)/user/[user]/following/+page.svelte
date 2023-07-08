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
    let following = writable<Promise<ListResult<
        FollowingPublicResponse<{following: UsersPublicResponse}>
    >>>()

    function load_following(page: number) {
        $following = pb.collection("following_public").getList(page, 20, {
            filter: `user="${data.req_user_id}"`,
            sort: "-created",
            expand: "following"
        })
    }
    $: load_following(page)
</script>

<h2>Following {#await $following}<Loading />{/await}</h2>
{#await $following then following}
    {#each following.items as follow}
        {#if follow.expand}
        <User view_user={follow.expand.following} />
        {/if}
    {/each}
    <PaginatedList list={following} bind:page={page} />
{/await}
