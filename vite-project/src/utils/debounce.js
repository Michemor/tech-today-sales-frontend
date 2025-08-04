// Debounce utility to improve performance for frequent events like hover
export const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
};

// Throttle utility to limit the number of function calls
export const throttle = (func, delay) => {
    let isThrottled = false;
    return (...args) => {
        if (!isThrottled) {
            func.apply(null, args);
            isThrottled = true;
            setTimeout(() => {
                isThrottled = false;
            }, delay);
        }
    };
};
