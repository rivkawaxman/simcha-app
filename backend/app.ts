import * as dotenv from  'dotenv';
dotenv.config();
import * as express from 'express';
const app = express();
import * as cookieParser from 'cookie-parser';
import routes from './routes';
import * as jwt from 'jsonwebtoken';
import * as bodyParser from 'body-parser';

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api', (req, res, next) => {
 let token = req.headers['x-access-token'] || req.cookies.simchaFundToken;
 if (token){
    jwt.verify(token, process.env.SECRET_KEY, (err,decoded) => {
        if(err){
            return res.json({success:false, message:'failed to authenticate token'});
        }
        else{
            req.user = decoded.userId;
            next();
        }
    });
 }
 else{
     if(req.url === '/user/login' || req.url === '/user/createUser' || req.url.startsWith('/user/check') 
     || req.url === '/user/forgotPassword' || req.url === '/user/changePasswordTicket'){
         next();
     }
     else{
         return res.status(403).send({
             success:false, message:"No token provided."
         });
     }
 }
}
    , routes);


let port = process.env.PORT || 4000;
app.listen(port, () => console.log(`server started on port ${port}`));