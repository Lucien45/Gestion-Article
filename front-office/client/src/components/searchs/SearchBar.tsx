import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SearchService } from '../../services/search.service';
import { Article } from '../../types';
import { LoadingArtcile } from '../LoadingSpinner';
import { apiUrl } from '../../services/api';
import { Clock, User } from 'lucide-react';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export const SearchResult: React.FC = () => {
    const [results, setResults] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [datalength, setDatalength] = useState(4);
    const navigate = useNavigate();

    const query = useQuery();
    const q = query.get("q") || "";
    const auteur = query.get("auteur") || "";
    const categorie = query.get("categorie") || "";

    console.log("q: ", q);
    console.log("auteur: ", auteur);
    console.log("categorie: ", categorie);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const res = await SearchService.SearchResults({
                q,
                auteur,
                categorie
            });
            console.log("reponse server result: ", res);
            setDatalength(res.data.length);
            setResults(res.data);
        } catch (err) {
            console.error("Erreur lors de la recherche", err);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        handleSearch();
    }, [q, auteur, categorie]);

    if (!results.length && !loading)
        return (
            <div>
                <div className="max-w-4xl mx-auto px-4 py-8 text-center">
                    <h2 className="text-2xl font-bold text-indigo-600 dark:text-blue-400 mb-2">
                        Aucun article trouvé
                    </h2>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mb-2">
                    {q && (
                        <span className="bg-indigo-100 text-indigo-700 dark:bg-blue-900 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-semibold">
                            Mot-clé : {q}
                        </span>
                    )}
                    {auteur && (
                        <span className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-semibold">
                            Auteur : {auteur}
                        </span>
                    )}
                    {categorie && (
                        <span className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-3 py-1 rounded-full text-sm font-semibold">
                            Catégorie : {categorie}
                        </span>
                    )}
                </div>
                <p className="text-gray-600 mb-6">
                    Essayez d'autres mots-clés ou vérifiez l'orthographe.
                </p>
                <button
                    onClick={() => navigate("/home")}
                    className="bg-indigo-600 hover:bg-indigo-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                >
                    Retour à l'accueil
                </button>
            </div>
        )
    return (
        <div>
            <div className="max-w-4xl mx-auto px-4 py-6">
                <h2 className="text-3xl font-extrabold text-indigo-600 dark:text-blue-400 mb-2 tracking-tight">
                    Résultats pour&nbsp;
                </h2>
                {/* Affichage des filtres actifs */}
                <div className="flex flex-wrap gap-2 mb-2">
                    {q && (
                        <span className="bg-indigo-100 text-indigo-700 dark:bg-blue-900 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-semibold">
                            Mot-clé : {q}
                        </span>
                    )}
                    {auteur && (
                        <span className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-semibold">
                            Auteur : {auteur}
                        </span>
                    )}
                    {categorie && (
                        <span className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-3 py-1 rounded-full text-sm font-semibold">
                            Catégorie : {categorie}
                        </span>
                    )}
                </div>
                <p className="text-gray-500 text-lg mb-4">
                    <span className="font-semibold text-gray-700">{datalength}</span>
                    &nbsp;résultat{datalength > 1 ? "s" : ""} trouvé
                    {datalength > 1 ? "s" : ""}.
                </p>
                <hr className="border-orange-200 mb-4" />
                {/* Affichage des résultats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 px-6">
                    {loading
                        ? Array.from({ length: Math.max(4, datalength, results.length) }).map(
                            (_, idx) => <LoadingArtcile idx={idx} />
                        )
                        : results.map((article) => (
                            <Link to={`/articles/${article.id}`} className="block">
                                <div className="relative overflow-hidden rounded-lg aspect-[16/9]">
                                    <img
                                        src={article?.couverture ? `${apiUrl}/${article.couverture}` : "https://images.unsplash.com/photo-1499750310107-5fef28a66643"}
                                        alt=""
                                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {article.categorie && (
                                        <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                                            {article.categorie.nom}
                                        </span>
                                    )}
                                </div>
                                <div className="mt-4 space-y-2">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                        {article.titre}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{article.description}</p>
                                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center space-x-1">
                                        <User className="h-4 w-4" />
                                        <span>{article.auteur?.username}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{article.reading_time} min</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
