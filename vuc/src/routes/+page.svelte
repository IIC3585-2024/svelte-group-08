<script lang="ts">
	import BookGrid from "$lib/bookGrid.svelte";
	import NavBar from "$lib/navBar.svelte";
  import "../app.css";
  import { searchResults } from "../stores/books";
  type Book = {
    cover_i: string;
    key: string;
    author_name: string[];
    first_sentence: string;
    title: string;
    };

    const books: Book[] = [
  ];

  console.log($searchResults);

  

let loggedIn = true;
</script>

<style>

</style>


  <BookGrid {$searchResults} />


