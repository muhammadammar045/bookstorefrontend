// services/toastService.js
import { toast } from 'react-toastify';

const showToast = (type, message) => {
    switch (type) {
        case 'success':
            toast.success(message, { position: "top-right" });
            break;
        case 'error':
            toast.error(message, { position: "top-right" });
            break;
        case 'info':
            toast.info(message, { position: "top-right" });
            break;
        default:
            toast(message, { position: "top-right" });
    }
};

export default showToast;
