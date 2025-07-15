--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9 (Debian 16.9-1.pgdg120+1)
-- Dumped by pg_dump version 16.9 (Ubuntu 16.9-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: article_db_n8al_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO article_db_n8al_user;

--
-- Name: article_status_enum; Type: TYPE; Schema: public; Owner: article_db_n8al_user
--

CREATE TYPE public.article_status_enum AS ENUM (
    'brouillon',
    'publié',
    'archivé'
);


ALTER TYPE public.article_status_enum OWNER TO article_db_n8al_user;

--
-- Name: commentaire_status_enum; Type: TYPE; Schema: public; Owner: article_db_n8al_user
--

CREATE TYPE public.commentaire_status_enum AS ENUM (
    'approuve',
    'en attente',
    'rejete'
);


ALTER TYPE public.commentaire_status_enum OWNER TO article_db_n8al_user;

--
-- Name: users_role_enum; Type: TYPE; Schema: public; Owner: article_db_n8al_user
--

CREATE TYPE public.users_role_enum AS ENUM (
    'admin',
    'editeur',
    'auteur',
    'autre'
);


ALTER TYPE public.users_role_enum OWNER TO article_db_n8al_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: article; Type: TABLE; Schema: public; Owner: article_db_n8al_user
--

CREATE TABLE public.article (
    id integer NOT NULL,
    titre character varying NOT NULL,
    contenu character varying,
    description character varying NOT NULL,
    couverture character varying,
    date_publication timestamp without time zone DEFAULT now() NOT NULL,
    status public.article_status_enum DEFAULT 'brouillon'::public.article_status_enum NOT NULL,
    vue integer DEFAULT 0 NOT NULL,
    featured boolean DEFAULT false NOT NULL,
    reading_time integer DEFAULT 0 NOT NULL,
    auteur_id integer,
    categorie_id integer
);


ALTER TABLE public.article OWNER TO article_db_n8al_user;

--
-- Name: article_id_seq; Type: SEQUENCE; Schema: public; Owner: article_db_n8al_user
--

CREATE SEQUENCE public.article_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.article_id_seq OWNER TO article_db_n8al_user;

--
-- Name: article_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: article_db_n8al_user
--

ALTER SEQUENCE public.article_id_seq OWNED BY public.article.id;


--
-- Name: categorie; Type: TABLE; Schema: public; Owner: article_db_n8al_user
--

CREATE TABLE public.categorie (
    id integer NOT NULL,
    nom character varying NOT NULL,
    description text
);


ALTER TABLE public.categorie OWNER TO article_db_n8al_user;

--
-- Name: categorie_id_seq; Type: SEQUENCE; Schema: public; Owner: article_db_n8al_user
--

CREATE SEQUENCE public.categorie_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categorie_id_seq OWNER TO article_db_n8al_user;

--
-- Name: categorie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: article_db_n8al_user
--

ALTER SEQUENCE public.categorie_id_seq OWNED BY public.categorie.id;


--
-- Name: commentaire; Type: TABLE; Schema: public; Owner: article_db_n8al_user
--

CREATE TABLE public.commentaire (
    id integer NOT NULL,
    contenu text NOT NULL,
    status public.commentaire_status_enum DEFAULT 'en attente'::public.commentaire_status_enum NOT NULL,
    date_commantaire timestamp without time zone DEFAULT now() NOT NULL,
    user_id integer,
    article_id integer
);


ALTER TABLE public.commentaire OWNER TO article_db_n8al_user;

--
-- Name: commentaire_id_seq; Type: SEQUENCE; Schema: public; Owner: article_db_n8al_user
--

CREATE SEQUENCE public.commentaire_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.commentaire_id_seq OWNER TO article_db_n8al_user;

--
-- Name: commentaire_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: article_db_n8al_user
--

ALTER SEQUENCE public.commentaire_id_seq OWNED BY public.commentaire.id;


--
-- Name: historique; Type: TABLE; Schema: public; Owner: article_db_n8al_user
--

CREATE TABLE public.historique (
    id integer NOT NULL,
    action character varying,
    date_action timestamp without time zone DEFAULT now() NOT NULL,
    user_id integer
);


ALTER TABLE public.historique OWNER TO article_db_n8al_user;

--
-- Name: historique_id_seq; Type: SEQUENCE; Schema: public; Owner: article_db_n8al_user
--

CREATE SEQUENCE public.historique_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.historique_id_seq OWNER TO article_db_n8al_user;

--
-- Name: historique_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: article_db_n8al_user
--

ALTER SEQUENCE public.historique_id_seq OWNED BY public.historique.id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: article_db_n8al_user
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    date_like timestamp without time zone DEFAULT now() NOT NULL,
    user_id integer,
    article_id integer
);


ALTER TABLE public.likes OWNER TO article_db_n8al_user;

--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: article_db_n8al_user
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.likes_id_seq OWNER TO article_db_n8al_user;

--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: article_db_n8al_user
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- Name: logs; Type: TABLE; Schema: public; Owner: article_db_n8al_user
--

CREATE TABLE public.logs (
    id integer NOT NULL,
    action character varying NOT NULL,
    date timestamp without time zone DEFAULT now() NOT NULL,
    user_id integer
);


ALTER TABLE public.logs OWNER TO article_db_n8al_user;

--
-- Name: logs_id_seq; Type: SEQUENCE; Schema: public; Owner: article_db_n8al_user
--

CREATE SEQUENCE public.logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.logs_id_seq OWNER TO article_db_n8al_user;

--
-- Name: logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: article_db_n8al_user
--

ALTER SEQUENCE public.logs_id_seq OWNED BY public.logs.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: article_db_n8al_user
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying,
    password character varying NOT NULL,
    username character varying,
    nom character varying,
    prenom character varying,
    civilite character varying,
    telephone character varying,
    date_naissance date,
    profile character varying,
    role public.users_role_enum DEFAULT 'autre'::public.users_role_enum NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    date_creation timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "lastLogin" timestamp without time zone
);


ALTER TABLE public.users OWNER TO article_db_n8al_user;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: article_db_n8al_user
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO article_db_n8al_user;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: article_db_n8al_user
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: article id; Type: DEFAULT; Schema: public; Owner: article_db_n8al_user
--

ALTER TABLE ONLY public.article ALTER COLUMN id SET DEFAULT nextval('public.article_id_seq'::regclass);


--
-- Name: categorie id; Type: DEFAULT; Schema: public; Owner: article_db_n8al_user
--

ALTER TABLE ONLY public.categorie ALTER COLUMN id SET DEFAULT nextval('public.categorie_id_seq'::regclass);


--
-- Name: commentaire id; Type: DEFAULT; Schema: public; Owner: article_db_n8al_user
--

ALTER TABLE ONLY public.commentaire ALTER COLUMN id SET DEFAULT nextval('public.commentaire_id_seq'::regclass);


--
-- Name: historique id; Type: DEFAULT; Schema: public; Owner: article_db_n8al_user
--

ALTER TABLE ONLY public.historique ALTER COLUMN id SET DEFAULT nextval('public.historique_id_seq'::regclass);


--
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: article_db_n8al_user
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- Name: logs id; Type: DEFAULT; Schema: public; Owner: article_db_n8al_user
--

ALTER TABLE ONLY public.logs ALTER COLUMN id SET DEFAULT nextval('public.logs_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: article_db_n8al_user
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: article; Type: TABLE DATA; Schema: public; Owner: article_db_n8al_user
--

COPY public.article (id, titre, contenu, description, couverture, date_publication, status, vue, featured, reading_time, auteur_id, categorie_id) FROM stdin;
1	Introduction to React JS	media/livre/files-1750674971272-579179872.jpg	bibliothèque JavaScript déclarative	media/couverture/files-1750674971272-579179872.jpg	2025-06-18 12:58:46.55535	publié	0	f	45	1	1
4	The Future of AI	media/livre/files-1750683333690-373611586.jpeg	A deep dive into artificial intelligence	media/couverture/files-1750683333690-373611586.jpeg	2025-06-23 12:53:22.790464	publié	0	t	120	3	1
3	Optimising performance in React  apps	media/livre/files-1750683421951-278077197.jpg	App performance is a critical aspect of app development	media/couverture/files-1750683421951-278077197.jpg	2025-06-23 12:53:22.762046	publié	0	t	80	3	2
5	Sentiment des jeunes 	media/livre/files-1751305505774-489174622.pdf	Sentiment des jeunes d'aujpurd'hui	media/couverture/files-1751305505810-720644183.jpeg	2025-06-30 17:45:09.126553	publié	0	t	100	2	7
2	Typescript	media/livre/files-1750683291275-246119794.jpeg	typescript les notions fondamentales	media/couverture/files-1750683291275-246119794.jpeg	2025-06-23 12:53:22.759357	publié	0	f	70	2	2
\.


--
-- Data for Name: categorie; Type: TABLE DATA; Schema: public; Owner: article_db_n8al_user
--

COPY public.categorie (id, nom, description) FROM stdin;
1	Informatique	Les language de programmation en informatique
2	Health	Health and wellness tips
3	Technologie	All about the latest technology trends
4	Sports	Latest sports updates
5	Manga	animation 
6	Histoire	Les historiques
7	Documentaire	Les documentations
9	Film	film dans touts les genres
\.


--
-- Data for Name: commentaire; Type: TABLE DATA; Schema: public; Owner: article_db_n8al_user
--

COPY public.commentaire (id, contenu, status, date_commantaire, user_id, article_id) FROM stdin;
1	L'IA est l'avenir du monde de l'informatique	en attente	2025-06-25 17:37:29.570764	5	4
2	moi je trouve que c'est très inspirant cet article 	en attente	2025-07-10 10:51:58.430674	5	5
3	et puis l'article parle des jeunes d’aujourd’hui...	en attente	2025-07-10 10:58:13.974412	5	5
4	L'IA c'est tout pour l'avenir	en attente	2025-07-10 11:07:24.202626	5	4
\.


--
-- Data for Name: historique; Type: TABLE DATA; Schema: public; Owner: article_db_n8al_user
--

COPY public.historique (id, action, date_action, user_id) FROM stdin;
\.


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: article_db_n8al_user
--

COPY public.likes (id, date_like, user_id, article_id) FROM stdin;
\.


--
-- Data for Name: logs; Type: TABLE DATA; Schema: public; Owner: article_db_n8al_user
--

COPY public.logs (id, action, date, user_id) FROM stdin;
1	création compte	2025-06-28 20:13:54.329366	3
2	création compte	2025-06-28 20:28:55.152035	8
3	connexion	2025-06-28 20:29:58.890688	8
4	ajout categorie	2025-06-28 20:39:20.717591	8
5	modification categorie	2025-06-28 20:40:16.976815	8
6	suppression categorie	2025-06-28 20:40:55.832976	1
7	connexion	2025-06-30 13:28:34.005026	1
8	connexion	2025-06-30 17:34:46.699191	2
9	création article	2025-06-30 17:45:10.353867	2
10	modification article	2025-06-30 17:52:55.065683	2
11	connexion	2025-07-06 07:56:11.83906	1
12	connexion	2025-07-06 07:58:45.124868	2
13	connexion	2025-07-06 13:28:09.113359	1
14	connexion	2025-07-06 13:28:09.287582	1
15	connexion	2025-07-06 17:25:54.29788	1
16	déconnexion	2025-07-06 17:27:33.023788	1
17	connexion	2025-07-07 10:31:47.439239	1
18	connexion	2025-07-10 08:01:14.71932	1
19	connexion	2025-07-15 16:49:48.898614	1
20	connexion	2025-07-15 16:50:58.028006	1
21	connexion	2025-07-15 16:57:34.084651	2
22	déconnexion	2025-07-15 16:58:32.440926	2
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: article_db_n8al_user
--

COPY public.users (id, email, password, username, nom, prenom, civilite, telephone, date_naissance, profile, role, is_active, date_creation, "updatedAt", "lastLogin") FROM stdin;
8	staff@gmail.com	$2b$10$c1WXH2LiyLIVx73m11tsbu983kkPJg/.jt7RG3Ji3KlVvMqdUu4bq	staff	\N	\N	\N	\N	\N	media/profiles/profile-1751739559130-326775300.webp	auteur	t	2025-06-28 23:28:53.713	2025-07-06 08:03:02.343435	2025-07-06 11:03:01.679
3	editeur@gmail.com	$2b$10$tcilxy2Lifgy/hJNQjLcweio3YKnejYVOTgxvsCAyMWO4sCHl9HCu	Pablo	\N	\N	masculin	\N	\N	\N	editeur	t	2025-06-23 12:26:21.577285	2025-06-23 12:26:21.577285	\N
4	lucas@gmail.com	$2b$10$wkyH.Vb6OCGRZEaARffb2.BFG/im7CFXthK.43ZjA95hwmiAr7dNC	Lucas	\N	\N	masculin	\N	\N	\N	editeur	t	2025-06-23 12:29:43.780754	2025-06-23 12:29:43.780754	\N
5	doe@gmail.com	$2b$10$lXnt44cN1wSyaAUuaJQtaurM.jnCSQS8QVa7fDooyHzH0Mg.OY.y.	John	\N	\N	masculin	\N	\N	media/profiles/profile-1750872840494-713171850.jpg	autre	t	2025-06-23 12:29:43.780754	2025-07-10 10:49:02.934075	2025-07-10 13:49:02.304
1	admin@gmail.com	$2b$10$VMlxp/i5lQEXqtXH6Pzzc.jsESDZOVDbnGFjiczKKZ7hFkhoUBboq	ADMIN	Administratreur	\N	masculin	\N	2002-09-26	media/profiles/profile-1750867721928-828100715.jpg	admin	t	2025-06-16 21:55:31.056	2025-07-15 16:50:56.782176	2025-07-15 19:50:56.206
2	savakalucien@gmail.com	$2b$10$lrtoUAKRdXZi3AQ8fv8SA.IbijMYRGOJ4f/VKVjHc5Ssw8HBt1jaO	Lucien	Lucien	Savaka	masculin	\N	2000-01-01	media/profiles/profile-1750101273709-739005030.jpg	editeur	t	2025-06-16 19:14:34.915	2025-07-15 16:57:32.678255	2025-07-15 19:57:32.061
\.


--
-- Name: article_id_seq; Type: SEQUENCE SET; Schema: public; Owner: article_db_n8al_user
--

SELECT pg_catalog.setval('public.article_id_seq', 5, true);


--
-- Name: categorie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: article_db_n8al_user
--

SELECT pg_catalog.setval('public.categorie_id_seq', 9, true);


--
-- Name: commentaire_id_seq; Type: SEQUENCE SET; Schema: public; Owner: article_db_n8al_user
--

SELECT pg_catalog.setval('public.commentaire_id_seq', 4, true);


--
-- Name: historique_id_seq; Type: SEQUENCE SET; Schema: public; Owner: article_db_n8al_user
--

SELECT pg_catalog.setval('public.historique_id_seq', 1, false);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: article_db_n8al_user
--

SELECT pg_catalog.setval('public.likes_id_seq', 1, false);


--
-- Name: logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: article_db_n8al_user
--

SELECT pg_catalog.setval('public.logs_id_seq', 22, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: article_db_n8al_user
--

SELECT pg_catalog.setval('public.users_id_seq', 8, true);


--
-- Name: article PK_40808690eb7b915046558c0f81b; Type: CONSTRAINT; Schema: public; Owner: article_db_n8al_user
--

ALTER TABLE ONLY public.article
    ADD CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY (id);


--
-- Name: historique PK_a3f568c26777290a99254aeb607; Type: CONSTRAINT; Schema: public; Owner: article_db_n8al_user
--

ALTER TABLE ONLY public.historique
    ADD CONSTRAINT "PK_a3f568c26777290a99254aeb607" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: article_db_n8al_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: commentaire PK_a4fa195414f3428179d40988716; Type: CONSTRAINT; Schema: public; Owner: article_db_n8al_user
--

ALTER TABLE ONLY public.commentaire
    ADD CONSTRAINT "PK_a4fa195414f3428179d40988716" PRIMARY KEY (id);


--
-- Name: categorie PK_a761331f20634c53bf660312062; Type: CONSTRAINT; Schema: public; Owner: article_db_n8al_user
--

ALTER TABLE ONLY public.categorie
    ADD CONSTRAINT "PK_a761331f20634c53bf660312062" PRIMARY KEY (id);


--
-- Name: likes PK_a9323de3f8bced7539a794b4a37; Type: CONSTRAINT; Schema: public; Owner: article_db_n8al_user
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY (id);


--
-- Name: logs PK_fb1b805f2f7795de79fa69340ba; Type: CONSTRAINT; Schema: public; Owner: article_db_n8al_user
--

ALTER TABLE ONLY public.logs
    ADD CONSTRAINT "PK_fb1b805f2f7795de79fa69340ba" PRIMARY KEY (id);


--
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: article_db_n8al_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- Name: categorie UQ_e27c99f0289647ed290b49d17a2; Type: CONSTRAINT; Schema: public; Owner: article_db_n8al_user
--

ALTER TABLE ONLY public.categorie
    ADD CONSTRAINT "UQ_e27c99f0289647ed290b49d17a2" UNIQUE (nom);


--
-- Name: likes FK_0deaa79a910af56b33472c90ee0; Type: FK CONSTRAINT; Schema: public; Owner: article_db_n8al_user
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "FK_0deaa79a910af56b33472c90ee0" FOREIGN KEY (article_id) REFERENCES public.article(id) ON DELETE CASCADE;


--
-- Name: article FK_115bb330eb4250fa89ee1578e37; Type: FK CONSTRAINT; Schema: public; Owner: article_db_n8al_user
--

ALTER TABLE ONLY public.article
    ADD CONSTRAINT "FK_115bb330eb4250fa89ee1578e37" FOREIGN KEY (categorie_id) REFERENCES public.categorie(id);


--
-- Name: commentaire FK_118b592ab14cf2b5dfd74097d85; Type: FK CONSTRAINT; Schema: public; Owner: article_db_n8al_user
--

ALTER TABLE ONLY public.commentaire
    ADD CONSTRAINT "FK_118b592ab14cf2b5dfd74097d85" FOREIGN KEY (article_id) REFERENCES public.article(id);


--
-- Name: likes FK_3f519ed95f775c781a254089171; Type: FK CONSTRAINT; Schema: public; Owner: article_db_n8al_user
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "FK_3f519ed95f775c781a254089171" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: article FK_6bfd8b1eb4c52d8480a75c7e6fc; Type: FK CONSTRAINT; Schema: public; Owner: article_db_n8al_user
--

ALTER TABLE ONLY public.article
    ADD CONSTRAINT "FK_6bfd8b1eb4c52d8480a75c7e6fc" FOREIGN KEY (auteur_id) REFERENCES public.users(id);


--
-- Name: logs FK_70c2c3d40d9f661ac502de51349; Type: FK CONSTRAINT; Schema: public; Owner: article_db_n8al_user
--

ALTER TABLE ONLY public.logs
    ADD CONSTRAINT "FK_70c2c3d40d9f661ac502de51349" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: historique FK_df3736ef4dd9f637b8d90ffe988; Type: FK CONSTRAINT; Schema: public; Owner: article_db_n8al_user
--

ALTER TABLE ONLY public.historique
    ADD CONSTRAINT "FK_df3736ef4dd9f637b8d90ffe988" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: commentaire FK_f1ac9d3e6dff98db6ab5b6f7690; Type: FK CONSTRAINT; Schema: public; Owner: article_db_n8al_user
--

ALTER TABLE ONLY public.commentaire
    ADD CONSTRAINT "FK_f1ac9d3e6dff98db6ab5b6f7690" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES TO article_db_n8al_user;


--
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES TO article_db_n8al_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS TO article_db_n8al_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO article_db_n8al_user;


--
-- PostgreSQL database dump complete
--

