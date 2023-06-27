
<script lang="ts">
	import { goto } from "$app/navigation";
    import { pb, user } from "$lib/pocketbase"

    if (!$user) {
        goto("/login")
    }
</script>

<header>
    <p>logged in as: {$user?.email}</p>
    <nav>
        <ul>
            <li><a href="/">index</a></li>
            <li><a href="/login">/login</a></li>
            <li><a href="/register">/register</a></li>
            <li><a href="/profile">/profile</a></li>
            {#if $user}
                <button style="border: none;" on:click={() => {pb.authStore.clear()}}>Logout</button>
            {/if}
        </ul>
    </nav>
</header>

<slot />
