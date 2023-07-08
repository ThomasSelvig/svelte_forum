<style lang="scss">
    dialog {
        // visibility
        &[open] {
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

        color: white;
        background-color: transparentize($background, 0.5);
        border: none;

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
    export let title: string

    let dialog: HTMLDialogElement
    
    export function open() {
        dialog.showModal()
        // focus first control
        let form = dialog.querySelector("form") as HTMLFormElement
        (form.elements[0] as HTMLElement).focus()
    }

    export function close() {
        dialog.close()
    }

    function on_close() {
        // clear input fields
        let form = dialog.querySelector("form") as HTMLFormElement
        if (form) {
            for (let field of form.elements as unknown as any[]) {
                if (field.type != "hidden") {
                    field.value = ""
                }
            }
        }
    }

</script>


<dialog bind:this={dialog} on:close={on_close}>
    <div>
        <div class="modal-heading">
            <h2>{title}</h2>
            <button aria-label="Close modal" class="text" on:click={() => {dialog.close()}}>Close</button>
        </div>
        <div>
            <slot />
        </div>
    </div>
</dialog>
