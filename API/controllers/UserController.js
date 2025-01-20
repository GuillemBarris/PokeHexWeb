import sql from "mssql";
import config from "../config/dbConfig.js";

export const CreateUser = async (req, res) => {
  const { name, email, type, password } = req.body;
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("name", sql.VarChar, name)
      .input("email", sql.VarChar, email)
      .input("type", sql.VarChar, type)
      .input("password", sql.VarChar, password)
      .query(
        "use PokeHexDatabase INSERT INTO Users (name, email, type, password) VALUES (@name, @email, @type, @password)"
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
