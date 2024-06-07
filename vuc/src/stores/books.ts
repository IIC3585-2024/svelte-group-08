import { writable, derived } from 'svelte/store';
import debounce from 'lodash/debounce';
import { user } from './auth';


type BookSearch = {
    cover_i: string;
    key: string;
    author_name: string[];
    first_sentence: string;
    title: string;
  };

  type BookData = {
		id: string;
		title: string;
		description: string;
		authors: string[];
		covers: string[];
	};
  

export const searchText = writable('Bible');
export const searchResults = writable<BookSearch[]>([]);
export const selectedState = writable('');
export const selectedScore = writable('');

export const searchBooks = debounce(async (event: Event) => {
    const text = (event.target as HTMLInputElement).value;
    
    try {

      const response = await fetch(`http://localhost:3000/books/searchByTitle?title=${text}`);
      const results = await response.json();
      searchResults.set(results.books);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }, 300);

  export async function firstSearch(text:string) {
    try {

        const response = await fetch(`http://localhost:3000/books/searchByTitle?title=${text}`);
        const results = await response.json();
        searchResults.set(results.books  as BookSearch[]);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
   }

  export const book = writable<BookData | null>(null);
  export const isBookLoading = writable<boolean>(true);
  
  export async function fetchBookData(bookId: string) {
    isBookLoading.set(true);
      try {
          const response = await fetch(`http://localhost:3000/books/searchByKey?key=${bookId}`);
          if (!response.ok) {
              throw new Error('Failed to fetch book data');
          }
          const bookData = await response.json();
          const parsedBookData = {
              id: bookId,
              title: bookData.book.title,
              description: bookData.book.description,
              authors: bookData.book.authors,
              covers: bookData.book.covers
          };
          book.set(parsedBookData as BookData);
      } catch (error) {
          console.error(error);
      } finally {
        isBookLoading.set(false);
      }
  }

  export const bookListData = writable<any>(null);
export const isListLoading = writable<boolean>(true);

export async function fetchBookListData(userId: number, bookId: string) {
    isListLoading.set(true);
    try {
        const query = `http://localhost:3000/listElements/userList/getByKey/${userId}/${bookId}`;
        const response = await fetch(query);
        if (!response.ok) {
            throw new Error('Failed to fetch book list data');
        }
        const bookListDataResponse = await response.json();
        bookListData.set(bookListDataResponse);
        selectedState.set(bookListDataResponse.listElement.state);
        selectedScore.set(bookListDataResponse.listElement.score);
    } catch (error) {
        console.error(error);
    } finally {
        isListLoading.set(false);
    }
}

export const isLoading = derived([isBookLoading, isListLoading], ([$bookLoading, $listLoading]) => $bookLoading || $listLoading);

export function initializeBookData(bookId: string) {
    const unsubscribe = user.subscribe(($user) => {
        if ($user) {
            fetchBookData(bookId);
            fetchBookListData($user.id, bookId);
        }
    });

    return () => unsubscribe();
}