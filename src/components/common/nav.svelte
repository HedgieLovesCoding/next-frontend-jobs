<script>
    import { logOut, isLoggedStore, checkLoggedIn } from "../../utils/auth.js"
    import { goto } from '$app/navigation'
    import { alerts } from "../../utils/alert.js"

    function logOutClick() {
        logOut()
        goto('/')
    }

    async function displayAlert() {
        if (!await checkLoggedIn()) {
            alerts.set('Account required to post', 'warning')
            setTimeout(() => alerts.clear(), 1000)
        }
    }
</script>

<div class="navbar bg-base-100" style="background-color: #121212;" id="nav">
    <div class="flex-1">
        <a href="/" class="btn btn-ghost normal-case text-xl">PREVIOUS Jobs</a>
    </div>
    <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
            <li><a on:click={displayAlert} href="/jobs/new">Post a Job</a></li>
                
            {#if $isLoggedStore}
                <li><button on:click={logOutClick}>Log Out</button></li>
            {:else}
                <li><a href="/users/login">Log In</a></li>
                <li><a href="/users/new">Register</a></li>
            {/if}
        </ul>
    </div>
</div>