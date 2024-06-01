
<script >
  export let scores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  </script>

<form class="max-w-sm ">
    <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option selected>Select a score</option>
      {#each scores as score}
        <option value={score}>{score}</option>
      {/each}
    </select>
  </form>
  