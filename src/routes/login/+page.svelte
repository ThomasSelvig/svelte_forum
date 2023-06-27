<!-- <button on:click={ () => {
    pb.collection("users").authWithPassword("aaaaaaaa", "aaaaaaaa")
} }>login as "aaaaaaaa"</button>

<button on:click={ () => {
    pb.collection("users").authWithPassword("bbbbbbbb", "bbbbbbbb")
} }>login as "bbbbbbbb"</button>

<button on:click={ () => {
    pb.authStore.clear()
} }>logout</button> -->

<style lang="scss">
    form {
        label, button, input {
            display: block;
        }
    }
</style>

<script lang="ts">
	import { goto } from "$app/navigation";
    import { pb } from "../../lib/pocketbase"


    async function login_submit(event) {
        const data = new FormData(this)

        await pb.collection("users").authWithPassword(
            data.get("email").toString(),
            data.get("password").toString()
        )
    }
    goto("/")
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
    <button>Log in</button>
</form>
