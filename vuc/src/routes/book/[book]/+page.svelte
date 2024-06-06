<script lang="ts">
	import AddToListComponent from '$lib/addToListComponent.svelte';
	import BookCoverComponent from '$lib/bookCoverComponent.svelte';
	import RecommendButton from '$lib/recommendButton.svelte';
	import RecommendButtonAlternative from '$lib/recommendButtonAlternative.svelte';
	import SelectScore from '$lib/selectScore.svelte';
	import { writable } from 'svelte/store';
	import '../../../app.css';
	import { onMount } from 'svelte';
	import { user } from '../../../stores/auth';
	export let data: { bookId: string };

	type Book = {
		id: string;
		title: string;
		description: string;
		authors: string[];
		covers: string[];
	};

	// Create a writable store to hold the book data
	const book = writable<Book>();
    const bookListData = writable(null);
	const isLoading = writable<boolean>(true); // Boolean variable to track loading state

	const fetchBookData = async () => {
		try {
			const response = await fetch(`http://localhost:3000/books/searchByKey?key=${data.bookId}`);
			if (!response.ok) {
				throw new Error('Failed to fetch book data');
			}
			const bookData = await response.json();
			console.log(bookData);
			const parsedBookData = {
				id: data.bookId,
				title: bookData.book.title,
				description: bookData.book.description,
				authors: bookData.book.authors,
				covers: bookData.book.covers
			};
			book.set(parsedBookData as Book); // Update the store with the fetched book data
      console.log($user);
      if (!$user) {
        return;
      }
      const query= `http://localhost:3000/listElements/userList/getByKey/${$user?.id}/${data.bookId}`;
      const response2 = await fetch(query);
			if (!response2.ok) {
				throw new Error('Failed to fetch book data');
			}
			const bookListDataResponse = await response2.json();
      bookListData.set(bookListDataResponse);
      console.log(bookListDataResponse);
		} catch (error) {
			console.error(error);
		} finally {
			isLoading.set(false); // Set loading state to false when fetch completes
		}
	};

	onMount(() => {
		fetchBookData();
	});
</script>

{#if $isLoading}
	<!-- Loading indicator -->
	<div>Loading...</div>
{:else}
	<section class="py-8 antialiased">
		<div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
			<div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
				<div class="shrink-0 max-w-md lg:max-w-lg">
					<BookCoverComponent source={'id'} src={$book.covers[0]} alt={$book.title} size="L" />
				</div>

				<div class="mt-6 sm:mt-8 lg:mt-0">
					<h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
						{$book.title}
					</h1>
					<div class="mt-4 sm:items-center sm:gap-4 sm:flex">
						<div class="flex items-center gap-2 mt-2 sm:mt-0">
							<div class="flex items-center gap-1">
								<svg
									class="w-4 h-4 text-yellow-300"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
									/>
								</svg>
								<svg
									class="w-4 h-4 text-yellow-300"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
									/>
								</svg>
								<svg
									class="w-4 h-4 text-yellow-300"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
									/>
								</svg>
								<svg
									class="w-4 h-4 text-yellow-300"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
									/>
								</svg>
								<svg
									class="w-4 h-4 text-yellow-300"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
									/>
								</svg>
							</div>
							<p class="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">(5.0)</p>
						</div>
					</div>

					<div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
						<AddToListComponent bookListData={bookListData} bookData={$book} />
						<SelectScore />
						<RecommendButton />
					</div>

					<hr class="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

					<p class="mb-6 text-gray-500 dark:text-gray-400">
						{$book.description}
					</p>
				</div>
			</div>
		</div>
	</section>
{/if}
