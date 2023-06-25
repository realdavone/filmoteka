function font(el, binding) {
    let size;
    switch (binding.arg) {
        case 'small':
            size = 1.2;
            break;
        case 'medium':
            size = 1.6;
            break;
        case 'large':
            size = 2.4;
            break;
        default:
            size = 1.6;
    }
    el.style.fontSize = `${size}rem`;
}
export default font;
//# sourceMappingURL=font.js.map