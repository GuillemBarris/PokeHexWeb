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

export const CreateMove = async (req, res) => {
    const { name, type, category, power} = req.body;
    try{
        let pool = await sql.connect(config);
        let result = await pool
            .request()
            .input("name", sql.VarChar, name)
            .input("type", sql.VarChar, type)
            .input("category", sql.VarChar, category)
            .input("power", sql.Int, power)
            .query(
                "use PokeHexDatabase INSERT INTO Moves (name, type, category, power) VALUES (@name, @type, @category, @power)"
            );
        if (result.rowsAffected[0] === 1) {
            return res.status(201).json({ message: "Move created successfully" });
        }
        return res.status(400).json({ message: "Error creating move" }); 
    } 
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}