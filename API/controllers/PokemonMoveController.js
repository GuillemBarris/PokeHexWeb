import sql from "mssql";
import config from "../config/dbConfig.js";

export const getPokemonMoveById = async (req, res) => {
    let { id } = req.params;
   
    if (!id) {
        return res.status(400).send("ID is required");
    }

    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('id', sql.VarChar, id)
            .query("SELECT * FROM PokemonMove WHERE id = @id");


        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
};

export const createPokemonMove = async (req, res) => {
    let {pokemon_id, move_id } = req.body;
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('pokemon_id', sql.VarChar, pokemon_id)
            .input('move_id', sql.VarChar, move_id)
            .query("INSERT INTO PokemonMove (pokemon_id, move_id) VALUES (@pokemon_id, @move_id)");
        res.status(201).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const updatePokemonMove = async (req, res) => {
    let {pokemon_id,  } = req.body;
    let  { move_id } = req.params;
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('pokemon_id', sql.VarChar, pokemon_id)
            .input('move_id', sql.VarChar, move_id)
            .query("UPDATE PokemonMove SET pokemon_id = @pokemon_id, move_id = @move_id WHERE id = @id");
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const deletePokemonMove = async (req, res) => {
    let {pokemon_id }  = req.params;
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('id', sql.VarChar, pokemon_id)
            .query("DELETE FROM PokemonMove WHERE id = @id");
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};


