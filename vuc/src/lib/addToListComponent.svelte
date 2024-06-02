


<script lang="ts">

    export let bookInList : boolean = true;
    let user = localStorage.getItem('user');
    console.log(user);
</script>

<div>
    {#if !bookInList}
<button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
      </svg>
      
    Add to list
    </button>
    {/if}
    {#if bookInList}
    
<form class="max-w-sm mx-auto">
    <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option value="PTR" selected>Plan to read</option>
      <option value="RE">Reading</option>
      <option value="CMP">Completed</option>
      <option value="OH">On-Hold</option>
      <option value="DP">Dropped</option>

    </select>
  </form>

  {/if}

</div>
    