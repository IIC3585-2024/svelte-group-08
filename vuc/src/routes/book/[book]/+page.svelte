<script lang="ts">
	import AddToListComponent from '$lib/addToListComponent.svelte';
	import BookCoverComponent from '$lib/bookCoverComponent.svelte';
	import RecommendButton from '$lib/recommendButton.svelte';

	import SelectScore from '$lib/selectScore.svelte';

	import '../../../app.css';
	import { onMount } from 'svelte';
	import { book, bookListData, initializeBookData, isBookLoading, isLoading } from '../../../stores/books';

	export let data: { bookId: string };


    onMount(() => {
        const cleanup = initializeBookData(data.bookId);
        return cleanup;
    });
</script>

{#if $isBookLoading}

	<div>Loading...</div>
	{:else if $book}
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
				


					<div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
						<AddToListComponent/>
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
