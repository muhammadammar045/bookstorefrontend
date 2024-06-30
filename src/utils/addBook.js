import axios from 'axios';
import { envVars } from '../../envexport';

export const addBook = async (data, setLoading, navigate, reset) => {
    setLoading(true);
    try {
        const newBook = {
            title: data.title,
            price: data.price,
            description: data.description,
            category: data.category,
            thumbnail: data.thumbnail[0],
        };
        const addBookResponse = await axios.post(
            `${envVars.backend_uri}/books/add-book`,
            newBook,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        if (addBookResponse) {
            console.log(addBookResponse?.data?.data);
            console.log(addBookResponse.data.message);
        }
        navigate("/all-books");
        reset();
        return addBookResponse;
    } catch (error) {
        console.log("Error Adding The book:", error.message);
        throw error;
    } finally {
        setLoading(false);
    }
};
