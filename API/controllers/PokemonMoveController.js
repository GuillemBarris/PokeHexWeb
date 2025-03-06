import sql from "mssql";
import config from "../config/dbConfig.js";
export const getAllPokemonMoves = async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query("SELECT * FROM PokemonMoves");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const getPokemonMoveById = async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query("SELECT * FROM PokemonMoves WHERE id = @id");
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const createPokemonMove = async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('name', sql.NVarChar, req.body.name)
            .input('type', sql.NVarChar, req.body.type)
            .input('power', sql.Int, req.body.power)
            .query("INSERT INTO PokemonMoves (name, type, power) VALUES (@name, @type, @power)");
        res.status(201).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const updatePokemonMove = async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .input('name', sql.NVarChar, req.body.name)
            .input('type', sql.NVarChar, req.body.type)
            .input('power', sql.Int, req.body.power)
            .query("UPDATE PokemonMoves SET name = @name, type = @type, power = @power WHERE id = @id");
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const deletePokemonMove = async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query("DELETE FROM PokemonMoves WHERE id = @id");
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};


