import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; 
import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/authRoute.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log('Error connecting to MongoDB' + err.message);
});

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    const statuscode = err.statusCode || 500;
    const message = err.message || 'Server error';
    res.status(statuscode).json({
        success: false,
        statuscode,
        message
    });
});
