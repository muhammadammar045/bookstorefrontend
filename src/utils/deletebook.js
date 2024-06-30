import axios from 'axios';
import { envVars } from '../../envexport';

export const handleDelete = async (bookId, setBooks, books) => {
    try {
        const deletedBookResponse = await axios.delete(
            `${envVars.backend_uri}/books/delete-book/${bookId}`
        );
        if (deletedBookResponse) {
            setBooks(books.filter((book) => book._id !== bookId));
            console.log(`Book Deleted : ${deletedBookResponse.data}`);
            return deletedBookResponse;
        }
    } catch (error) {
        console.log("Error Deleting The book:", error.message);
        throw error;
    }
};
