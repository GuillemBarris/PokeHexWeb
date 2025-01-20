import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import sql from "mssql";
import config from "../config/dbConfig.js";
import dotenv from "dotenv";
dotenv.config();

export const CreateUser = async (req, res) => {
  const { name, email, type, password } = req.body;
  try {
    //Haseja la contrasenya abans del guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("name", sql.VarChar, name)
      .input("email", sql.VarChar, email)
      .input("type", sql.VarChar, type)
      .input("password", sql.VarChar, hashedPassword) //Utiliza la contrasenya hasejada
      .query(
        "use PokeHexDatabase INSERT INTO Users (name, email, type, password) VALUES (@name, @email, @type, @password)"
      );
    if (result.rowsAffected[0] === 1) {
      //Generar el token JWT
      const token = jwt.sign({ email}, process.env.JWT_SECRET, {expiresIn: "2h"});
      return res.status(201).json({ message: "User created successfully" });
    } else {
      return res.status(400).json({ message: "Error creating user" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
