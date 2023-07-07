<style lang="scss">
    .user {
        display: flex;
        align-items: center;

        .title_bar {
            margin: 0 0 0 1rem;
        }
    }
</style>

<script lang="ts">
	import type { UsersPublicResponse } from "$lib/pocketbase-types";
    import Avatar from "./Avatar.svelte";

    export let view_user: UsersPublicResponse
</script>

<div class="user">
    <Avatar {view_user} size="5rem" />
    <div class="title_bar">
        <h3><a href={`/user/${view_user.id}`}>{view_user.username}</a></h3>
        <!-- TODO put user actions here -->
    </div>
</div>
