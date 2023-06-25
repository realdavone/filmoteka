const baseTitle = ' — Filmotéka';
export default function ({ title, includeBase = true }) {
    document.title = `${title}${includeBase && baseTitle}`;
}
//# sourceMappingURL=title.js.map