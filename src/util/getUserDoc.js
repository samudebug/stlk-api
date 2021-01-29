import * as admin from 'firebase-admin';

const getUserDoc = async (req, res, next) => {
    try {
        const userQuery = await admin.firestore().collection('users').where('uid', '==', req.uid).limit(1).get();
        const [user] = userQuery.docs;
        req.userDocId = user.id;
        next();
    } catch(err) {
        console.error(err);
        res.status(404).json({message: "User not registered. Please logou and login again."});
    }
}

export default getUserDoc;