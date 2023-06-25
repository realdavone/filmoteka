function debounce(cb, delay = 1000) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            cb(...args);
        }, delay);
    };
}
export default debounce;
//# sourceMappingURL=debounce.js.map