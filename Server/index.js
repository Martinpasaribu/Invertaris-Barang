import express from 'express';
import cors from "cors";
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import dotenv from 'dotenv';

import  http  from 'http'


import AuthRoute from './routes/AuthRoute.js';
import UserRoute from './routes/UserRoute.js';

import { Koneksi } from './config/MongoDB.js';

dotenv.config();

const app = express();


app.use(express.json());


// =============   Set Up Socket io  ==================


app.use(express.json());





// const sessionStore = SequelizeStore(session.Store);
const MongoDBStoreKU = MongoDBStore(session);

// Konfigurasi koneksi MongoDB
const store = new MongoDBStoreKU({
    uri: process.env.MONGODB_URI, // Ganti dengan URI MongoDB Anda
    collection: 'sessions' // Nama koleksi untuk menyimpan sesi
});

// const store = new sessionStore ({
//     db:db
// });
store.on('error', function(error) {
    console.log(error);
});

app.set('trust proxy', 1)

app.use(cors({
    origin: ["", "https://www.postman.com", "http://localhost:3000", "http://localhost:3001", "http://localhost:5000", "https://martin-pasaribu.vercel.app"],
    methods: ["POST", "GET", "PATCH", "DELETE",'PUT', "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
 }));



 app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {

        // idupin untuk global
        // secure: true,
        // /// httpOnly:'auto',
        // sameSite:'none'

        // idupin untuk local
        secure: "auto"
    }
}));


app.use(AuthRoute);
app.use(UserRoute);

// Middleware logging session
// app.use((req, res, next) => {
//     console.log('Session:', req.session);
//     next();
// });



app.use('/', (req,res)=> {
    res.send(" Server LCA ")
})


app.listen(process.env.APP_PORT, ()=> {
    console.log('Server up and running...'+ process.env.APP_PORT);
});



