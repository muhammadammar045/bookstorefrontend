import axios from 'axios';
import { envVars } from '../../envexport';

export const fetchBooks = async (setLoading, setBooks, setTotalPages, page = 1) => {
    setLoading(true);
    try {
        const response = await axios.get(
            `${envVars.backend_uri}/books/get-all-books?page=${page}`
        );
        const { results, meta } = response.data.data;
        setBooks(results);
        setTotalPages(meta.totalPages);
        console.log(results);
        return response;
    } catch (error) {
        console.log("Error Fetching The books:", error.message);
        throw error;
    } finally {
        setLoading(false);
    }
};
