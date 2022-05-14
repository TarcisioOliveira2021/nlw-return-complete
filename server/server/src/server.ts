import express from 'express'
import { routes } from './routers';
import cors from 'cors';

const app = express()

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(routes);


//Porta que o servidor irá escutar.
app.listen(3333, () => {
    console.log('server is running')
});