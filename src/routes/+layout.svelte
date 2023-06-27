
<style>
    :root {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
</style>

<script lang="ts">
    import { pb, user } from "../lib/pocketbase"
</script>

<header>
    <p>logged in as: {$user?.username}</p>
    <nav>
        <ul>
            <li><a href="/">index</a></li>
            <li><a href="/login">/login</a></li>
            <li><a href="/profile">/profile</a></li>
        </ul>
    </nav>
</header>

<main>
    <slot />
</main>
