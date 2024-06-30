import axios from 'axios';
import { envVars } from '../../envexport';

export const editForm = async (data, initialValues, bookId, setLoading, navigate, setModifyValues) => {
    const bookDetails = {};
    const fields = ["title", "description", "price", "category"];

    fields.forEach((field) => {
        if (data[field] !== initialValues[field]) {
            bookDetails[field] = data[field];
        }
    });

    if (Object.keys(bookDetails).length === 0) {
        console.log("No changes made");
        setModifyValues("No Changes Recorded");
        return;
    }

    setLoading(true);
    try {
        const response = await axios.patch(
            `${envVars.backend_uri}/books/update-book/${bookId}`,
            bookDetails,
            { headers: { "Content-Type": "application/json" } }
        );

        console.log(response);
        navigate(`/all-books`);
        return response;
    } catch (error) {
        console.log("Edit Form Error ", error);
        throw error;
    } finally {
        setLoading(false);
    }
};
