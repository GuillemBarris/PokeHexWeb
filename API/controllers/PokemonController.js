import sql from "mssql";
import config from "../config/dbConfig.js";

export const CreatePokemon = async (req, res) => {
    const { name, generation, category, ps, attack, defense, spAttack, spDefense, speed} = req.body;

    try{
        let pool = await sql.connect(config);
        let result = await pool
            .request()
            .input("name", sql.VarChar, name)
            .input("generation", sql.Int, generation)
            .input("category", sql.VarChar, category)
            .input("ps", sql.Int, ps)
            .input("attack", sql.Int, attack)
            .input("defense", sql.Int, defense)
            .input("spAttack", sql.Int, spAttack)
            .input("spDefense", sql.Int, spDefense)
            .input("speed", sql.Int, speed)
            .query(
                "use PokeHexDatabase INSERT INTO Pokemon (name, generation, category, ps, attack, defense, spAttack, spDefense, speed) VALUES (@name, @generation, @category, @ps, @attack, @defense, @spAttack, @spDefense, @speed)"
            );
        if (result.rowsAffected[0] === 1) {
            return res.status(201).json({ message: "Pokemon created successfully" });
        } else {
            return res.status(400).json({ message: "Error creating pokemon" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}; 

export const GetPokemon = async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query("SELECT * FROM Pokemon");
        return res.status(200).json(result.recordset);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}