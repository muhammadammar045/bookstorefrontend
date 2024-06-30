import axios from 'axios';
import { envVars } from '../../envexport';

export const getBook = async (bookId, setLoading, setBook) => {
    setLoading(true);
    try {
        const response = await axios.get(
            `${envVars.backend_uri}/books/get-book/${bookId}`
        );
        const fetchedBook = response.data.data;
        setBook(fetchedBook);
        return fetchedBook;
    } catch (error) {
        console.error("Error fetching book: ", error);
        throw error;
    } finally {
        setLoading(false);
    }
};
