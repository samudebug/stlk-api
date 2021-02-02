import * as admin from 'firebase-admin';

class MessagingController {
    constructor(messagingService) {
        this.messagingService = messagingService;
    }

    async saveToken(req, res) {
        try {
            const userRef = admin.firestore().collection('users').doc(req.userDocId);
            const subscriber = await this.messagingService.getSubscriber(userRef);
            if (subscriber == null) {
                await this.messagingService.createSubscriber(userRef, req.body.fcmToken);
            } else {
                await subscriber.ref.update({ fcmToken: req.body.fcmToken });
            }
            return res.send({ message: 'Token updated successfully' });

        } catch (err) {
            return res.status(500).json({ message: 'An error has ocurred' });
        }
    }
}

export default MessagingController;