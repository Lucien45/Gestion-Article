import { Token } from "../utils/Token";
import Axios from "./axios"

const token = Token.GetToken('authUser');

/**
 * service for users
 */
const searchCategorie = (text: string) => {
    return Axios.get(`/search/categorie`, {
        params: { q: text},
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

const searchArticle = (text: string, mode: string) => {
    return Axios.get(`/search/article`, {
        params: { 
            q: text,
            m: mode
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

const searchUser = (text: string, mode: string) => {
    return Axios.get(`/search/user`, {
        params: { 
            q: text,
            m: mode
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export const SearchService = {
    searchCategorie,
    searchArticle,
    searchUser
}