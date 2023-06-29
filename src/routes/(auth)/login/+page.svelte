<script lang="ts">
	import { goto } from "$app/navigation";
    import { pb } from "$lib/pocketbase"
    import "../auth_components.scss"


    let error: string
    async function login_submit(event: SubmitEvent) {
        const data = new FormData(event.target as HTMLFormElement)

        pb.collection("users").authWithPassword(
            data.get("email")!.toString(),
            data.get("password")!.toString()
        )
            .then(user_data => {
                goto("/")
            })
            .catch(pb_err => {
                error = `Error: ${pb_err.response.message}\nDetails: ${JSON.stringify(pb_err.response.data, null, 4)}`
            })
    }
</script>

<h2>Login</h2>
<form method="POST" on:submit|preventDefault={login_submit}>
    <label>
        Email
        <input type="email" name="email">
    </label>
    <label>
        Password
        <input type="password" name="password">
    </label>
    <button>Login</button>
    {#if error} <h3 class="error">{error}</h3> {/if}
</form>

<h3>No account? <a href="/register">Register here</a></h3>
