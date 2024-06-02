<script>
	import NavBar from '$lib/navBar.svelte';
	import { onMount } from 'svelte';
	import { initializeUser } from '../stores/auth';
	import { user, loggedIn } from '../stores/user';

	// Initialize the user state when the app mounts
	onMount(() => {
		initializeUser();
	});
	let isLoggedIn = false;
	loggedIn.subscribe((value) => {
		isLoggedIn = value;
	});
</script>

<main class="bg-gray-50 dark:bg-gray-800 flex flex-col min-h-screen">
	<!-- Updated background color -->
	<NavBar loggedIn = {isLoggedIn} />
	<div class="p-4 mt-24 flex-1">
		<!-- Added mt-16 for top margin -->
		<slot></slot>
	</div>
</main>
