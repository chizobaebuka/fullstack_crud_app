import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './db.js';
import clientRouter from './routes/clientRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/clients', clientRouter);

app.get('/', (req, res) => {
    res.send('Connected to backend Here!')
})

try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    app.listen(port, () => {
        console.log(`Your app is dancing on http://localhost:${port}`);
    });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}