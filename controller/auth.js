const jwt = require('jsonwebtoken');
const admin = require("firebase-admin");
const firebase = require('../config/firebase')
const UserProfile = require('../models/UserProfile');
const { signupValidate, loginValidate } = require('../helper/validate')
const firebaseError = require('../middleware/firebasError')

const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification } = require('firebase/auth')

// const saveToDatabase = async (email) => {
//     if (!email) return res.status(501).json({ error: 'Mail Not avilable ' })
//     try {
//         const User = await UserProfile.create({ email })
//         return User
//     } catch (error) {
//         console.log(error)
//         return res.status(400).json(('Error Occured:', error.message));
//     }

// }

const generateToken = (email, databaseId, acc, usertype) => {
    return jwt.sign({ id: email, userId: databaseId, access: acc, type: usertype }, 'your-secret-key', { expiresIn: '24h' });

};



exports.signup = async (req, res, next) => {

    try {

        const result = await signupValidate.validateAsync(req.body)
        // usertype : association or volunteer/regular

        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, result.email, result.password);
        const user = userCredential.user;
        const firebasetoken = userCredential.user.stsTokenManager.accessToken
        const mail = userCredential.user.email
        //sendEmailVerification(auth.currentUser)

        // save to database

        if (user) {
            const User = await UserProfile.create({ email: mail, userType: result.userType })
            if (!User) return res.status(400).json('Error saving  User to Database');
            const emailId = User._id
            const token = generateToken(mail, emailId, firebasetoken)
            if (!token) return res.status(403).json({ status: 'failed', message: ' error creating user token' })


            return res.status(201).json({
                statusbar: 'success',
                message: 'user SignUp',
                data: ` user ${User.email} has been created`,
            });

        }
        //return res.status(400).json('Error saving  User to Database');

    } catch (error) {
        if (error.code === 'auth/invalid-email') {
            return res.status(400).json("email  does  not exits");
        }
        if (error.code === 'auth/invalid-credential') {
            return res.status(400).json("emails");
        }
        if (error.code === 'auth/email-already-in-use') {
            return res.status(400).json("email already exits");
        }
        if (error.code === 'auth/network-request-failed') {
            return res.status(400).json("Network request failed");
        }
        return res.status(400).json(('Error Occured:', error.message));
    }
}


exports.login = async (req, res, next) => {
    // console.log(req.body)

    try {
        const result = await loginValidate.validateAsync(req.body)

        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, result.email, result.password);
        const user = userCredential.user;
        //const tid = user.getIdToken().then((token) => { console.log(token); })
        const firebasetoken = userCredential.user.stsTokenManager.accessToken
        const mail = userCredential.user.email

        if (user) {
            const User = await UserProfile.findOne({ email: mail })
            if (!User) return res.status(403).json('User does not exist')
            const emailId = User._id

            const token = generateToken(mail, emailId, firebasetoken, User.userType)
            if (!token) return res.status(403).json({ status: 'failed', message: ' error creating user token' })

            res.cookie("token", token, {
                httpOnly: true,
            })
            console.log()
            // return res.status(201).json({ "UserDetails": user, "Database User": User })
            return res.status(201).json({ emailId: User._id, mail: User.email, usertype: User.userType })


        }
        return res.status(201).json({ status: 'failed', message: ' error creating user token' });
    }

    catch (error) {
        if (error.code === 'auth/invalid-email') {
            return res.status(400).json("email  does  not exits");
        }
        if (error.code === 'auth/invalid-credential') {
            return res.status(400).json("Login Failed");
        }
        if (error.code === 'auth/email-already-in-use') {
            return res.status(400).json("email already exits");
        }
        if (error.code === 'auth/network-request-failed') {
            return res.status(400).json("Network request failed");
        }
        return res.status(400).json(('Error Occured:', error.message));
    }


}

exports.forgetpassword = async (req, res, next) => {
    const usernew = {
        email: req.body.email,
    }

    try {
        // if (!mail) return res.status(422).json("email is required")
        // const User = await UserProfile.findOne({ email: mail })
        // if (!User) return res.status(400).json(" email does not exit ")
        const auth = getAuth();
        const forgotPassword = sendPasswordResetEmail(auth, usernew.email)
        if (forgotPassword) return res.status(200).json("password reset mail has been sent")

    } catch (error) {
        if (error.code === 'auth/invalid-email') {
            return res.status(400).json("email  does  not exits");
        }
        return res.status(400).json(('Error Occured:', error.message));

    }




}

exports.logout = (req, res, next) => {
    if (req.session) {
        req.session.destroy()
        res.clearCookie('connect.sid')
        res.clearCookie('token')
        return res.json({ msg: 'logging you out' })
    } else {
        return res.json({ msg: 'no user to log out!' })
    }


}
