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

export const CreateGame = async(req, res) => {
    const {name, user_id} = req.body

    try {
        let pool = await sql.connect(config);
        let result = await pool
        .request()
        .input("name", sql.VarChar, name)
        .input("user_id", sql.VarChar, user_id)
        .query("use PokeHexDatabase Insert Into Games (name, user_id) values (@name, @user_id)");
        if(result.rowsAffected[0] === 1){
            return res.status(201).json({message: "Game created succesfully"})
        } else {
            return res.status(400).json({message: "Error creating Game"})
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}