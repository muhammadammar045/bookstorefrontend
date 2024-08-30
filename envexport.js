const envVars = {
    backend_uri: String(import.meta.env.VITE_BACKEND_URI),
    tinymce_api_key: String(import.meta.env.VITE_TINYMCE_API_KEY)
}
export default envVars