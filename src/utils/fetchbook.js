import axios from 'axios';
import { envVars } from '../../envexport';

export const fetchBook = async (bookId, setLoading, setValue, setBook, setInitialValues) => {
    setLoading(true);
    try {
        const response = await axios.get(
            `${envVars.backend_uri}/books/get-book/${bookId}`
        );
        const fetchedBook = response.data.data;

        setValue("title", fetchedBook.title);
        setValue("description", fetchedBook.description);
        setValue("price", fetchedBook.price);
        setValue("category", fetchedBook.category);
        setBook(fetchedBook);
        setInitialValues({
            title: fetchedBook.title,
            description: fetchedBook.description,
            price: fetchedBook.price,
            category: fetchedBook.category,
        });
        return fetchedBook;
    } catch (error) {
        console.log("Error Fetching The book:", error.message);
        throw error;
    } finally {
        setLoading(false);
    }
};
