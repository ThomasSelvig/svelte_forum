<style lang="scss">
    #write-post-modal {
        display: none;
        position: fixed;
        &.is-open {
            display: block;
        }
        width: 100%;

        & > div {
            background-color: $main_background;
            margin: 0 auto;
            padding: 2rem;
            width: 50%;
        }
    }

    .modal-heading {
        display: flex;
        justify-content: space-between;
        margin: 1rem 0;
        
        & h2 {
            margin: .25rem 0;
        }
        & button {
            padding: 0 .5rem;
        }
    }
</style>

<script lang="ts">
    import MicroModal from "micromodal"
	import { onMount } from "svelte";

    export let title: string

    onMount(() => {
        MicroModal.init()
        MicroModal.close("write-post-modal")
    })
</script>


<div id="write-post-modal" class="is-open" aria-hidden="true">
    <div tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
        
        <div class="modal-heading">
            <h2 id="modal-1-title">{title}</h2>
            <button aria-label="Close modal" data-micromodal-close class="text">Close</button>
        </div>
        <div id="modal-1-content">
            <slot />
        </div>

    </div>
</div>