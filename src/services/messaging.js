import * as admin from 'firebase-admin';
class MessagingService {
    async addToTopic(registrationToken, socialMediaName, socialMediaHandle) {
        try {
            await admin.messaging().subscribeToTopic([registrationToken], `${socialMediaName} ${socialMediaHandle} sub`);
        } catch(err) {
            console.error(err);
            throw err;
        }
    }
}
export default MessagingService;