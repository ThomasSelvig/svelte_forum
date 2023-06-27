<button on:click={ () => {
    pb.collection("users").authWithPassword("aaaaaaaa", "aaaaaaaa")
} }>login as "aaaaaaaa"</button>

<button on:click={ () => {
    pb.collection("users").authWithPassword("bbbbbbbb", "bbbbbbbb")
} }>login as "bbbbbbbb"</button>

<button on:click={ () => {
    pb.authStore.clear()
} }>logout</button>

<script>
    // @ts-check
    import { pb } from "../../lib/pocketbase"
</script>