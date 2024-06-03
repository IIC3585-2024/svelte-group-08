import { writable } from "svelte/store";
import debounce from 'lodash/debounce';


type Book = {
    cover_i: string;
    key: string;
    author_name: string[];
    first_sentence: string;
    title: string;
  };



export const searchResults = writable<Book[]>([]);
// export const searchResults = writable([]);
// Function to perform search operation
export const searchBooks = debounce(async (event: Event) => {
    const searchText = (event.target as HTMLInputElement).value;
    
    try {
      const response = await fetch(`http://localhost:3000/books/searchByTitle?title=${searchText}`);
      const results = await response.json();
      searchResults.set(results.books as Book[]);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }, 300);