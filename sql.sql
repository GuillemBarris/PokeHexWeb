--Creacio de la Base de Dades--

Create Database PokeHexDatabase;

---Creacio de les Taules---
use PokeHexDatabase;

Create Table Users (
	name Varchar(50) Not null,
	email Varchar(50) Not Null,
	type Varchar(50) Not Null,
	password Varchar(50) Not Null,
	Primary key (email)
);
