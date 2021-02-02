import * as admin from 'firebase-admin';

class SocialMediaService {
    constructor(twitterService) {
        this.twitterService = twitterService;
    }
    async getSocialMediaByUid(socialMedia) {
        const socialMediaQuery = await admin.firestore().collection('socialMedias').where('uid', '==', socialMedia.uid).get();
        if (socialMediaQuery.empty) {
            return null;
        }
        return socialMediaQuery.docs[0].ref;
    }

    async getSocialMedia(id) {
        return await admin.firestore().collection('socialMedias').doc(id);
    }

    async createSocialMedia(socialMedia) {
        const socialMediaRef = await admin.firestore().collection('socialMedias').add(socialMedia);
        switch (socialMedia.socialMediaName) {
            case 'twitter':
                await this.twitterService.addTwitterRule(socialMedia.handle);
                break;
        }
        return socialMediaRef;
    }

    async deleteSocialMedia(uid) {
        try {
            const socialMediaRef = await this.getSocialMediaByUid(uid);
            const socialMediaData = await (await socialMediaRef.get()).data();
            switch (socialMediaData.socialMediaName) {
                case 'twitter':
                    await this.twitterService.deleteTwitterRule(socialMediaData.handle);
                    break;
            }
            await socialMediaRef.delete();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
export default SocialMediaService;