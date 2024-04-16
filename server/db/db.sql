-- Database creation
CREATE DATABASE stagedb;

--TABLE EMPLOYE
CREATE TABLE admin(
    idEmp uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    nom_utilisateur VARCHAR(255) NOT NULL,
    motpasse VARCHAR(255) NOT NULL
);

--default insert 
INSERT INTO employe (nom,prenom,fonction,motpasse) values('admin','mehdi','agent','$2y$10$iHoafmKpMsV5RJ1qgjYaEOpBaetOqc6PMojZ/f8TyiyqPaEK1Dp0O');


--Table agent

CREATE TABLE agents (
    id_agent uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    fonction VARCHAR(255) NOT NULL,
    id_sousdirection BIGINT REFERENCES sousdirection(id_sousdirection),
    id_service BIGINT REFERENCES service(id_service),
    id_equipement BIGINT REFERENCES equipement(num_lot)
);

--Table sousdirection
CREATE TABLE sousdirection(
    id_sousdirection BIGSERIAL PRIMARY KEY,
    sousdirection VARCHAR(255) NOT NULL
);

--Table service
CREATE TABLE service(
    id_service BIGSERIAL PRIMARY KEY,
    id_sousdirection BIGINT REFERENCES sousdirection(id_sousdirection),
    service VARCHAR(255) NOT NULL
);

--Table type
CREATE TABLE type(
    id_type BIGSERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL
);

--Table equipement
CREATE TABLE equipement(
    num_lot BIGSERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    id_type BIGINT REFERENCES type(id_type)
);


--No references : type , sous direction 

INSERT INTO type (type) values('pc');
INSERT INTO sousdirection (sousdirection) values('Hors categorie');
INSERT INTO service(id_sousdirection,service) values(1,'Ecoute sociale et communication');


SELECT num_lot,equipement.nom as modele,types.type,agents.nom,dateaquisition,dateaffectation as agent FROM equipement LEFT JOIN agents ON equipement.num_lot = agents.id_equipement JOIN types ON  equipement.id_type = types.id_type;