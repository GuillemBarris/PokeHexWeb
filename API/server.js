import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import UserRoutes from './routes/UserRoutes.js';
import PokemonRoutes from './routes/PokemonRoutes.js';
import GameRoutes from './routes/GameRoutes.js';
import MoveRoutes from './routes/MoveRoutes.js';
import PokemonGame from './routes/PokemonGameRoutes.js';
import PokemonMove from './routes/PokemonMoveRoutes.js';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app = express();


const PORT = process.env.PORT || 3000; 
const IP = process.env.DB_SERVER || 'localhost'; 

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/pokemons", PokemonRoutes);
app.use("/api/v1/games", GameRoutes);
app.use("/api/v1/moves", MoveRoutes);
app.use("/api/v1/pokemonGame", PokemonGame);
app.use("/api/v1/pokemonMove", PokemonMove);

app.listen(PORT, IP, () => {
    console.log(`Server is running on http://${IP}:${PORT}`);
});