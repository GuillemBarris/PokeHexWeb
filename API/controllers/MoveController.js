import sql from "mssql";
import config from "../config/dbConfig.js";

export const GetAllMoves = async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query(" use PokeHexDatabase SELECT * FROM Moves");
        return res.status(200).json(result.recordset);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}