import * as admin from 'firebase-admin';

class AuthController {
    async login(req, res) {
        const exists = await admin.firestore().collection('users').where('uid', '==', req.uid).get();
        let userFsId = '';
        if (exists.empty) {
            userFsId = (await admin.firestore().collection('users').add({uid: req.uid})).id;
        } else {
            userFsId = exists.docs[0].id;
        }
        res.send({uid: userFsId});
    }
}

export default AuthController;