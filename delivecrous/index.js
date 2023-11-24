import express from 'express';
import mongoose from 'mongoose';
import apiRouter from './routers/api.router.js';

const app = express();

mongoose.connect('mongodb://localhost:27017/delivecrous')
    .then(() => console.log('Database connected'))
    .catch(() => console.log('Database not found'));

app.use(express.json());
app.use('/api', apiRouter);

app.listen(process.env.PORT || '3000', () => {
    console.log('Server started on port 3000');
});
