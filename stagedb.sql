PGDMP                      |            stagedb    16.2    16.2 R    "           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            #           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            $           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            %           1262    16396    stagedb    DATABASE     {   CREATE DATABASE stagedb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Europe.1252';
    DROP DATABASE stagedb;
                postgres    false                        3079    16522 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            &           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �            1259    16610    admin    TABLE     �   CREATE TABLE public.admin (
    idemp uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nom_utilisateur character varying(255) NOT NULL,
    motpasse character varying(255) NOT NULL
);
    DROP TABLE public.admin;
       public         heap    postgres    false    2            �            1259    16650    affectation    TABLE     �   CREATE TABLE public.affectation (
    num_affectation bigint NOT NULL,
    num_inventaire bigint NOT NULL,
    sn character varying(255),
    modele character varying(255),
    id_type bigint,
    id_agent uuid,
    dateaffectation date
);
    DROP TABLE public.affectation;
       public         heap    postgres    false            �            1259    16649    affectation_num_affectation_seq    SEQUENCE     �   CREATE SEQUENCE public.affectation_num_affectation_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.affectation_num_affectation_seq;
       public          postgres    false    231            '           0    0    affectation_num_affectation_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.affectation_num_affectation_seq OWNED BY public.affectation.num_affectation;
          public          postgres    false    230            �            1259    16587    agents    TABLE     *  CREATE TABLE public.agents (
    id_agent uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nom character varying(255) NOT NULL,
    prenom character varying(255) NOT NULL,
    fonction character varying(255) NOT NULL,
    id_sousdirection bigint,
    id_service bigint,
    id_bureau bigint
);
    DROP TABLE public.agents;
       public         heap    postgres    false    2            �            1259    16626    bureaux    TABLE     b   CREATE TABLE public.bureaux (
    id_bureau bigint NOT NULL,
    bureau character varying(255)
);
    DROP TABLE public.bureaux;
       public         heap    postgres    false            �            1259    16625    bureaux_id_bureau_seq    SEQUENCE     ~   CREATE SEQUENCE public.bureaux_id_bureau_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.bureaux_id_bureau_seq;
       public          postgres    false    227            (           0    0    bureaux_id_bureau_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.bureaux_id_bureau_seq OWNED BY public.bureaux.id_bureau;
          public          postgres    false    226            �            1259    16576 
   equipement    TABLE       CREATE TABLE public.equipement (
    num_inventaire bigint NOT NULL,
    modele character varying(255) NOT NULL,
    id_type bigint,
    dateaquisition date,
    dateaffectation date,
    id_agent uuid,
    sn character varying(255),
    valeur real,
    id_etat bigint
);
    DROP TABLE public.equipement;
       public         heap    postgres    false            �            1259    16575    equipement_num_lot_seq    SEQUENCE        CREATE SEQUENCE public.equipement_num_lot_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.equipement_num_lot_seq;
       public          postgres    false    223            )           0    0    equipement_num_lot_seq    SEQUENCE OWNED BY     X   ALTER SEQUENCE public.equipement_num_lot_seq OWNED BY public.equipement.num_inventaire;
          public          postgres    false    222            �            1259    16633    etats    TABLE     \   CREATE TABLE public.etats (
    id_etat bigint NOT NULL,
    etat character varying(255)
);
    DROP TABLE public.etats;
       public         heap    postgres    false            �            1259    16632    etats_id_etat_seq    SEQUENCE     z   CREATE SEQUENCE public.etats_id_etat_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.etats_id_etat_seq;
       public          postgres    false    229            *           0    0    etats_id_etat_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.etats_id_etat_seq OWNED BY public.etats.id_etat;
          public          postgres    false    228            �            1259    16660    maintenance    TABLE     �   CREATE TABLE public.maintenance (
    id_maintenance bigint NOT NULL,
    num_inventaire bigint NOT NULL,
    datedebut date,
    datefin date
);
    DROP TABLE public.maintenance;
       public         heap    postgres    false            �            1259    16659    maintenance_id_maintenance_seq    SEQUENCE     �   CREATE SEQUENCE public.maintenance_id_maintenance_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.maintenance_id_maintenance_seq;
       public          postgres    false    233            +           0    0    maintenance_id_maintenance_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.maintenance_id_maintenance_seq OWNED BY public.maintenance.id_maintenance;
          public          postgres    false    232            �            1259    16672    reformes    TABLE       CREATE TABLE public.reformes (
    num_reforme bigint NOT NULL,
    modele character varying(255),
    id_type bigint,
    sn character varying(255),
    dateaquisition date,
    datereforme date,
    etat character varying(255),
    num_inventaire bigint
);
    DROP TABLE public.reformes;
       public         heap    postgres    false            �            1259    16671    reformes_num_reforme_seq    SEQUENCE     �   CREATE SEQUENCE public.reformes_num_reforme_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.reformes_num_reforme_seq;
       public          postgres    false    235            ,           0    0    reformes_num_reforme_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.reformes_num_reforme_seq OWNED BY public.reformes.num_reforme;
          public          postgres    false    234            �            1259    16557    services    TABLE     �   CREATE TABLE public.services (
    id_service bigint NOT NULL,
    id_sousdirection bigint,
    service character varying(255) NOT NULL
);
    DROP TABLE public.services;
       public         heap    postgres    false            �            1259    16556    service_id_service_seq    SEQUENCE        CREATE SEQUENCE public.service_id_service_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.service_id_service_seq;
       public          postgres    false    219            -           0    0    service_id_service_seq    SEQUENCE OWNED BY     R   ALTER SEQUENCE public.service_id_service_seq OWNED BY public.services.id_service;
          public          postgres    false    218            �            1259    16550    sousdirections    TABLE     �   CREATE TABLE public.sousdirections (
    id_sousdirection bigint NOT NULL,
    sousdirection character varying(255) NOT NULL
);
 "   DROP TABLE public.sousdirections;
       public         heap    postgres    false            �            1259    16549 "   sousdirection_id_sousdirection_seq    SEQUENCE     �   CREATE SEQUENCE public.sousdirection_id_sousdirection_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.sousdirection_id_sousdirection_seq;
       public          postgres    false    217            .           0    0 "   sousdirection_id_sousdirection_seq    SEQUENCE OWNED BY     j   ALTER SEQUENCE public.sousdirection_id_sousdirection_seq OWNED BY public.sousdirections.id_sousdirection;
          public          postgres    false    216            �            1259    16569    types    TABLE     e   CREATE TABLE public.types (
    id_type bigint NOT NULL,
    type character varying(255) NOT NULL
);
    DROP TABLE public.types;
       public         heap    postgres    false            �            1259    16568    type_id_type_seq    SEQUENCE     y   CREATE SEQUENCE public.type_id_type_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.type_id_type_seq;
       public          postgres    false    221            /           0    0    type_id_type_seq    SEQUENCE OWNED BY     F   ALTER SEQUENCE public.type_id_type_seq OWNED BY public.types.id_type;
          public          postgres    false    220            ]           2604    16653    affectation num_affectation    DEFAULT     �   ALTER TABLE ONLY public.affectation ALTER COLUMN num_affectation SET DEFAULT nextval('public.affectation_num_affectation_seq'::regclass);
 J   ALTER TABLE public.affectation ALTER COLUMN num_affectation DROP DEFAULT;
       public          postgres    false    230    231    231            [           2604    16629    bureaux id_bureau    DEFAULT     v   ALTER TABLE ONLY public.bureaux ALTER COLUMN id_bureau SET DEFAULT nextval('public.bureaux_id_bureau_seq'::regclass);
 @   ALTER TABLE public.bureaux ALTER COLUMN id_bureau DROP DEFAULT;
       public          postgres    false    227    226    227            X           2604    16579    equipement num_inventaire    DEFAULT        ALTER TABLE ONLY public.equipement ALTER COLUMN num_inventaire SET DEFAULT nextval('public.equipement_num_lot_seq'::regclass);
 H   ALTER TABLE public.equipement ALTER COLUMN num_inventaire DROP DEFAULT;
       public          postgres    false    222    223    223            \           2604    16636    etats id_etat    DEFAULT     n   ALTER TABLE ONLY public.etats ALTER COLUMN id_etat SET DEFAULT nextval('public.etats_id_etat_seq'::regclass);
 <   ALTER TABLE public.etats ALTER COLUMN id_etat DROP DEFAULT;
       public          postgres    false    229    228    229            ^           2604    16663    maintenance id_maintenance    DEFAULT     �   ALTER TABLE ONLY public.maintenance ALTER COLUMN id_maintenance SET DEFAULT nextval('public.maintenance_id_maintenance_seq'::regclass);
 I   ALTER TABLE public.maintenance ALTER COLUMN id_maintenance DROP DEFAULT;
       public          postgres    false    232    233    233            _           2604    16675    reformes num_reforme    DEFAULT     |   ALTER TABLE ONLY public.reformes ALTER COLUMN num_reforme SET DEFAULT nextval('public.reformes_num_reforme_seq'::regclass);
 C   ALTER TABLE public.reformes ALTER COLUMN num_reforme DROP DEFAULT;
       public          postgres    false    235    234    235            V           2604    16560    services id_service    DEFAULT     y   ALTER TABLE ONLY public.services ALTER COLUMN id_service SET DEFAULT nextval('public.service_id_service_seq'::regclass);
 B   ALTER TABLE public.services ALTER COLUMN id_service DROP DEFAULT;
       public          postgres    false    218    219    219            U           2604    16553    sousdirections id_sousdirection    DEFAULT     �   ALTER TABLE ONLY public.sousdirections ALTER COLUMN id_sousdirection SET DEFAULT nextval('public.sousdirection_id_sousdirection_seq'::regclass);
 N   ALTER TABLE public.sousdirections ALTER COLUMN id_sousdirection DROP DEFAULT;
       public          postgres    false    217    216    217            W           2604    16572    types id_type    DEFAULT     m   ALTER TABLE ONLY public.types ALTER COLUMN id_type SET DEFAULT nextval('public.type_id_type_seq'::regclass);
 <   ALTER TABLE public.types ALTER COLUMN id_type DROP DEFAULT;
       public          postgres    false    220    221    221                      0    16610    admin 
   TABLE DATA           A   COPY public.admin (idemp, nom_utilisateur, motpasse) FROM stdin;
    public          postgres    false    225   �^                 0    16650    affectation 
   TABLE DATA           v   COPY public.affectation (num_affectation, num_inventaire, sn, modele, id_type, id_agent, dateaffectation) FROM stdin;
    public          postgres    false    231   Y_                 0    16587    agents 
   TABLE DATA           j   COPY public.agents (id_agent, nom, prenom, fonction, id_sousdirection, id_service, id_bureau) FROM stdin;
    public          postgres    false    224   �_                 0    16626    bureaux 
   TABLE DATA           4   COPY public.bureaux (id_bureau, bureau) FROM stdin;
    public          postgres    false    227    a                 0    16576 
   equipement 
   TABLE DATA           �   COPY public.equipement (num_inventaire, modele, id_type, dateaquisition, dateaffectation, id_agent, sn, valeur, id_etat) FROM stdin;
    public          postgres    false    223   Qa                 0    16633    etats 
   TABLE DATA           .   COPY public.etats (id_etat, etat) FROM stdin;
    public          postgres    false    229    b                 0    16660    maintenance 
   TABLE DATA           Y   COPY public.maintenance (id_maintenance, num_inventaire, datedebut, datefin) FROM stdin;
    public          postgres    false    233   Zb                 0    16672    reformes 
   TABLE DATA           w   COPY public.reformes (num_reforme, modele, id_type, sn, dateaquisition, datereforme, etat, num_inventaire) FROM stdin;
    public          postgres    false    235   �b                 0    16557    services 
   TABLE DATA           I   COPY public.services (id_service, id_sousdirection, service) FROM stdin;
    public          postgres    false    219   hc                 0    16550    sousdirections 
   TABLE DATA           I   COPY public.sousdirections (id_sousdirection, sousdirection) FROM stdin;
    public          postgres    false    217   �d                 0    16569    types 
   TABLE DATA           .   COPY public.types (id_type, type) FROM stdin;
    public          postgres    false    221   �d       0           0    0    affectation_num_affectation_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.affectation_num_affectation_seq', 11, true);
          public          postgres    false    230            1           0    0    bureaux_id_bureau_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.bureaux_id_bureau_seq', 15, true);
          public          postgres    false    226            2           0    0    equipement_num_lot_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.equipement_num_lot_seq', 39, true);
          public          postgres    false    222            3           0    0    etats_id_etat_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.etats_id_etat_seq', 3, true);
          public          postgres    false    228            4           0    0    maintenance_id_maintenance_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.maintenance_id_maintenance_seq', 11, true);
          public          postgres    false    232            5           0    0    reformes_num_reforme_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.reformes_num_reforme_seq', 18, true);
          public          postgres    false    234            6           0    0    service_id_service_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.service_id_service_seq', 24, true);
          public          postgres    false    218            7           0    0 "   sousdirection_id_sousdirection_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.sousdirection_id_sousdirection_seq', 9, true);
          public          postgres    false    216            8           0    0    type_id_type_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.type_id_type_seq', 30, true);
          public          postgres    false    220            k           2606    16617    admin admin_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (idemp);
 :   ALTER TABLE ONLY public.admin DROP CONSTRAINT admin_pkey;
       public            postgres    false    225            q           2606    16657    affectation affectation_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.affectation
    ADD CONSTRAINT affectation_pkey PRIMARY KEY (num_affectation);
 F   ALTER TABLE ONLY public.affectation DROP CONSTRAINT affectation_pkey;
       public            postgres    false    231            i           2606    16594    agents agents_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.agents
    ADD CONSTRAINT agents_pkey PRIMARY KEY (id_agent);
 <   ALTER TABLE ONLY public.agents DROP CONSTRAINT agents_pkey;
       public            postgres    false    224            m           2606    16631    bureaux bureaux_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.bureaux
    ADD CONSTRAINT bureaux_pkey PRIMARY KEY (id_bureau);
 >   ALTER TABLE ONLY public.bureaux DROP CONSTRAINT bureaux_pkey;
       public            postgres    false    227            g           2606    16581    equipement equipement_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.equipement
    ADD CONSTRAINT equipement_pkey PRIMARY KEY (num_inventaire);
 D   ALTER TABLE ONLY public.equipement DROP CONSTRAINT equipement_pkey;
       public            postgres    false    223            o           2606    16638    etats etats_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.etats
    ADD CONSTRAINT etats_pkey PRIMARY KEY (id_etat);
 :   ALTER TABLE ONLY public.etats DROP CONSTRAINT etats_pkey;
       public            postgres    false    229            s           2606    16665    maintenance maintenance_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.maintenance
    ADD CONSTRAINT maintenance_pkey PRIMARY KEY (id_maintenance);
 F   ALTER TABLE ONLY public.maintenance DROP CONSTRAINT maintenance_pkey;
       public            postgres    false    233            u           2606    16679    reformes reformes_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.reformes
    ADD CONSTRAINT reformes_pkey PRIMARY KEY (num_reforme);
 @   ALTER TABLE ONLY public.reformes DROP CONSTRAINT reformes_pkey;
       public            postgres    false    235            c           2606    16562    services service_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.services
    ADD CONSTRAINT service_pkey PRIMARY KEY (id_service);
 ?   ALTER TABLE ONLY public.services DROP CONSTRAINT service_pkey;
       public            postgres    false    219            a           2606    16555 !   sousdirections sousdirection_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.sousdirections
    ADD CONSTRAINT sousdirection_pkey PRIMARY KEY (id_sousdirection);
 K   ALTER TABLE ONLY public.sousdirections DROP CONSTRAINT sousdirection_pkey;
       public            postgres    false    217            e           2606    16574    types type_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.types
    ADD CONSTRAINT type_pkey PRIMARY KEY (id_type);
 9   ALTER TABLE ONLY public.types DROP CONSTRAINT type_pkey;
       public            postgres    false    221            z           2606    16644    agents agents_id_bureau_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.agents
    ADD CONSTRAINT agents_id_bureau_fkey FOREIGN KEY (id_bureau) REFERENCES public.bureaux(id_bureau);
 F   ALTER TABLE ONLY public.agents DROP CONSTRAINT agents_id_bureau_fkey;
       public          postgres    false    4717    224    227            {           2606    16600    agents agents_id_service_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.agents
    ADD CONSTRAINT agents_id_service_fkey FOREIGN KEY (id_service) REFERENCES public.services(id_service);
 G   ALTER TABLE ONLY public.agents DROP CONSTRAINT agents_id_service_fkey;
       public          postgres    false    219    224    4707            |           2606    16595 #   agents agents_id_sousdirection_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.agents
    ADD CONSTRAINT agents_id_sousdirection_fkey FOREIGN KEY (id_sousdirection) REFERENCES public.sousdirections(id_sousdirection);
 M   ALTER TABLE ONLY public.agents DROP CONSTRAINT agents_id_sousdirection_fkey;
       public          postgres    false    217    224    4705            w           2606    16618 #   equipement equipement_id_agent_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.equipement
    ADD CONSTRAINT equipement_id_agent_fkey FOREIGN KEY (id_agent) REFERENCES public.agents(id_agent);
 M   ALTER TABLE ONLY public.equipement DROP CONSTRAINT equipement_id_agent_fkey;
       public          postgres    false    4713    224    223            x           2606    16582 "   equipement equipement_id_type_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.equipement
    ADD CONSTRAINT equipement_id_type_fkey FOREIGN KEY (id_type) REFERENCES public.types(id_type);
 L   ALTER TABLE ONLY public.equipement DROP CONSTRAINT equipement_id_type_fkey;
       public          postgres    false    221    4709    223            y           2606    16639 "   equipement equipement_if_etat_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.equipement
    ADD CONSTRAINT equipement_if_etat_fkey FOREIGN KEY (id_etat) REFERENCES public.etats(id_etat);
 L   ALTER TABLE ONLY public.equipement DROP CONSTRAINT equipement_if_etat_fkey;
       public          postgres    false    4719    229    223            v           2606    16563 &   services service_id_sousdirection_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.services
    ADD CONSTRAINT service_id_sousdirection_fkey FOREIGN KEY (id_sousdirection) REFERENCES public.sousdirections(id_sousdirection);
 P   ALTER TABLE ONLY public.services DROP CONSTRAINT service_id_sousdirection_fkey;
       public          postgres    false    4705    219    217               u   x�3J20024��5N1O�5I4MԵ40��57OK�LN21M6M�LL����T1JR14P���v�27
	�4(*����w�w��0�M�0I�01�w
6w	N,/w��(����� X�Z         g   x��̻�0 �Z�"('�2�%0@���rǑ�+0�{�0	3��mo��8�=ԮZ(䡒uu�)	9s��ߩ�~Y5b#1t��!º���n���'"�&�"�            x�]��N1Ek�W�Fyx�(Q�DAI'��D�a��,H �������x�Q{��*��2V;�9�T+��imy8�%mR�]v��� h�jK5&�eW��	�1jJ�<�s���k;�6�&Ki�*y�[n���y��9x1���H�x��]��C����9���.�H�{����]���T\��QDW4!�+zˢ�%CE���z��<�5mÅ@��yd�P�6H�FUU���(�#�u8����aa<+��~�l1$cPFWe_������v�ޮc�~����~��/]s�         A   x�ʱ�0���9L��,E�%��W���E��a�Ei�V5��us4�Cg���}�q)�����
�         �   x��N�
�0<o��H�l619��ؖҳQA�z��7�B/�a�Y��!��p�B���
*'��r����lt�UR���ܐ���J:DSW��n S�`R�W��g�@�B�/���5�O	͐��܆vm{7��k�.��W.i8���bꦹ��ϐ�w�`w
b8tc5$e���I����	��E^         *   x�3�tL.�L�2�t�S(H��K�21�R��rS�b���� ��
         R   x�u��� ��.��I]���-�6<��:�d
O�2�F����׭��pH�2E�6�h���m�����.&�&��i��O�#-         �   x�����@��O�`��܍�9`��X�����,>�GT0�����6�뽉�R��,!c�I���)��>@�sn��k7O�gJy+~���xӀġ�c7@,*�W�;���H5��k�䔶|�}�^�~��c�ǩa�p���0_#P�%�i�=-           x�]��N1���S�	i��+�g.!q��]g��
ޞ٭*!n��yfbg�y
�U�%�[�6�ql*�WIJ+0�D���4J��i��c��Z��7ufe�E����T��R��x�'������ڼs.I��G�O?���X9{�=��y�S�x�����E�b'���[`s��.�K���s�-�[�?p�i���Qʢ�ƄyȭA�!4�a�޲ ��nc�YKUj��4�gP��݁�q��@�	�g����%g�5���ǔG� ��"�����         h   x�%�1�@k���Hx@�K���tY!K��l��H���̉�<�xU���C�z��f-��H����Mwh��-P�_iEi#$�hC������?o'�         y   x�5�1�0F���)z��A�#��%�j	'��P��t���/К���w�L\0��e�4I�Ԯ�|�[K�27ʺ�6y]��k��L�tof��4t(8��Rθ�5k`�*��X��/�m+�     