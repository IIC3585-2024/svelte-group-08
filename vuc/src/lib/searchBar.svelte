<script>
    let searchTerm = '';
  
    function handleSearch() {
      console.log('Searching for:', searchTerm);
    }
  </script>
  
  <div class="flex justify-center mt-4 mb-8">
    <input
      type="text"
      placeholder="Search..."
      bind:value={searchTerm}
      on:keydown={(e) => e.key === 'Enter' && handleSearch()}
      class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      on:click={handleSearch}
      class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
    >
      Search
    </button>
  </div>
  