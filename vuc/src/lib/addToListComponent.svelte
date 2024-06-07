
<script lang="ts">
	import { get } from 'svelte/store';
	import { user } from '../stores/auth';
	import {
		selectedState,
		selectedScore,
		bookListData,
		book,
		initializeBookData,
		fetchBookListData
	} from '../stores/books';

	let isLoading = false;

	async function addToList() {
		const userData = get(user);
		if (!userData || !userData.id) return;

		const bookKey = $book?.id.replace('/works/', '');
		const requestBody = {
			userId: userData.id,
			key: bookKey
		};

		isLoading = true;
		try {
			const response = await fetch('http://localhost:3000/listElements/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestBody)
			});

			if (!response.ok) {
				throw new Error('Failed to add to list');
			}

			console.log('Book added to list');
			if ($book && $user) fetchBookListData($user.id, $book.id);
		} catch (error) {
			console.error(error);
		} finally {
			isLoading = false;
		}
	}

	async function updateList() {
		const userData = get(user);
		if (!userData || !userData.id) return;

		const state = get(selectedState);
		const score = get(selectedScore);

		const requestBody = {
			state,
			score
		};

		isLoading = true;
		try {
			const response = await fetch(
				`http://localhost:3000/listElements/${$bookListData.listElement.id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(requestBody)
				}
			);

			if (!response.ok) {
				throw new Error('Failed to update list');
			}

			console.log('List updated');
		} catch (error) {
			console.error(error);
		} finally {
			isLoading = false;
		}
	}
</script>

<div>
	{#if $user && $user.id && $bookListData}
		{#if !$bookListData.userHasBook}
			<button
				type="button"
				class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				on:click={addToList}
				disabled={isLoading}
			>
				<svg
					class="w-6 h-6 text-gray-800 dark:text-white"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 12h14m-7 7V5"
					/>
				</svg>
				Add to list
			</button>
		{/if}
		{#if $bookListData.userHasBook}
			<form class="max-w-sm mx-auto" on:change={updateList}>
				<select
					id="states"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					bind:value={$selectedState}
					disabled={isLoading}
				>
					<option value="Plan to read">Plan to read</option>
					<option value="Reading">Reading</option>
					<option value="Completed">Completed</option>
					<option value="On Hold">On-Hold</option>
					<option value="Dropped">Dropped</option>
				</select>
			</form>
		{/if}
	{:else}
		<p>Loading user information...</p>
	{/if}
</div>
