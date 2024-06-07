<script lang="ts">
  import { writable } from 'svelte/store';
import BooksTable from './booksTable.svelte';



  type Book = {
    id: string;
    name: string;
    introduction: string;
    author: string;
  };

  const books: Book[] = [
    { id: '9780132350884', name: 'Clean Code', introduction: 'Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees.', author: 'Robert C. Martin' },
    { id: '9780201485677', name: 'Refactoring', introduction: 'As the application of object technology--particularly the Java programming language--has become commonplace, a new problem has emerged to confront the software development community.', author: 'Martin Fowler' },
    { id: '9780131103627', name: 'The C Programming Language', introduction: 'This book is meant to help the reader learn how to program in C.', author: 'Brian W. Kernighan, Dennis M. Ritchie' },
    { id: '9780201633610', name: 'Design Patterns', introduction: 'Capturing a wealth of experience about the design of object-oriented software, four top-notch researchers present a catalog of simple and succinct solutions to commonly occurring design problems.', author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides' },
    { id: '9780321125217', name: 'Domain-Driven Design', introduction: 'Explains how to incorporate effective domain modeling into the software development process.', author: 'Eric Evans' },
    // Add more books as needed
  ];

  // Define a type for tab names
  type TabName = 'all-books' | 'plan-to-read' | 'dropped' | 'on-hold' | 'completed' | 'currently-reading'| 'recommended';

  // Create a writable store to hold the active tab
  const activeTab = writable<TabName>('all-books');

  // Function to set the active tab
  function setActiveTab(tab: TabName) {
    activeTab.set(tab);
  }
</script>

<style>
  .active-tab {
    border-bottom: 2px solid #3b82f6; /* Tailwind's blue-500 */
    color: #3b82f6;
  }
</style>

<div>
  <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
    <ul class="flex flex-wrap text-sm font-medium text-center w-full" role="tablist">
      <li class="flex-1" role="presentation">
        <button
          class="inline-block w-full p-4 rounded-t-lg text-white"
          class:active-tab={$activeTab === 'all-books'}
          on:click={() => setActiveTab('all-books')}
          type="button"
          role="tab"
          aria-controls="all-books"
          aria-selected={$activeTab === 'all-books'}
        >
          All Books
        </button>
      </li>
      <li class="flex-1" role="presentation">
        <button
          class="inline-block w-full p-4 rounded-t-lg text-white"
          class:active-tab={$activeTab === 'plan-to-read'}
          on:click={() => setActiveTab('plan-to-read')}
          type="button"
          role="tab"
          aria-controls="plan-to-read"
          aria-selected={$activeTab === 'plan-to-read'}
        >
          Plan to read
        </button>
      </li>
      <li class="flex-1" role="presentation">
        <button
          class="inline-block w-full p-4 rounded-t-lg text-white"
          class:active-tab={$activeTab === 'dropped'}
          on:click={() => setActiveTab('dropped')}
          type="button"
          role="tab"
          aria-controls="dropped"
          aria-selected={$activeTab === 'dropped'}
        >
          Dropped
        </button>
      </li>
      <li class="flex-1" role="presentation">
        <button
          class="inline-block w-full p-4 rounded-t-lg text-white"
          class:active-tab={$activeTab === 'on-hold'}
          on:click={() => setActiveTab('on-hold')}
          type="button"
          role="tab"
          aria-controls="on-hold"
          aria-selected={$activeTab === 'on-hold'}
        >
          On hold
        </button>
      </li>
      <li class="flex-1" role="presentation">
        <button
          class="inline-block w-full p-4 rounded-t-lg text-white"
          class:active-tab={$activeTab === 'completed'}
          on:click={() => setActiveTab('completed')}
          type="button"
          role="tab"
          aria-controls="completed"
          aria-selected={$activeTab === 'completed'}
        >
          Completed
        </button>
      </li>
      <li class="flex-1" role="presentation">
        <button
          class="inline-block w-full p-4 rounded-t-lg text-white"
          class:active-tab={$activeTab === 'currently-reading'}
          on:click={() => setActiveTab('currently-reading')}
          type="button"
          role="tab"
          aria-controls="currently-reading"
          aria-selected={$activeTab === 'currently-reading'}
        >
          Currently reading
        </button>
      </li>
      <li class="flex-1" role="presentation">
        <button
          class="inline-block w-full p-4 rounded-t-lg text-white"
          class:active-tab={$activeTab === 'recommended'}
          on:click={() => setActiveTab('recommended')}
          type="button"
          role="tab"
          aria-controls="recommended"
          aria-selected={$activeTab === 'recommended'}
        >
          Recommended
        </button>
      </li>
    </ul>
  </div>
  <div>
    {#if $activeTab === 'all-books'}
      <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="all-books-tab">
          <BooksTable  />
      </div>
    {/if}
    {#if $activeTab === 'plan-to-read'}
    <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="all-books-tab">
      <BooksTable state="Plan to read"  />
  </div>
    {/if}
    {#if $activeTab === 'dropped'}
    <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="all-books-tab">
      <BooksTable state="Dropped"  />
  </div>
    {/if}
    {#if $activeTab === 'on-hold'}
    <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="all-books-tab">
      <BooksTable state="On Hold" />
  </div>
    {/if}
    {#if $activeTab === 'completed'}
    <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="all-books-tab">
      <BooksTable state="Completed" />
  </div>
    {/if}
    {#if $activeTab === 'currently-reading'}
    <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="all-books-tab">
      <BooksTable state="Reading"  />
  </div>
    {/if}
    {#if $activeTab === 'recommended'}
    <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="all-books-tab">
      <BooksTable  state="recommended"/>
  </div>
    {/if}
  </div>
</div>
