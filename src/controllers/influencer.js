import * as admin from 'firebase-admin';
class InfluencerController {
    async list(req, res) {
        try {
            const userQuery = await admin.firestore().collection('users').where('uid', '==', req.uid).limit(1).get();
            const user = await admin.firestore().collection('users').doc(req.userDocId);
            const influencersCollection = await user.collection('influencers').get();
            let result = [];
            if (!influencersCollection.empty) {
                result = influencersCollection.docs.map((doc) => {
                    return {id: doc.id, ...doc.data()}
                });
            }
            return res.send(result);
        } catch(err) {
            console.error(err);
            res.status(500).json({message: "An error has ocurred"});
        }
    }

    async create(req, res) {
        try {
            const user = await admin.firestore().collection('users').doc(req.userDocId);
            const collectionRef = user.collection('influencers');
            const data = req.body;
            const result = await collectionRef.add(data);
            return res.send({influencer_id: result.id});
        } catch(err) {
            console.error(err);
            return res.status(500).json({message: "An error has ocurred"});
        }
    }

    async get(req, res) {
        try {
            const user = await admin.firestore().collection('users').doc(req.userDocId);
            const collectionRef = user.collection('influencers');
            const influencerRef = await collectionRef.doc(req.influencerId).get();
            return res.send({id: influencerRef.id, ...influencerRef.data()});
        } catch (err) {
            console.error(err);
            return res.status(500).json({message: "An error has ocurred"});
        }
    }

    async addSocialMedia(req, res) {
        try {
            const user = await admin.firestore().collection('users').doc(req.userDocId);
            const influencerRef = await user.collection('influencers').doc(req.influencerId);
            await influencerRef.update({social_medias: admin.firestore.FieldValue.arrayUnion(req.body)});
            return res.send({message: "Social media added successfully"});

        } catch(err) {
            console.error(err);
            return res.status(500).json({message: 'An error has ocurred'});
        }
    }
}

export default InfluencerController;