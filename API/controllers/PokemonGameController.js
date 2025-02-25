import sql from "mssql";
import config from "../config/dbConfig.js";



export const getPokemonGameByIdGame = async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('game_id', sql.Int, req.params.id)
            .query("SELECT * FROM PokemonGames WHERE game_id = @game_id");
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const createPokemonGame = async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('pokemon_id', sql.Int, req.body.pokemon_id)
            .input('game_id', sql.Int, req.body.game_id)
            .input('box_name', sql.NVarChar, req.body.box_name)
            .input('location_in_box', sql.NVarChar, req.body.location_in_box)
            .query("INSERT INTO PokemonGames (pokemon_id, game_id, box_name, location_in_box) VALUES (@pokemon_id, @game_id, @box_name, @location_in_box)");
        res.status(201).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const updatePokemonGame = async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .input('pokemon_id', sql.Int, req.body.pokemon_id)
            .input('game_id', sql.Int, req.body.game_id)
            .input('box_name', sql.NVarChar, req.body.box_name)
            .input('location_in_box', sql.NVarChar, req.body.location_in_box)
            .query("UPDATE PokemonGames SET pokemon_id = @pokemon_id, game_id = @game_id, box_name = @box_name, location_in_box = @location_in_box WHERE id = @id");
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
