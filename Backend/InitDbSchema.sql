create database devdemo;

CREATE USER devdemo WITH PASSWORD 'devdemo';
grant all privileges on database devdemo to devdemo;
\c devdemo;
GRANT ALL ON SCHEMA public TO devdemo;


CREATE TABLE BRAND (
  id  SERIAL PRIMARY KEY,
  name VARCHAR(255)
); 

CREATE TABLE MODEL (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64),
  brand_id SERIAL references BRAND(id)
); 

CREATE TABLE PHONE (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64),
  model_id SERIAL references MODEL(id),
  image VARCHAR(64)
);

CREATE TABLE ROLE (
  id  SERIAL PRIMARY KEY,
  name VARCHAR(255)
); 

CREATE table DEVUSER (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64),
  email VARCHAR(64),
  password VARCHAR(64),
  role_id SERIAL references ROLE(id),
  rating FLOAT default 0,
  image VARCHAR(64)
);

CREATE TABLE ASSET (
  id SERIAL PRIMARY KEY,
  description TEXT,
  price FLOAT,
  phone_id SERIAL references PHONE(id),
  image VARCHAR(64)
);


//Insert statement
INSERT INTO BRAND(name) values ('Samsung');
INSERT INTO BRAND(name) values ('iPhone');
INSERT INTO BRAND(name) values ('Nokia');

INSERT INTO MODEL(name, brand_id) values ('S22', 1); 
INSERT INTO MODEL(name, brand_id) values ('15', 1); 
INSERT INTO MODEL(name, brand_id) values ('3310', 1); 

INSERT INTO PHONE(name, model_id) values ('32GB', 1);
INSERT INTO PHONE(name, model_id) values ('Pro Max', 2);
INSERT INTO PHONE(name, model_id) values ('', 3);


INSERT INTO ASSET(phone_id, price, description) values (1, 520, 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.');
INSERT INTO ASSET(phone_id, price, description) values (2, 850, 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.');
INSERT INTO ASSET(phone_id, price, description) values (3, 30, 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.');