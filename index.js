import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/api/post', postRoutes);
app.use('/api/dalle', dalleRoutes);

app.get('/', async(req, res) => {
    res.send('欢迎使用AIGC');
});

const star = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
    } catch (err) {
        console.log(err);
    }

    app.listen(8080, () => {
        console.log('AIGC服务已启动，站点：http://localhost:8080');
    });
};

star();