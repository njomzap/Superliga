--
-- PostgreSQL database dump
--

\restrict tszgRJLv9ZnPwkN0VnU3l8EOlR4mgtpadEK8EGQLe2hK4mtbU2bWb7pEr9S9IFo

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2026-01-08 20:13:30

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5043 (class 1262 OID 16388)
-- Name: superliga; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE superliga WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE superliga OWNER TO postgres;

\unrestrict tszgRJLv9ZnPwkN0VnU3l8EOlR4mgtpadEK8EGQLe2hK4mtbU2bWb7pEr9S9IFo
\connect superliga
\restrict tszgRJLv9ZnPwkN0VnU3l8EOlR4mgtpadEK8EGQLe2hK4mtbU2bWb7pEr9S9IFo

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 224 (class 1259 OID 24618)
-- Name: admin_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin_logs (
    id integer NOT NULL,
    user_id integer NOT NULL,
    action character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.admin_logs OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24617)
-- Name: admin_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_logs_id_seq OWNER TO postgres;

--
-- TOC entry 5044 (class 0 OID 0)
-- Dependencies: 223
-- Name: admin_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_logs_id_seq OWNED BY public.admin_logs.id;


--
-- TOC entry 222 (class 1259 OID 24599)
-- Name: refresh_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.refresh_tokens (
    id integer NOT NULL,
    user_id integer,
    token text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.refresh_tokens OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24598)
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.refresh_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.refresh_tokens_id_seq OWNER TO postgres;

--
-- TOC entry 5045 (class 0 OID 0)
-- Dependencies: 221
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.refresh_tokens_id_seq OWNED BY public.refresh_tokens.id;


--
-- TOC entry 220 (class 1259 OID 16407)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password text NOT NULL,
    role character varying(20) DEFAULT 'user'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    full_name character varying(100) NOT NULL,
    login_count integer DEFAULT 0,
    logout_count integer DEFAULT 0,
    last_login timestamp without time zone,
    last_logout timestamp without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16406)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5046 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4873 (class 2604 OID 24621)
-- Name: admin_logs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_logs ALTER COLUMN id SET DEFAULT nextval('public.admin_logs_id_seq'::regclass);


--
-- TOC entry 4871 (class 2604 OID 24602)
-- Name: refresh_tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('public.refresh_tokens_id_seq'::regclass);


--
-- TOC entry 4866 (class 2604 OID 16410)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5037 (class 0 OID 24618)
-- Dependencies: 224
-- Data for Name: admin_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.admin_logs VALUES (1, 4, 'login', '2026-01-07 21:34:04.828447');
INSERT INTO public.admin_logs VALUES (2, 4, 'logout', '2026-01-07 21:45:01.244282');
INSERT INTO public.admin_logs VALUES (3, 4, 'login', '2026-01-07 21:59:46.480901');
INSERT INTO public.admin_logs VALUES (4, 4, 'logout', '2026-01-07 22:05:27.618406');
INSERT INTO public.admin_logs VALUES (5, 4, 'login', '2026-01-07 22:05:50.591273');
INSERT INTO public.admin_logs VALUES (6, 4, 'logout', '2026-01-07 22:08:41.037611');
INSERT INTO public.admin_logs VALUES (7, 4, 'login', '2026-01-07 22:09:21.660839');


--
-- TOC entry 5035 (class 0 OID 24599)
-- Dependencies: 222
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.refresh_tokens VALUES (1, 4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzY3ODEwOTk0LCJleHAiOjE3Njg0MTU3OTR9.6jjRS96PtGF0uYv0wqWj2aAV4kJvB0vdL1xLIYmGXGE', '2026-01-07 19:36:34.460788');
INSERT INTO public.refresh_tokens VALUES (2, 4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzY3ODEyOTcyLCJleHAiOjE3Njg0MTc3NzJ9.x4cSnvJ0uFYxk_R5iwFk5b9Xst1ELZfTaVyCVD80Gyo', '2026-01-07 20:09:32.837975');
INSERT INTO public.refresh_tokens VALUES (3, 4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzY3ODEzMTA4LCJleHAiOjE3Njg0MTc5MDh9.4fWVn__pV8oWFP0jSbjNpwBfEMMJvHlQj4k3ZVNBOYE', '2026-01-07 20:11:48.386467');
INSERT INTO public.refresh_tokens VALUES (4, 4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzY3ODE0Mjg3LCJleHAiOjE3Njg0MTkwODd9.ryxuWR6Ju1TNvz6akXNHvOSalDBNdYNQMfW0ueL8r1g', '2026-01-07 20:31:27.916213');
INSERT INTO public.refresh_tokens VALUES (5, 4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzY3ODE0NTE5LCJleHAiOjE3Njg0MTkzMTl9.MFqZWdk0xwjOJkRiXHRJlS-Q7cc5kTIn_fdPaU1r_oM', '2026-01-07 20:35:19.603257');
INSERT INTO public.refresh_tokens VALUES (6, 4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzY3ODE0NjYxLCJleHAiOjE3Njg0MTk0NjF9.PhgKIVfvSOcExmUwionekeEoGAuB4-r_eupop8NKQNk', '2026-01-07 20:37:41.427802');
INSERT INTO public.refresh_tokens VALUES (7, 4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzY3ODE1ODQ1LCJleHAiOjE3Njg0MjA2NDV9.au1ii58V_Fr1EcTb6ndR9r-j8p8qaFqDjQs2cCum1mk', '2026-01-07 20:57:25.003916');
INSERT INTO public.refresh_tokens VALUES (11, 4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzY3ODIwMTYxLCJleHAiOjE3Njg0MjQ5NjF9.0NSAtKbgP04IHCMDZy6nLjloGTumuRKSZmku8IZCwKE', '2026-01-07 22:09:21.664275');


--
-- TOC entry 5033 (class 0 OID 16407)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (1, 'john@test.com', '$2b$10$ismex5DA31JBqEAOCgW.BONYio8tmnLri2Fsw1aoCvbxGfnfVhspe', 'user', '2025-12-30 11:37:28.549301', 'John Doe', 0, 0, NULL, NULL);
INSERT INTO public.users VALUES (2, 'example@gamil.com', '$2b$10$w23rGhpA8hpgCC01Y3wviu06f0.GuWY4Lt.j4UbxnnKvbbFvKgumK', 'user', '2025-12-30 12:12:06.252883', 'Example', 0, 0, NULL, NULL);
INSERT INTO public.users VALUES (3, 'test@gmail.com', '$2b$10$w9kcul3o7x4v9gojanF.LuDCrhX3tHzaMJR.7QkOi7WktkHbghE36', 'user', '2026-01-04 21:59:18.973147', 'testuser', 0, 0, NULL, NULL);
INSERT INTO public.users VALUES (4, 'test@example.com', '$2b$10$dngDN6WVORB1nPUssN3FPeQKXzKyaMzZb9CfoINK8pjQOoqB16XD6', 'user', '2026-01-04 22:19:50.772009', 'Test User', 6, 0, NULL, NULL);


--
-- TOC entry 5047 (class 0 OID 0)
-- Dependencies: 223
-- Name: admin_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_logs_id_seq', 7, true);


--
-- TOC entry 5048 (class 0 OID 0)
-- Dependencies: 221
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.refresh_tokens_id_seq', 11, true);


--
-- TOC entry 5049 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- TOC entry 4882 (class 2606 OID 24627)
-- Name: admin_logs admin_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_logs
    ADD CONSTRAINT admin_logs_pkey PRIMARY KEY (id);


--
-- TOC entry 4880 (class 2606 OID 24609)
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 4876 (class 2606 OID 16421)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4878 (class 2606 OID 16419)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4884 (class 2606 OID 24628)
-- Name: admin_logs admin_logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_logs
    ADD CONSTRAINT admin_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4883 (class 2606 OID 24610)
-- Name: refresh_tokens refresh_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2026-01-08 20:13:30

--
-- PostgreSQL database dump complete
--

\unrestrict tszgRJLv9ZnPwkN0VnU3l8EOlR4mgtpadEK8EGQLe2hK4mtbU2bWb7pEr9S9IFo

