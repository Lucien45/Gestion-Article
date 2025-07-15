import Axios from "./axios"

interface SearchParams {
    q: string;
    categorie?: string;
    auteur?: string;
}

const Suggestions = (query: string) => {
    return Axios.get(`/search/suggestions`, {
        params: { q: query }
    });
};

const SearchResults = (params: SearchParams) => {
    return Axios.get(`/search/results`, {
        params
    });
};

export const SearchService = {
    Suggestions,
    SearchResults
};
