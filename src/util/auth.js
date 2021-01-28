import * as admin from 'firebase-admin';

const authenticate = async (req, res, next) => {
    try {
        console.log(req.headers);
        const idToken = req.header('auth');
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.uid = decodedToken.uid;
        next();
    } catch(err) {
        res.status(401).json({message: 'Invalid Id Token!'});
    }
}

export default authenticate;