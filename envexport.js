const envVars = {
    backend_uri: String(import.meta.env.VITE_BACKEND_URI),
    tinymce_api_key: String(import.meta.env.VITE_TINYMCE_API_KEY),
    stripePublishableKey: String(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY),

}
export default envVars