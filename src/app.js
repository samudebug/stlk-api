import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as admin from 'firebase-admin';
import routes from './routes';
const credentials = require('./config/firebase-config.json');

const app = express();

const setupExpress = () => {
    app.use(cors({origin: '*'}));
    app.use(bodyParser.json());
    if (admin.apps.length == 0) {
        admin.initializeApp(credentials);
    }
    app.use('/', routes)
    return app;
}

export default setupExpress;