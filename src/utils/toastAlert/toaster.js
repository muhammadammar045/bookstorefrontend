// services/toastService.js
import { toast } from 'react-toastify';

const showToast = (type, message) => {
    switch (type) {
        case 'success':
            toast.success(message);
            break;
        case 'error':
            toast.error(message);
            break;
        case 'info':
            toast.info(message);
            break;
        default:
            toast(message);
    }
};

export default showToast;
