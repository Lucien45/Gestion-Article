import Axios from "./axios"

interface Categorie {
    nom: string;
    description: string;
}

// interface ArticleData {
//     titre: string;
//     description: string;
//     contenu: File | null;
//     couverture: File | null;
//     auteur_id: number | string;
//     categorie_id: number | string;
//     status: string;
// }  
  

/**
 * service for categories
 */
const getAllCategories = () => {
    return Axios.get(`/articles/categories`)
}

const getCategorie = (id: number | string) => {
    return Axios.get(`/articles/categories/${id}`)
}

const deleteCategorie = (id: number | string) => {
    return Axios.delete(`/articles/categories/${id}`);
}

const createCategorie = (data: Categorie): Promise<Categorie> => {
    return Axios.post("/articles/categories", data);
}

const updateCategorie = (id: number | string, data: Partial<Categorie>): Promise<Categorie> => {
    return Axios.put(`/articles/categories/${id}`, data);
}

/**  
 * service for articles
**/
const getAllArticles = () => {
    return Axios.get(`/articles`)
}

const getArticle = (id: number | string) => {
    return Axios.get(`/articles/${id}`)
}

const deleteArticle = (id: number | string) => {
    return Axios.delete(`/articles/${id}`);
}

const createArticle = (data: FormData): Promise<FormData> => {
    return Axios.post("/articles", data,{
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}

const updateArticle = (id: number | string, data: Partial<FormData>): Promise<FormData> => {
    return Axios.put(`/articles/${id}`, data,{
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}

/**
 * service for commentaire
**/
const getAllCommentaires = () => {
    return Axios.get(`/articles/commentaires`)
}

const getCommentaire = (id: number | string) => {
    return Axios.get(`/articles/commentaires/${id}`)
}

const deleteCommentaire = (id: number | string) => {
    return Axios.delete(`/articles/commentaires/${id}`);
}

const createCommentaire = (data: FormData): Promise<FormData> => {
    return Axios.post("/articles/commentaires", data);
}

const updateCommentaire = (id: number | string, data: Partial<FormData>): Promise<FormData> => {
    return Axios.put(`/articles/commentaires/${id}`, data);
}

/**
 * service for historique
**/
const getAllHistoriques = () => {
    return Axios.get(`/articles/historiques`)
}

const getHistorique = (id: number | string) => {
    return Axios.get(`/articles/historiques/${id}`)
}

const deleteHistorique = (id: number | string) => {
    return Axios.delete(`/articles/historiques/${id}`);
}

const createHistorique = (data: FormData): Promise<FormData> => {
    return Axios.post("/articles/historiques", data);
}

const updateHistorique = (id: number | string, data: Partial<FormData>): Promise<FormData> => {
    return Axios.put(`/articles/historiques/${id}`, data);
}

/**
 * service for like
**/
const getAlLikes = () => {
    return Axios.get(`/articles/likes`)
}

const geLike = (id: number | string) => {
    return Axios.get(`/articles/likes/${id}`)
}

const deletLike = (id: number | string) => {
    return Axios.delete(`/articles/likes/${id}`);
}

const createLike = (data: FormData): Promise<FormData> => {
    return Axios.post("/articles/likes", data);
}

const updateLike = (id: number | string, data: Partial<FormData>): Promise<FormData> => {
    return Axios.put(`/articles/likes/${id}`, data);
}

export const ArticleService = {
    getAllCategories, getCategorie, deleteCategorie, createCategorie, updateCategorie,
    getAllArticles, getArticle, deleteArticle, createArticle, updateArticle,
    getAllCommentaires, getCommentaire, deleteCommentaire, createCommentaire, updateCommentaire,
    getAllHistoriques, getHistorique, deleteHistorique, createHistorique, updateHistorique,
    getAlLikes, geLike, deletLike, createLike, updateLike
}
