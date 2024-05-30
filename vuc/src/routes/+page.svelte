<script>
	import BookGrid from "$lib/bookGrid.svelte";
	import NavBar from "$lib/navBar.svelte";
	import SearchBar from "$lib/searchBar.svelte";
  import "../app.css";
  const books = [
  {
    id: '9780385533225',
    name: 'Clean Code',
    introduction: 'Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees.',
    author: 'Robert C. Martin',
  },
  {
    id: '9780385533225',
    name: 'Refactoring',
    introduction: 'As the application of object technology--particularly the Java programming language--has become commonplace, a new problem has emerged to confront the software development community.',
    author: 'Martin Fowler',
  },
  {
    id: '9780385533225',
    name: 'The C Programming Language',
    introduction: 'This book is meant to help the reader learn how to program in C.',
    author: 'Brian W. Kernighan, Dennis M. Ritchie',
  },
  {
    id: '9780385533225',
    name: 'Design Patterns',
    introduction: 'Capturing a wealth of experience about the design of object-oriented software, four top-notch researchers present a catalog of simple and succinct solutions to commonly occurring design problems.',
    author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
  },
  {
    id: '9780385533225',
    name: 'Domain-Driven Design',
    introduction: 'Explains how to incorporate effective domain modeling into the software development process.',
    author: 'Eric Evans',
  },
  // Add more books as needed
];

let loggedIn = true;
</script>

<style>

</style>

<main class="bg-gray-50 dark:bg-gray-800 flex flex-col min-h-screen"> <!-- Updated background color -->
  <NavBar {loggedIn} />
  <div class="p-4 mt-24 flex-1"> <!-- Added mt-16 for top margin -->
    <BookGrid {books} />
  </div>
</main>

