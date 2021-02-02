import * as admin from 'firebase-admin';
class InfluencerController {
    constructor (twitterService, messagingService, socialMediaService) {
        this.twitter = twitterService;
        this.messaging = messagingService;
        this.socialMediaService = socialMediaService;
    }
    async list(req, res) {
        try {
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
            const influencerRef = await collectionRef.doc(req.params.influencerId).get();
            return res.send({id: influencerRef.id, ...influencerRef.data()});
        } catch (err) {
            console.error(err);
            return res.status(500).json({message: "An error has ocurred"});
        }
    }

    async addSocialMedia(req, res) {
        try {
            let socialMedia = await this.socialMediaService.getSocialMediaByUid(req.body.uid);
            if (socialMedia === null) {
                socialMedia = await this.socialMediaService.createSocialMedia({socialMediaName: req.body.social_media_name, name: req.body.name, handle: req.body.handle, uid: req.body.uid, profilePicUrl: req.body.profile_pic_url});
            }
            const userRef = await admin.firestore().collection('users').doc(req.userDocId);
            let subscriber = await this.messaging.getSubscriber(userRef);
            if (subscriber === null) {
                subscriber = await this.messaging.createSubscriber(userRef, req.body.registrationToken);
            }
            await socialMedia.update({
                subscribers: admin.firestore.FieldValue.arrayUnion(subscriber),
            });
            socialMedia = await this.socialMediaService.getSocialMediaByUid(req.body.uid);
            await admin.firestore().collection('users').doc(req.userDocId).collection('influencers').doc(req.params.influencerId).update({
                socialMedias: admin.firestore.FieldValue.arrayUnion(socialMedia)
            });
            return res.send({message: "Social media added successfully"});

        } catch(err) {
            console.error(err);
            return res.status(500).json({message: 'An error has ocurred'});
        }
    }

    async deleteSocialMedia(req, res) {
        try {
            let socialMediaRef = await this.socialMediaService.getSocialMediaByUid(req.params.uid);
            const userRef = await admin.firestore().collection('users').doc(req.userDocId);
            const subscriber = await this.messaging.getSubscriber(userRef);
            await socialMediaRef.update({
                subscribers: admin.firestore.FieldValue.arrayRemove(subscriber)
            });
            socialMediaRef = await this.socialMediaService.getSocialMediaByUid(req.params.uid);
            userRef.collection('influencers').doc(req.params.influencerId).update({
                socialMedias: admin.firestore.FieldValue.arrayRemove(socialMediaRef)
            })
            if (socialMediaRef.data().subscribers.length === 0) {
                await this.socialMediaService.deleteSocialMedia(req.params.uid);
            }
            return res.send({message: "Social Media deleted successfully"});
            
        } catch (err) {
            console.error(err);
            return res.status(500).json({message: 'An error has ocurred'});
        }
    }
}

export default InfluencerController;