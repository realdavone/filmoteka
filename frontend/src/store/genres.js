import { defineStore } from 'pinia';
import makeRequest from '../api/main';
export const useGenresStore = defineStore('genresStore', () => {
    const genres = {
        movie: new Map(),
        tv: new Map()
    };
    async function setGenre(type) {
        const data = await makeRequest({ endpoint: `/resources/genre/${type}` });
        const genres = new Map();
        for (let genre of data.genres) {
            genres.set(genre.id, genre.name);
        }
        return genres;
    }
    (async () => {
        genres.movie = await setGenre('movie');
        genres.tv = await setGenre('tv');
    })();
    return {
        genres
    };
});
//# sourceMappingURL=genres.js.map