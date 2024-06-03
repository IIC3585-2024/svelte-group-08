<script  lang="ts">
	import { searchResults } from "../stores/books";
  import { goto } from '$app/navigation';

    import BookCoverImage from "./bookCoverComponent.svelte";

    function handleBookCoverClick(bookKey: string) {
    // Perform actions when book cover is clicked, e.g., navigate to book details page
    const bookId = bookKey.replace('/works/', '');
    goto(`/book/${bookId}`);
    console.log("aa")
  }
    
  </script>
  
  <style>
    /* Additional CSS styles */
    .book-item {
      border: 1px solid #e5e7eb; /* Gray border */
      padding: 16px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #ffffff; /* White background */
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Soft shadow */
    }
  
    .book-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-top: 8px;
      width: 100%;
      color: #374151; /* Dark gray text */
    }
  
    .book-author {
      margin-top: 8px;
      font-style: italic;
      color: #6b7280; /* Light gray text */
    }
  
    /* Adjustments for dark mode */
    @media (prefers-color-scheme: dark) {
      .book-item {
        background-color: #1f2937; /* Darker background */
        border-color: #374151; /* Dark border */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4); /* Stronger shadow */
      }
  
      .book-info {
        color: #d1d5db; /* Light text for dark background */
      }
  
      .book-author {
        color: #9ca3af; /* Light text for dark background */
      }
    }
  </style>
  
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {#each $searchResults as book}
      <div class="book-item">
          <button on:click={() => handleBookCoverClick(book.key)} >
          <BookCoverImage src={book.cover_i} alt={book.title} size="M"/>
        </button>
        <div class="book-info">
          <div class="font-bold">{book.title}</div>
          {#if book.first_sentence?.[0]}
            <div class="book-introduction">{book.first_sentence[0]}</div>
          {/if}
          {#if book.author_name?.[0]}
            <div class="book-author">Author: {book.author_name[0]}</div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
  