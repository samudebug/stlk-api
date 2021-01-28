import * as admin from 'firebase-admin';

const authenticate = async (req, res, next) => {
    try {
 
        const idToken = req.headers['auth'];
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.uid = decodedToken.uid;
        next();
    } catch(err) {
        console.error(err);
        res.status(401).json({message: 'Invalid Id Token!'});
    }
}

export default authenticate;