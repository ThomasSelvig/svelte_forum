<style lang="scss">
    .avatar {
        display: flex;
        align-items: center;
        margin: 1rem;

        & > img {
            border-radius: 10px;
        }
    }

</style>

<script lang="ts">
	import { pb } from "$lib/pocketbase";
	import type { UsersPublicResponse } from "$lib/pocketbase-types";
	import type { Record } from "pocketbase";
    import MdiAccountCircle from "~icons/mdi/account-circle"

    export let size: string = "10rem"
    export let view_user: UsersPublicResponse

    let avatar_url = pb.files.getUrl(view_user as unknown as Record, view_user.avatar)
</script>

<div class="avatar icon" style="width: {size}; height: {size};">
    {#if view_user.avatar}
        <img src={avatar_url} style="width: 100%;" alt="">
    {:else}
        <MdiAccountCircle width={size} height={size} /> 
    {/if}
</div>
