import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.router.js';


/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 5001


// Initialize express app
const app = express();

// app Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"));
app.use(express.json());

/* FILE STORAGE */
const storage = multer.diskStorage({
        destination: (req, file, cb) => {
                cb(null, "public/assets");
        },
        filename: (req, file, cb) => {
                cb(null, file.originalname);
        }
});
const upload = multer({ storage: storage })

// static route
app.use("/assets", express.static(path.join(__dirname, "public/assets")))

// app routes
app.use('/', userRouter);
app.use('/', authRouter);

/* DATABASE CONNECTION */
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
}).then(() => {
        console.log('DB connected')
        // starts server
        app.listen(port, () => {
                console.log(`Server is running on port: ${port}`)
        });
}).catch((error) => {
        console.log(`${error} did not connect`);
});


