PGDMP      !                |           IUM-TWEBAssignment    16.2    16.2 
    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16402    IUM-TWEBAssignment    DATABASE     �   CREATE DATABASE "IUM-TWEBAssignment" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Italian_Italy.1252';
 $   DROP DATABASE "IUM-TWEBAssignment";
                postgres    false            �            1259    32794    clubs    TABLE     O  CREATE TABLE public.clubs (
    club_id integer NOT NULL,
    club_code character varying(50),
    name character varying(100),
    domestic_competition_id character varying(5),
    total_market_value integer,
    squad_size integer,
    average_age double precision,
    foreigners_number integer,
    foreigners_percentage double precision,
    national_team_players integer,
    stadium_name character varying(100),
    stadium_seats integer,
    net_transfer_record character varying(10),
    coach_name character varying(100),
    last_season integer,
    url character varying(255)
);
    DROP TABLE public.clubs;
       public         heap    postgres    false            �            1259    16460    competitions    TABLE     �  CREATE TABLE public.competitions (
    competition_id character varying(10) NOT NULL,
    competition_code character varying(50),
    name character varying(100),
    sub_type character varying(50),
    type character varying(50),
    country_id integer,
    country_name character varying(100),
    domestic_league_code character varying(10),
    confederation character varying(50),
    url character varying(255)
);
     DROP TABLE public.competitions;
       public         heap    postgres    false            �            1259    16474    players    TABLE     {  CREATE TABLE public.players (
    player_id integer NOT NULL,
    first_name character varying(50),
    last_name character varying(50),
    name character varying(100),
    last_season integer,
    current_club_id integer,
    player_code character varying(50),
    country_of_birth character varying(100),
    city_of_birth character varying(100),
    country_of_citizenship character varying(100),
    date_of_birth date,
    sub_position character varying(50),
    "position" character varying(50),
    foot character varying(50),
    height_in_cm integer,
    market_value_in_eur integer,
    highest_market_value_in_eur integer,
    contract_expiration_date date,
    agent_name character varying(100),
    image_url character varying(255),
    url character varying(255),
    current_club_domestic_competition_id character varying(50),
    current_club_name character varying(100)
);
    DROP TABLE public.players;
       public         heap    postgres    false            Y           2606    32800    clubs clubs_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.clubs
    ADD CONSTRAINT clubs_pkey PRIMARY KEY (club_id);
 :   ALTER TABLE ONLY public.clubs DROP CONSTRAINT clubs_pkey;
       public            postgres    false    217            U           2606    16466    competitions competitions_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.competitions
    ADD CONSTRAINT competitions_pkey PRIMARY KEY (competition_id);
 H   ALTER TABLE ONLY public.competitions DROP CONSTRAINT competitions_pkey;
       public            postgres    false    215            W           2606    16480    players players_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.players
    ADD CONSTRAINT players_pkey PRIMARY KEY (player_id);
 >   ALTER TABLE ONLY public.players DROP CONSTRAINT players_pkey;
       public            postgres    false    216           