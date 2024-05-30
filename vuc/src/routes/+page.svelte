<script lang="ts">
	import BookGrid from "$lib/bookGrid.svelte";
	import NavBar from "$lib/navBar.svelte";
  import "../app.css";
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

let loggedIn = true;
</script>

<style>

</style>


  <BookGrid {books} />


