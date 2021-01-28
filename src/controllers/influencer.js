import * as admin from 'firebase-admin';
class InfluencerController {
    async list(req, res) {
        try {
            const userQuery = await admin.firestore().collection('users').where('uid', '==', req.uid).limit(1).get();
            const [user] = userQuery.docs;
            const result = user.data().influencers === undefined ? [] : [...user.data().influencers];
            return res.send(result);
        } catch(err) {
            console.error(err);
            res.status(500).json({message: "An error has ocurred"});
        }
    }
}

export default InfluencerController;