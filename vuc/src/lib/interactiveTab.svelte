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
    type TabName = 'profile' | 'dashboard' | 'settings' | 'contacts';
  
    // Create a writable store to hold the active tab
    const activeTab = writable<TabName>('profile');
  
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
            class:active-tab={$activeTab === 'profile'}
            on:click={() => setActiveTab('profile')}
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected={$activeTab === 'profile'}
          >
            Profile
          </button>
        </li>
        <li class="flex-1" role="presentation">
          <button
            class="inline-block w-full p-4 rounded-t-lg text-white"
            class:active-tab={$activeTab === 'dashboard'}
            on:click={() => setActiveTab('dashboard')}
            type="button"
            role="tab"
            aria-controls="dashboard"
            aria-selected={$activeTab === 'dashboard'}
          >
            Dashboard
          </button>
        </li>
        <li class="flex-1" role="presentation">
          <button
            class="inline-block w-full p-4 rounded-t-lg text-white"
            class:active-tab={$activeTab === 'settings'}
            on:click={() => setActiveTab('settings')}
            type="button"
            role="tab"
            aria-controls="settings"
            aria-selected={$activeTab === 'settings'}
          >
            Settings
          </button>
        </li>
        <li class="flex-1" role="presentation">
          <button
            class="inline-block w-full p-4 rounded-t-lg text-white"
            class:active-tab={$activeTab === 'contacts'}
            on:click={() => setActiveTab('contacts')}
            type="button"
            role="tab"
            aria-controls="contacts"
            aria-selected={$activeTab === 'contacts'}
          >
            Contacts
          </button>
        </li>
      </ul>
    </div>
    <div>
      {#if $activeTab === 'profile'}
        <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="profile-tab">
            <BooksTable {books} />
        </div>
      {/if}
      {#if $activeTab === 'dashboard'}
        <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="dashboard-tab">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the <strong class="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</strong>.
          </p>
        </div>
      {/if}
      {#if $activeTab === 'settings'}
        <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="settings-tab">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the <strong class="font-medium text-gray-800 dark:text-white">Settings tab's associated content</strong>.
          </p>
        </div>
      {/if}
      {#if $activeTab === 'contacts'}
        <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="contacts-tab">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the <strong class="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</strong>.
          </p>
        </div>
      {/if}
    </div>
  </div>
  