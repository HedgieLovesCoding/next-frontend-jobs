<script>
    import { logOut, isLoggedStore, checkLoggedIn } from "../../utils/auth.js";
    import { goto } from '$app/navigation';
    import { alerts } from "../../utils/alert.js";
    import { themes, toggleTheme } from '../../utils/theme.js';
    import { currentSearch } from "../../utils/search.js";

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

    function toggleSlider() {
        var styleElem = document.head.appendChild(document.createElement("style"));
        toggleTheme()
        switch ($themes[0]) {
            case 'lightMode':
                document.getElementById('slider').style.backgroundColor = 'black'
                styleElem.innerHTML = "#slider:before {background-color: white;}"
                break;
            case 'darkMode':
                document.getElementById('slider').style.backgroundColor = 'whitesmoke'
                styleElem.innerHTML = "#slider:before {background-color: black;}"
                break;
        }
    }

    function activeSearchBar(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            currentSearch.set(document.getElementById("searchBar").value)
            document.getElementById("searchButton").click();
        }
    }

    function startSearch() {
        goto('/' + $currentSearch.content)
    }
</script>

<style>
    .btn {
        border-radius: 6px;
    }

    .btn-ghost:hover {
        border-radius: 6px;
    }
    
    .btn-ghost:active {
        border-radius: 6px;
    }

    .searchBarLight {
            border-color:black; 
            border-radius:6px;
        }

    .searchBarDark {
        border-color:white; 
        border-radius:6px;
    }

    .searchBarLight::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: black;
        opacity: 1; /* Firefox */
    }

    .searchBarLight:-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: black;
    }

    .searchBarLight::-ms-input-placeholder { /* Microsoft Edge */
        color: black;
    }

    .searchBarDark::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: white;
        opacity: 1; /* Firefox */
    }

    .searchBarDark:-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: white;
    }

    .searchBarDark::-ms-input-placeholder { /* Microsoft Edge */
        color: white;
    }

    .switch {
        position: relative;
        display: inline-block;
        top: 12px;
        width: 45px;
        height: 24px;
    }

    .switch input { 
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: black;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 18.35px;
        width: 18.35px;
        left: 3.7px;
        bottom: 3px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }

    input:checked + .slider {
        background-color: white; 
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(19.7px);
        -ms-transform: translateX(19.7px);
        transform: translateX(19.7px);
        background-color: black;
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 17px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
</style>

<div data-theme="{$themes[1]}" class="navbar bg-base-100 pb-0 pt-0" id="nav">
    <div class="flex-1">
        <a href="/" class="btn btn-ghost normal-case text-xl mr-2 hoverMenu">NEXT Jobs</a>
        {#if $themes[0] == 'lightMode'}
            <input id="searchBar" on:click={activeSearchBar} on:keyup={activeSearchBar} type="text" placeholder="{$currentSearch.placeHolder}" value={$currentSearch.content} class="input input-bordered w-96 searchBarLight" />
        {:else}
            <input id="searchBar" on:click={activeSearchBar} on:keyup={activeSearchBar} type="text" placeholder="{$currentSearch.placeHolder}" value={$currentSearch.content} class="input input-bordered w-96 searchBarDark" />
        {/if}
        <button id="searchButton" on:click={startSearch} class="hidden"></button>
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

            <li><label class="switch btn-square ml-4">
                {#if $themes[0] == 'lightMode'}
                    <input on:click={toggleSlider} type="checkbox" />
                {:else}
                    <input on:click={toggleSlider} type="checkbox" checked />
                {/if}
                <span id="slider" class="slider round"></span>
            </label></li>
        </ul>
    </div>
</div>