<script>
	import NavBar from '$lib/navBar.svelte';
	import { onMount } from 'svelte';
	import { initializeUser, loggedIn } from '../stores/auth';


	onMount(() => {
		initializeUser();
	});
	let isLoggedIn = false;
	loggedIn.subscribe((value) => {
		isLoggedIn = value;
	});
</script>

<main class="bg-gray-50 dark:bg-gray-800 flex flex-col min-h-screen">

	<NavBar loggedIn = {isLoggedIn} />
	<div class="p-4 mt-24 flex-1">

		<slot></slot>
	</div>
</main>
