<style lang="scss">
    [data-modal] {
        // visibility
        display: none;
        &.is-open {
            display: flex;
        }
        // positioning
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        // center
        justify-content: center;
        align-items: center;

        background-color: transparentize($background, 0.5);

        // main modal content
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
    export let modal_id: string

    onMount(() => {
        MicroModal.init({
            onClose: (modal: Element) => {
                // clear input fields
                for (let field of (
                    modal.querySelector("form") as HTMLFormElement)
                        .elements as unknown as any[]
                ) {
                    if (field.type != "hidden") {
                        field.value = ""
                    }
                }
            }
        })
        MicroModal.close(modal_id)
    })
</script>


<div id={modal_id} data-modal class="is-open" aria-hidden="true">
    <div tabindex="-1" role="dialog" aria-modal="true" aria-labelledby={`${modal_id}-title`}>
        
        <div class="modal-heading">
            <h2 id={`${modal_id}-title`}>{title}</h2>
            <button aria-label="Close modal" data-micromodal-close class="text">Close</button>
        </div>
        <div id={`${modal_id}-content`}>
            <slot />
        </div>

    </div>
</div>