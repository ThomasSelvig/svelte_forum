<style lang="scss">@use "../auth_components.scss";</style>
<script lang="ts">
    import { pb } from "$lib/pocketbase"
    import { goto } from "$app/navigation"
	import { get_data_entries } from "$lib/helpers";


    let error: string
    async function register_submit(e: SubmitEvent) {
        const data = get_data_entries(e)

        pb.collection("users").create(data)
            .then(async user_data => {
                // login
                await pb.collection("users").authWithPassword(
                    data.email.toString(),
                    data.password.toString()
                )
                goto("/")
            })
            .catch(pb_err => {
                error = `Error: ${pb_err.response.message}\nDetails: ${JSON.stringify(pb_err.response.data, null, 4)}`
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
    {#if error} <h3 class="error">{error}</h3> {/if}
</form>

<h3><a href="/login">Click here</a> to login instead</h3>
