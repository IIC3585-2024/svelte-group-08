<script lang="ts">
	import { writable } from 'svelte/store';
	import BookCoverImage from './bookCoverComponent.svelte';
	import { onMount } from 'svelte';
	import { user } from '../stores/auth';

	interface Book {
		id: number;
		state: string;
		score: number;
		userId: number;
		bookId: number;
		createdAt: string;
		updatedAt: string;
		book: {
			key: string;
		};
	}

	type BookData = {
		id: string;
		title: string;
		description: string;
		authors: string[];
		covers: string[];
	};

	export let state = '';
	const userBookList = writable<Book[]>([]);
	const books = writable<BookData[]>([]);
	const isListLoading = writable(false);
	async function fetchUserBookList(userId: number, state?: string) {
		try {
			isListLoading.set(true);
			let url = `http://localhost:3000/listElements/userList/${userId}`;
			if (state != '') {
				url += `?state=${state}`;
			}
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error('Failed to fetch user book list');
			}
			const data = await response.json();
			userBookList.set(data);
		} catch (error) {
			console.error('Error fetching user book list:', error);
		} finally {
			for (let book of $userBookList) {
				const bookData = await fetchBookData(book.book.key);
				if (!bookData) continue;
				books.update(($books) => [...$books, bookData]);
				
			}
      isListLoading.set(false);
		}
	}

	async function fetchBookData(bookId: string) {
		try {
			const response = await fetch(`http://localhost:3000/books/searchByKey?key=${bookId}`);
			if (!response.ok) {
				throw new Error('Failed to fetch book data');
			}
			const bookData = await response.json();
			const parsedBookData = {
				id: bookId,
				title: bookData.book.title,
				description: bookData.book.description,
				authors: bookData.authors,
				covers: bookData.book.covers
			};
			return parsedBookData;
		} catch (error) {
			console.error(error);
		}
	}

	onMount(() => {
		if (!$user) return;
		const userId = $user.id;
		fetchUserBookList(userId, state);
	});
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
	<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
		<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
			<tr>
				<th scope="col" class="px-6 py-3">Cover</th>
				<th scope="col" class="px-6 py-3">Name</th>
				<th scope="col" class="px-6 py-3">Author</th>
				<th scope="col" class="px-6 py-3">Introduction</th>
				<th scope="col" class="px-6 py-3">Action</th>
			</tr>
		</thead>
		<tbody>
			{#if $isListLoading}
				<tr
					><div
						class="flex items-center justify-center w-56 h-56  rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
					>
          <span class="bg-blue-200 text-xs font-medium text-blue-800 text-center p-0.5 leading-none rounded-full px-2 dark:bg-blue-900 dark:text-blue-200 absolute -translate-y-1/2 translate-x-1/2 right-1/2">Loading</span>
					</div>
          </tr
				>
			{/if}
			{#each $books as book}
				<tr
					class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
				>
					<td class="px-6 py-4">
						<BookCoverImage src={book.covers[0]} alt={book.title} />
					</td>
					<td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">{book.title}</td>
					<td class="px-6 py-4">{book.authors}</td>
					<td class="px-6 py-4">{book.description}</td>
					<td class="px-6 py-4">
						<a
							href={`/book/${book.id}`}
							class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a
						>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
