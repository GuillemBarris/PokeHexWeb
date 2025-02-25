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

