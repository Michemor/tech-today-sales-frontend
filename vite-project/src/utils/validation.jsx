
export const validateInput = (value, type) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/; // E.164 format

    switch (type) {
        case 'email':
            if (!value) return 'Email is required';
            if (!emailRegex.test(value)) return 'Invalid email format'; 
           return '';
        case 'phone':
            if (!value) return 'Phone number is required';
            if (!phoneRegex.test(value)) return 'Invalid phone number format';
            return '';
        case 'number':
            if (!value) return 'Number is required';
            return !isNaN(value) && value > 0 ? '' : 'Value must be a positive number';
        default:
            return '';
    }

}