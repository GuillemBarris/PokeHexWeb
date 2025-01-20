import sql from "mssql";
import config from "../config/dbConfig.js";

export const CreateUser = async (req, res) => {
  const { name, email, type } = req.body;
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("name", sql.NVarChar, name)
      .input("email", sql.NVarChar, email)
      .input("type", sql.NVarChar, type)
      .query(
        "use PokeHexDatabase INSERT INTO Users (name, email, type) VALUES (@name, @email, @type)"
      );
    if (result.rowsAffected[0] === 1) {
      return res.status(201).json({ message: "User created successfully" });
    } else {
      return res.status(400).json({ message: "Error creating user" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
