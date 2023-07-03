<style>
    p {
        white-space: pre-wrap;
    }
</style>

<script lang="ts">
    import { pb, user } from "$lib/pocketbase";
	import { writable } from "svelte/store";
	import type { PageData } from "./$types";

    export let data: PageData

    let user_data
    async function main() {
        user_data = writable(await pb.collection("users_public").getOne(data.req_user_id))
    }
    main()
</script>

<p>user: {JSON.stringify($user_data, null, 4) }</p>
