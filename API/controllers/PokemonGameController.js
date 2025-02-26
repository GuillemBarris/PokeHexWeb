import sql from "mssql";
import config from "../config/dbConfig.js";



export const getPokemonGameByIdGameAndBoxNumber = async (req, res) => {
    let { game_id, box_number } = req.params;
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('game_id', sql.VarChar, game_id)
            .input('box_number', sql.Int, box_number)
            .query("SELECT * FROM PokemonGame WHERE game_id = @game_id AND box_number = @box_number ORDER BY location_in_box ASC");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const createPokemonGame = async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('pokemon_id', sql.VarChar, req.body.pokemon_id)
            .input('game_id', sql.VarChar, req.body.game_id)
            .input('box_number', sql.Int, req.body.box_number)
            .input('location_in_box', sql.Int, req.body.location_in_box)
            .query("use PokeHexDatabase; INSERT INTO PokemonGame (pokemon_id, game_id, box_number, location_in_box) VALUES (@pokemon_id, @game_id, @box_number, @location_in_box)");
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
            .input('pokemon_id', sql.VarChar, req.body.pokemon_id)
            .input('game_id', sql.VarChar, req.body.game_id)
            .input('box_number', sql.Int, req.body.box_number)
            .input('location_in_box', sql.NVarChar, req.body.location_in_box)
            .query("UPDATE PokemonGames SET pokemon_id = @pokemon_id, game_id = @game_id, box_number = @box_number, location_in_box = @location_in_box WHERE id = @id");
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const deletePokemonGame = async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query("DELETE FROM PokemonGames WHERE id = @id");
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
