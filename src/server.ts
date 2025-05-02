import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db';
import router from './router/router';

//env configuration ..
dotenv.config();
const PORT = process.env.PORT || 3000;


const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Node.js!');
});

app.use(router);

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port :- ${PORT}`)
    })
})





