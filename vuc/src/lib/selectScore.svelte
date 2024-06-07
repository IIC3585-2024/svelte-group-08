<script lang="ts">
  import { selectedState, selectedScore, bookListData } from '../stores/books';
  import { get } from 'svelte/store';

  export let scores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


  let isLoading = false;

  
  async function updateList() {
    const state = get(selectedState);
    const score = get(selectedScore);



    const requestBody = {
      state: state,
      score: score
    };

    isLoading = true;
    try {
      const response = await fetch(`http://localhost:3000/listElements/${$bookListData.listElement.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Failed to update list');
      }

      console.log('List updated', response);
    } catch (error) {
      console.error(error);
    } finally {
      isLoading = false;
    }
  }
</script>

<div>
  {#if $bookListData}
    {#if $bookListData.userHasBook}
      <form class="max-w-sm mx-auto" on:change={updateList}>
        <select 
          id="scores" 
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          bind:value={$selectedScore}
          disabled={isLoading}
        >
          <option selected>Select a score</option>
          {#each scores as score}
            <option value={score}>{score}</option>
          {/each}
        </select>
      </form>
    {/if}
  {:else}
    <p>Loading user information...</p>
  {/if}
</div>
