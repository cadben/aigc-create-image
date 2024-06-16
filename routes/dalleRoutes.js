import express from 'express';
import * as dotenv from 'dotenv';
import * as ai from 'openai';
import Post from '../mongodb/models/post.js';
import http from 'http';
import { HttpsProxyAgent } from 'https-proxy-agent'

dotenv.config();

const router = express.Router();

const configuration = {
    httpAgent: new HttpsProxyAgent("http://127.0.0.1:7890"),
    apiKey: process.env.OPENAI_API_KEY,
};

const openai = new ai.OpenAI(configuration);

// router.route('/').get((req, res) => {
//     res.send('准备链接openAI');
// });

router.route('/').post(async (req, res) => {
    // fetch('https://www.youtube.com/watch?v=EyIvuigqDoA&t=1339s');
    try {
        const { prompt } = req.body;

        const aiRes = await openai.images.generate({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        }, {
            proxy: {
                host: '127.0.0.1',
                port: 7890
            }
        });

        console.log(aiRes)
        const image = aiRes.data.data[0].b64_json;

        res.status(200).json({ photo: image });
    } catch (error) {
        console.log(error);
        res.status(500).json(error?.response.data.error.message);
    }
});

export default router;