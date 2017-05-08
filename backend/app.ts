import * as express from 'express';
const app = express();
import routes from './routes';
import * as bodyParser from 'body-parser';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', routes);

let port = process.env.PORT || 4000;
app.listen(port, () => console.log(`server started on port ${port}`));