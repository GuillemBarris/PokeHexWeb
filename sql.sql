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
	generation numeric(2) Not Null,
	category Varchar(25) Not Null,
	ps numeric(3) Not Null,
	attack numeric(3) Not Null,
	defense numeric(3) Not Null,
	spAttack numeric(3) Not Null,
	spDefense numeric(3) Not Null,
	speed numeric(3) Not Null,
	Primary key (name)
)

Create Table Games (
	id UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
	name nvarchar(50) Not Null,
	user_id varchar(50) Not Null,
	Foreign Key (user_id) REFERENCES Users(email)
)

Create Table Moves (
	name Varchar(20) Not Null,
	category Varchar(20) Not Null,
	type Varchar(20) Not Null,
	power numeric(3) Not Null,
	Primary key (name)
)
Create Table PokemonGame (
	id UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
	pokemon_id Varchar(15) Not Null,
	game_id UNIQUEIDENTIFIER Not Null,
	box_name VARCHAR(50) NOT NULL, 
	box_number numeric NOT NULL, 
    location_in_box numeric NOT NULL,
	Foreign Key (pokemon_id) REFERENCES Pokemon(name),
	Foreign Key (game_id) REFERENCES Games(id)
)
)