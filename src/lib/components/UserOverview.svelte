<style lang="scss">
    .card {
        // background-color: $main_background;
        width: 12rem;
    }

    .avatar {
        width: 10rem;
        height: 10rem;
        display: block;
        padding: 1rem;
    }

    .stats {
        margin: 1rem 2rem 0rem;
        display: flex;
        justify-content: center;
        & > * {
            margin: .5rem;
        }
    }

    .account_age, .score {
        color: $darker_text;
        text-align: center;
        margin: .5rem;
    }
</style>

<script lang="ts">
    import MdiAccountCircle from "~icons/mdi/account-circle"
    import MdiThumbsUpDown from '~icons/mdi/thumbs-up-down'
    import MdiMessageDraw from '~icons/mdi/message-draw'
    import MdiComment from '~icons/mdi/comment'
    import MdiArrowRight from '~icons/mdi/arrow-right'
	import type { UsersPublicResponse } from "$lib/pocketbase-types";

    export let user: UsersPublicResponse
</script>


<div class="card">

    <div class="avatar icon">
        <MdiAccountCircle width="10rem" height="10rem" /> 
    </div>

    <div class="stats">
        <!-- <span>
            7
            <span class="icon"><MdiThumbsUpDown /></span>
        </span> -->
        <a href={`/user/${user.id}/posts`}>
            7
            <span class="icon"><MdiMessageDraw /></span>
        </a>
        <a href={`/user/${user.id}/comments`}>
            7
            <span class="icon"><MdiComment /></span>
        </a>
    </div>
    
    <p class="account_age">Joined {new Date(user.created).toLocaleDateString("us")}</p>
    <p class="score">
        15
        Social Credit
    </p>

</div>