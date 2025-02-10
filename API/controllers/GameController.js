import sql from "mssql";
import config from "../config/dbConfig.js";

export const GetGameByUserId = async(req, res) => {
    const {user_id} = req.body

    try {
        let pool = await sql.connect(config);
        let result = await pool
        .request()
        .input("user_id", sql.VarChar, user_id)
        .query("use PokeHexDatabase SELECT * FROM Games Where user_id = @user_id;")
       
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}