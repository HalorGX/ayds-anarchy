CREATE DATABASE authtodolist;

--users

CREATE TABLE users(
  user_id SERIAL,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id)
);

--todos

CREATE TABLE todos(
  todo_id SERIAL,
  user_id UUID,
  description VARCHAR(255) NOT NULL,
  PRIMARY KEY (todo_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

--freelancers

CREATE TABLE freelancers(
    id SERIAL PRIMARY KEY,
	user_id integer references users(user_id),
    name VARCHAR(255),
    orden INTEGER,
    calidad INTEGER,
    puntualidad INTEGER,
    idioma VARCHAR(255)
);

--clients

CREATE TABLE clients(
  client_id SERIAL,
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL UNIQUE,
  client_password VARCHAR(255) NOT NULL,
  PRIMARY KEY (client_id)
);

--projects

CREATE TABLE projects(
  project_id SERIAL,
  client_name VARCHAR(255),
  description VARCHAR(10000),
  budget INTEGER,
  PRIMARY KEY (project_id)
);

--chosenFreelancers

CREATE TABLE chosenFreelancers(
  id_chosenFreelancers SERIAL PRIMARY KEY,
	user_id integer references users(user_id),
  name VARCHAR(255),
  orden INTEGER,
  calidad INTEGER,
  puntualidad INTEGER,
  idioma VARCHAR(255)
);

--scheduleProject

CREATE TABLE scheduleProjects(
  project_id INTEGER PRIMARY KEY references projects(project_id),
	año INTEGER,
  mes INTEGER,
  dia INTEGER,
  hora INTEGER,
  minuto INTEGER
);

--messages

CREATE TABLE messages(
  message_id SERIAL PRIMARY KEY,
  user_id INTEGER references users(user_id),
  user_name VARCHAR(255),
  user_email VARCHAR(255),
  client_id INTEGER references clients(client_id),
  client_name VARCHAR(255),
  client_email VARCHAR(255),
  received BOOLEAN,
	message VARCHAR(1000)
);
