import express from 'express';
import cors from 'cors';
import UserRoutes from './routes/UserRoutes.js';

const app = express();

const PORT = 3000;
const IP = '172.24.59.209';

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", UserRoutes);

app.listen(PORT, IP, () => {
    console.log(`Server is running on http://${IP}:${PORT}`);
});