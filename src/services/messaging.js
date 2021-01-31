import * as admin from 'firebase-admin';
class MessagingService {
    async addToTopic(registrationToken, socialMediaName, socialMediaHandle) {
        try {
            await admin.messaging().subscribeToTopic([registrationToken], `/topics/${socialMediaName}_${socialMediaHandle}_sub`);
        } catch(err) {
            console.error(err);
            throw err;
        }
    }

    async notifyUsers(socialMediaName, socialMediaHandle) {
        try {
            await admin.messaging().sendToTopic(`/topics/${socialMediaName}_${socialMediaHandle}_sub`, {data: {
                socialMediaName: socialMediaName,
                socialMediaHandle: socialMediaHandle,

            }})
        } catch (err) {
            console.error(err);
        }
    }
}
export default MessagingService;