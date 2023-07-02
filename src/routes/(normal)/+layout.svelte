<style lang="scss">
    header, footer > .content, main {
        width: 100%;
        margin: 1rem auto;

        @include breakpoint(small) { max-width: map-get($map: $breakpoints, $key: small); }
        @include breakpoint(medium) { max-width: map-get($map: $breakpoints, $key: medium); }
        @include breakpoint(large) { max-width: map-get($map: $breakpoints, $key: large); }
        // @include breakpoint(x-large) { max-width: map-get($map: $breakpoints, $key: x-large); }
    }
    nav {
        display: flex;
        justify-content: space-around;

        ul {
            list-style: none;
            padding: 0;
            margin: 0;

            // width: 50%;
            display: flex;
            align-items: center;

            &:nth-child(2) {
                justify-content: right;
            }

            li {
                display: inline-block;
                margin: 1rem;
            }
        }
    }

    main {
        padding: 1rem 2rem;
    }

    footer {
        margin-top: auto;
        padding: 1rem 2rem;
        background-color: $alt-background;

        .content {
            text-align: center;
        }
    }
</style>

<script lang="ts">
    import { pb, user } from "$lib/pocketbase"

    import MdiHome from '~icons/mdi/home'
    import MdiBell from '~icons/mdi/bell'
    import MdiMessage from '~icons/mdi/message'
    import MdiAccountBox from "~icons/mdi/account-box"
    import MdiLogout from '~icons/mdi/logout'

</script>

<header>
    <nav>
        <ul class="site_nav">
            <li><a data-sveltekit-preload-data="hover" href="/" class="icon"><MdiHome /></a></li>
            <li><a data-sveltekit-preload-data="hover" href="/forums">FORUMS</a></li>
            <li><a data-sveltekit-preload-data="hover" href="/forums/ognd6a5vqg5vno5">GENERAL</a></li>
        </ul>
        <ul class="account_nav">
            {#if $user}
                <li><button class="icon text"><MdiBell /></button></li>
                <li><button class="icon text"><MdiMessage  /></button></li>
                <li><button class="icon text"><MdiAccountBox /></button></li>
                <li><button class="icon text" on:click={() => {pb.authStore.clear()}}><MdiLogout /></button></li>
            {:else}
                <li><a data-sveltekit-preload-data="hover" href="/login">LOGIN</a></li>
                <li><a data-sveltekit-preload-data="hover" href="/register">REGISTER</a></li>
            {/if}
        </ul>
    </nav>
</header>

<main>
    <slot />
</main>

<footer>
    <div class="content">
        <h3><a href="https://github.com/ThomasSelvig">Follow my GitHub</a></h3>
    </div>
</footer>
