import sql from "mssql";
import config from "../config/dbConfig.js";

export const GetGameByUserId = async(req, res) => {

    try {
        const {user_id} = req.params
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

export const UpdateGame = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    try {
        let pool = await sql.connect(config);
        let result = await pool
            .request()
            .input("id", sql.VarChar, id)
            .input("name", sql.VarChar, name)
            .query("use PokeHexDatabase; UPDATE Games SET name = @name WHERE id = @id");

        if (result.rowsAffected[0] === 1) {
            return res.status(200).json({ message: "Game updated successfully" });
        } else {
            return res.status(404).json({ message: "Game not found or no changes made" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
