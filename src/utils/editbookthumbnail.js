
import axios from 'axios';
import { envVars } from '../../envexport';

export const editThumbnail = async (data, bookId, setLoading, navigate) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("thumbnail", data.thumbnail[0]);

    try {
        const response = await axios.patch(
            `${envVars.backend_uri}/books/update-book-thumbnail/${bookId}`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );

        console.log(response);
        navigate(`/all-books`);
        return response;
    } catch (error) {
        console.error("Error updating book thumbnail: ", error);
        throw error;
    } finally {
        setLoading(false);
    }
};
