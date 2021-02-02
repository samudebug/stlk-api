import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as admin from 'firebase-admin';
import routes from './routes';
import TwitterService from './services/twitter';
import MessagingService from './services/messaging';
const credentials = require('./config/firebase-config.json');

const app = express();

const setupExpress = () => {
    app.use(cors({origin: '*'}));
    app.use(bodyParser.json());
    if (admin.apps.length == 0) {
        admin.initializeApp({credential: admin.credential.cert(credentials)});
    }
    app.use('/', routes);
    const messagingService = new MessagingService();
    const twitterService = new TwitterService(messagingService);
    twitterService.startStream();
    process.on('SIGTERM', () => {
        console.info('SIGTERM signal received.');
        console.log('Closing http server.');
        twitterService.closeStream();
    });
    process.on ('SIGINT', () => {
        console.info('SIGINT signal received.');
        console.log('Closing http server.');
        twitterService.closeStream();
        process.exit(0);
    }); 

    return app;
}

export default setupExpress;