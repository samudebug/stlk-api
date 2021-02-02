import * as admin from 'firebase-admin';
class MessagingService {
    async createSubscriber(user, fcmToken) {
        try {
            return await admin.firestore().collection('subscribers').add({user: user, fcmToken: fcmToken});
        } catch(err) {
            console.error(err);
            throw err;
        }
    }

    async getSubscriber(user) {
        try {
            const subscriberQuery = await admin.firestore().collection('subscribers').where('user', '==', user).get();
            if (subscriberQuery.empty) return null;
            return subscriberQuery.docs[0].ref;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async notifyUsers(socialMediaName, socialMediaHandle) {
        try {
            await admin.messaging().sendToTopic(`/topics/${socialMediaName}_${socialMediaHandle}_sub`, {data: {
                socialMediaName: socialMediaName,
                socialMediaHandle: socialMediaHandle,

            },
            notification: {
                title: "Nova postagem",
                body: `${socialMediaHandle} postou no ${socialMediaName}`
            }
        })
        } catch (err) {
            console.error(err);
        }
    }
}
export default MessagingService;