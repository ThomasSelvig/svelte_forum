<style lang="scss">
    dialog {
        position: absolute;
        display: inline-block;
        margin: 0;

        border: none;
        background-color: $main_background;
        color: $text;

        &::backdrop {
            background-color: transparent;
        }

        ul {
            padding: 0;
            margin: 0;
            list-style: none;
        }
    }
</style>

<script lang="ts">
	import { onMount } from "svelte";

    export let relative_to: HTMLElement

    let dialog: HTMLDialogElement

    // reactive positioning of dialog box
    $: if (relative_to && dialog) {
        const parent_bounds = relative_to.getBoundingClientRect()

        let parent_bottom_left = [
            parent_bounds.x - dialog.clientWidth + parent_bounds.width,
            parent_bounds.y + parent_bounds.height
        ]

        dialog.style.left = `${parent_bottom_left[0]}px`
        dialog.style.top = `${parent_bottom_left[1]}px`
    }

    export function toggle() {
        dialog?.showModal()
    }

    onMount(() => {
        dialog?.addEventListener("click", event => {
            const rect = dialog!.getBoundingClientRect()
            const is_in_dialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width)
            if (!is_in_dialog) {
                dialog!.close()
            }
        })
    })

</script>

<dialog bind:this={dialog}>
    <ul>
        <slot />
    </ul>
</dialog>