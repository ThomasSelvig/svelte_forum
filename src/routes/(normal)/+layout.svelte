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

    .overlays {
        position: absolute;
        z-index: -1;
        opacity: 0;
        top: 0;
        left: 0;
        width: 95vw;
        height: 95vh;
    }
</style>

<script lang="ts">
    import { pb, user } from "$lib/pocketbase"

    import MdiHome from '~icons/mdi/home'
    import MdiBell from '~icons/mdi/bell'
    import MdiMessage from '~icons/mdi/message'
    import MdiAccountBox from "~icons/mdi/account-box"
    import MdiPerson from "~icons/mdi/person"
    import MdiLogout from '~icons/mdi/logout'
	import ContextDropdownModal from "$lib/components/ContextDropdownModal.svelte";


    let notifs: ContextDropdownModal
    let notifs_button: HTMLElement

    let account: ContextDropdownModal
    let account_button: HTMLElement
</script>

<div class="overlays">
    <ContextDropdownModal bind:this={notifs} relative_to={notifs_button}>
        <li>notif 1</li>
        <li>notif 2</li>
        <li>notif 3</li>
        <li>notif 4</li>
    </ContextDropdownModal>
    <ContextDropdownModal bind:this={account} relative_to={account_button}>
        <li>
            <a data-sveltekit-reload href={`/user/${$user?.id}`} on:click={() => {
                account.get_dialog().close()
            }}>
                <span class="icon"><MdiPerson /></span>
                Profile
            </a>
        </li>
        <li>
            <button class="text" on:click={() => {
                pb.authStore.clear()
                account.get_dialog().close()
            }}>
                <span class="icon"><MdiLogout /></span>
                Logout
            </button>
        </li>
    </ContextDropdownModal>
</div>


<header>
    <nav>
        <ul class="site_nav">
            <li><a data-sveltekit-preload-data="hover" href="/" class="icon"><MdiHome /></a></li>
            <li><a data-sveltekit-preload-data="hover" href="/forums">FORUMS</a></li>
            <li><a data-sveltekit-preload-data="hover" href="/forums/ognd6a5vqg5vno5">GENERAL</a></li>
        </ul>
        <ul class="account_nav">
            {#if $user}
                <li><button bind:this={notifs_button} class="icon text" on:click={() => {
                    notifs.get_dialog().showModal()
                }}><MdiBell /></button></li>
                <li><button class="icon text"><MdiMessage  /></button></li>
                <li><button bind:this={account_button} class="icon text" on:click={() => {
                    account.get_dialog().showModal()
                }}><MdiAccountBox /></button></li>
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
