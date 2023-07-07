<style lang="scss">
    p {
        white-space: pre-wrap;
    }

    .about {
        display: flex;

        &_overview {
            flex-basis: 25%;
        }

        &_detailed {
            flex-basis: 75%;
            padding: 1rem;

            .title_bar_wrapper {
                height: 10rem;

                display: flex;
                justify-content: center;
                flex-direction: column;
            }

            .title_bar {
                margin: 1rem 0 0;
            }

            .controls {
                .icon h2 {
                    margin: 0;
                }
                button {
                    padding: 0 .5rem;
                    &:last-child {
                        padding: 0 2rem;
                        margin-left: .5rem;
                    }
                }
            }

            .stats pre {
                margin: 0;
                display: inline;
            }

            .bio {
                max-width: 25rem;
            }
        }
    }

    .user_content {
        margin: 5rem 0;
    }
</style>

<script lang="ts">
    import { pb, user } from "$lib/pocketbase";
	import { writable } from "svelte/store";
	import type { LayoutData } from "./$types";
	import type { FollowingPublicResponse, FollowingResponse, UsersPublicResponse } from "$lib/pocketbase-types";
	import UserOverview from "$lib/components/UserOverview.svelte";
    import MdiDotsHorizontal from "~icons/mdi/dots-horizontal"
    import MdiBellRing from "~icons/mdi/bell-ring"
    import MdiBellOff from "~icons/mdi/bell-off"

    // anything relying on an url [slug] must be a reactive statement (not a store)
    export let data: LayoutData
    $: req_user_id = data.req_user_id

    $: user_data = writable(
        pb.collection("users_public").getOne<UsersPublicResponse>(req_user_id)
    )
    $: following = writable(
        pb.collection("following_public").getList<FollowingPublicResponse>(1, 1, {
            filter: `user = "${req_user_id}"`,
            fields: "id",
            $autoCancel: false
        })
    )
    $: followers = writable(
        pb.collection("following_public").getList<FollowingPublicResponse>(1, 1, {
            filter: `following = "${req_user_id}"`,
            fields: "id",
            $autoCancel: false
        })
    )
    
    // is $user following req_user_id
    let follow_obj = writable<FollowingResponse | null>(null)

    async function sync_follow_status() {
        $follow_obj = await pb.collection("following").getFirstListItem<FollowingResponse>(
            `user="${$user?.id}" && following="${req_user_id}"`
        )
            .then(r => r)
            .catch(err => null)
    }
    sync_follow_status()

    async function follow_user(set_follor_status: boolean) {
        if (set_follor_status) {
            // add following entry
            $follow_obj = await pb.collection("following").create<FollowingResponse>({
                user: $user?.id,
                following: req_user_id,
                notifications: true
            })
        }
        else {
            // clear following entry
            if (await pb.collection("following").delete((await $follow_obj)!.id)) {
                $follow_obj = null
            }
        }
    }

    async function toggle_notifs() {
        $follow_obj = await pb.collection("following").update($follow_obj!.id, {
            notifications: !$follow_obj?.notifications
        })
    }
</script>

{#await $user_data then u}

<section class="about">
    <div class="about_overview">
        <UserOverview view_user={u}/>
    </div>

    <div class="about_detailed">

        <div class="title_bar_wrapper">

            <div class="title_bar">
                <h1>{u.username}</h1>
                <div class="controls">

                    {#if $follow_obj}
                    <button class="icon text" on:click={toggle_notifs}>
                        <h2>
                            {#if $follow_obj.notifications}
                            <MdiBellRing />
                            {:else}
                            <MdiBellOff />
                            {/if}
                        </h2>
                    </button>
                    {/if}

                    <button class="icon text"><h2><MdiDotsHorizontal /></h2></button>

                    {#if $follow_obj}
                    <button on:click={() => {follow_user(false)}}>
                        <h2>Unfollow</h2>
                    </button>
                    {:else}
                    <button on:click={() => {follow_user(true)}} disabled={u.id == $user?.id}>
                        <h2>Follow</h2>
                    </button>
                    {/if}

                </div>
            </div>
            <div class="stats">
                <span>
                    <a href={`/user/${u.id}/followers`}>
                        {#await $followers then followers} {followers.totalItems} {/await}
                        Followers
                    </a>
                    <pre>    </pre>
                    <a href={`/user/${u.id}/following`}>
                        {#await $following then following} {following.totalItems} {/await}
                        Following
                    </a>
                </span>
            </div>

        </div>

        <p class="bio">{u.bio}</p>

    </div>

</section>

<section class="user_content">
    <slot />
</section>

{/await}
