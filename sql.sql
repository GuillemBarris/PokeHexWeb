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

Create Table Pokemon (
	name Varchar(15) Not Null,
	Generation numeric(2) Not Null,
	category Varchar(25) Not Null,
	Ps numeric(3) Not Null,
	Attack numeric(3) Not Null,
	Defense numeric(3) Not Null,
	SpAttack numeric(3) Not Null,
	SpDefense numeric(3) Not Null,
	Speed numeric(3) Not Null,
	Primary key (name)
)
