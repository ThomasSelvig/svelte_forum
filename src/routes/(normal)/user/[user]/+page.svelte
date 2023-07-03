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
                margin: 0;
                max-width: 25rem;
            }
        }
    }

    .user_posts {
        margin: 5rem 0;
    }
</style>

<script lang="ts">
    import { pb, user } from "$lib/pocketbase";
	import { writable } from "svelte/store";
	import type { PageData } from "./$types";
	import type { UsersPublicResponse } from "$lib/pocketbase-types";
	import UserOverview from "$lib/components/UserOverview.svelte";
    import MdiDotsHorizontal from "~icons/mdi/dots-horizontal"
    import MdiBellRing from "~icons/mdi/bell-ring"
    import MdiBellOff from "~icons/mdi/bell-off"

    export let data: PageData

    let user_data = writable(pb.collection("users_public").getOne<UsersPublicResponse>(data.req_user_id))
</script>

{#await $user_data then u}

<section class="about">
    <div class="about_overview">
        <UserOverview user={u}/>
    </div>

    <div class="about_detailed">

        <div class="title_bar_wrapper">

            <div class="title_bar">
                <h1>Username</h1>
                <div class="controls">
                    <button class="icon text"><h2><MdiBellRing /></h2></button>
                    <button class="icon text"><h2><MdiDotsHorizontal /></h2></button>
                    <button><h2>Follow</h2></button>
                </div>
            </div>
            <div class="stats">
                <span>
                    <a href={`/user/${u.id}/followers`}>14 Followers</a>
                    <pre>    </pre>
                    <a href={`/user/${u.id}/following`}>27 Following</a>
                </span>
            </div>

        </div>

        <p class="bio">{u.bio}</p>

    </div>

</section>

<section class="user_posts">
    <h2>Latest Posts</h2>
</section>
    
{/await}
