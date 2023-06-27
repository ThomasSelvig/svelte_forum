
<style lang="scss">
    form {
        label, button, input {
            display: block;
        }
    }
    .error {
        white-space: pre-wrap;
    }
</style>

<script lang="ts">
    import { pb } from "../../lib/pocketbase"
    import { goto } from "$app/navigation"


    let error
    async function register_submit(event) {
        const data = new FormData(this)

        pb.collection("users").create(Object.fromEntries(data.entries()))
            .then(async user_data => {
                // login
                await pb.collection("users").authWithPassword(
                    data.get("email").toString(),
                    data.get("password").toString()
                )
                goto("/")
            })
            .catch(pb_err => {
                error = JSON.stringify(pb_err.response.data, null, 4)
            })
    }
</script>

<h2>Register</h2>
<form method="POST" on:submit|preventDefault={register_submit}>
    <label>
        Email
        <input type="email" name="email">
    </label>
    <label>
        Password
        <input type="password" name="password">
    </label>
    <label>
        Confirm Password
        <input type="password" name="passwordConfirm">
    </label>
    <button>Register</button>
    {#if error} <h3 class="error">Error: {error}</h3> {/if}
</form>
