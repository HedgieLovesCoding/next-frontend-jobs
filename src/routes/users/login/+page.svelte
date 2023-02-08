<script>
    import { goto } from '$app/navigation'
	import { alerts } from '../../../utils/alert.js';
    import { authenticateUser } from './../../../utils/auth.js'
    import SpinnerButton from '../../../components/common/SpinnerButton.svelte';
    let spinnerButton;

    function postLogIn() {
        goto('/')
    }

    async function logIn(event) {
        event.preventDefault()

        const userLoginData = {
            username: event.target['username'].value,
            password: event.target['password'].value
        }

        const res = await authenticateUser(userLoginData.username, userLoginData.password)

        if(res.success) {
            postLogIn()
        } else {
            alerts.set('Please check username / password', 'warning')
            setTimeout(() => alerts.clear(), 1000)
        }
    }
</script>

<h1 class="text-center text-xl mt-6">Login to Post a Job</h1>
<div class="text-center">
    <a class="link-hover italic text-xs" href="/users/new">
        Don't have an account? Click here to register instead.
    </a>
</div>

<div class="flex justify-center items-center mt-8">
    <form on:submit={logIn} class="w-1/3">
        <div class="form-control w-full">
            <label class="label" for="username">
                <span class="label-text">Username</span>
            </label>
            <input 
                type="text"
                name="username"
                placeholder="EggShine"
                class="input input-bordered w-full"
                required
            />
        </div>
        
        <div class="form-control w-full">
            <label class="label" for="password">
                <span class="label-text">Password</span>
            </label>
            <input 
                type="password"
                name="password"
                placeholder="Password123"
                class="input input-bordered w-full"
                required
            />
        </div>

        <div class="form-control w-full mt-4">
            <SpinnerButton buttonText="Login" bind:this={spinnerButton} />
        </div>
    </form>
</div>