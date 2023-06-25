const focus = {
    mounted(el, binding) {
        if (binding.value) {
            el.addEventListener('focusout', () => binding.value(false));
            el.addEventListener('focus', () => binding.value(true));
        }
        el.focus();
    },
    unmounted(el, binding) {
        if (binding.value) {
            el.removeEventListener('focusout', () => binding.value(false));
            el.removeEventListener('focus', () => binding.value(true));
        }
    }
};
export default focus;
//# sourceMappingURL=focus.js.map