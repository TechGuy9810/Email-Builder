import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectMongo from './db/connectToMongo.js';
import bodyParser from 'body-parser';
import layoutRoute from './route/layoutRoute.js';
import path from 'path';
import userRoute from './route/userRoute.js';
import { fileURLToPath } from 'url';
import { requireAuth } from '@clerk/express'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.set('view engine', 'ejs');
dotenv.config();
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
  }))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.set('views', path.join(__dirname, 'views'));
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use("/api",layoutRoute);
app.use("/apiUser",userRoute);
app.get('/protected', requireAuth({ signInUrl: '/sign-in' }), (req, res) => {
  return res.json({ userId: req.auth.userId })
})
app.use(express.static(path.join(__dirname,"../client/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"client","dist","index.html"));
})
app.listen(PORT,()=>{
    connectMongo();
    console.log(`Server is running on port ${PORT}`);

})