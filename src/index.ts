import express from 'express';
import bodyParser from "body-parser";
import router from "./routers";
import {AppDataSource} from "./data-source";
import cors from 'cors';
import session from "express-session";
import passport from "passport";
const app = express()



app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

AppDataSource.initialize().then(()=>{
    console.log('Connect database success')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({origin:'http://localhost:3000', credentials:true }));


app.use('', router)



app.listen(3001, () => {
    console.log('Server is running')
})