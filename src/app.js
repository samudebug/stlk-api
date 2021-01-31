import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as admin from 'firebase-admin';
import routes from './routes';
import TwitterService from './services/twitter';
const credentials = require('./config/firebase-config.json');

const app = express();

const setupExpress = () => {
    app.use(cors({origin: '*'}));
    app.use(bodyParser.json());
    if (admin.apps.length == 0) {
        admin.initializeApp({credential: admin.credential.cert(credentials)});
    }
    app.use('/', routes);
    const twitterService = new TwitterService();
    twitterService.startStream();
    return app;
}

export default setupExpress;