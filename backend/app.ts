import * as express from 'express';
const app = express();
import routes from './routes';
import * as bodyParser from 'body-parser';
//import cors from 'cors';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(cors.);
app.use('/api', routes);


let port = process.env.PORT || 4000;
app.listen(port, () => console.log(`server started on port ${port}`));