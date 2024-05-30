<script>

	import NavBar from "$lib/navBar.svelte";
    let loggedIn = true;
</script>


<main class="bg-gray-50 dark:bg-gray-800 flex flex-col min-h-screen"> <!-- Updated background color -->
    <NavBar {loggedIn} />
    <div class="p-4 mt-24 flex-1"> <!-- Added mt-16 for top margin -->
      <slot> </slot>
    </div>
  </main>