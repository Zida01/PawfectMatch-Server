const jwt = require('jsonwebtoken');
const admin = require("firebase-admin");
const firebase = require('../config/firebase')
const UserProfile = require('../models/UserProfile');
const { t } = require('../helper/validate')
const firebaseError = require('../middleware/firebasError')

const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth')

const saveToDatabase = async (email) => {
    if (!email) return res.status(501).json({ error: 'Mail Not avilable ' })
    try {
        const User = await UserProfile.create({ email })
        return User
    } catch (error) {
        console.log(error)
        return res.status(400).json(('Error Occured:', error.message));
    }

}


const generateToken = (email, databaseId, acc) => {
    return jwt.sign({ id: email, userId: databaseId, access: acc }, 'your-secret-key', { expiresIn: '24h' });

};


exports.t = async (req, res) => {
    const email = req.session.user
    const t = await UserProfile.findById({ _id: email })
    console.log(t)
}

exports.signup = async (req, res, next) => {
    const usernew = {
        email: req.body.email,
        password: req.body.password
    }


    try {
        // const result = await t.validateAsync(req.body)
        // //console.log(result)

        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, usernew.email, usernew.password);
        const user = userCredential.user;
        const firebasetoken = userCredential.user.stsTokenManager.accessToken
        const mail = userCredential.user.email


        if (user) {
            const User = await UserProfile.create({ email: mail })
            const emailId = User._id

            //return res.status(201).json({ "UserDetails": user, "Database User": User });

            const token = generateToken(mail, emailId, firebasetoken)
            if (token) {
                res.cookie("token", token, {
                    httpOnly: true,
                })
                return res.status(201).json({ "UserDetails": user, "Database User": User });


            } return res.status(201).json({ error: "token not created" });
        }

        // return res.status(201).json((' Error save to Database'));

    } catch (error) {
        firebaseError(error)
        return res.status(400).json(('Error Occured:', error.message));

    }

}


exports.login = async (req, res, next) => {
    const usernew = {
        email: req.body.email,
        password: req.body.password
    }
    try {


        // const result = await t.validateAsync(req.body)
        // console.log(result)

        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, usernew.email, usernew.password);
        const user = userCredential.user;
        //const tid = user.getIdToken().then((token) => { console.log(token); })
        const firebasetoken = userCredential.user.stsTokenManager.accessToken
        const mail = userCredential.user.email

        if (user) {
            const User = await UserProfile.findOne({ email: mail })
            if (!User) return res.status(403).json('User does not exist')
            const emailId = User._id
            const token = generateToken(mail, emailId, firebasetoken)
            if (token) {
                res.cookie("token", token, {
                    httpOnly: true,
                })
                //return res.status(201).json(('User registered:', user, ne:User));
                return res.status(201).json({ "UserDetails": user, "Database User": User })
            }
            return res.status(201).json({ error: "token not created" });
        }
        const token = generateToken(mail, firebasetoken)
        res.cookie("token", token, {
            httpOnly: true,
        })
        return res.status(201).json({ 'User registered': user, });
    } catch (error) {
        firebaseError(error)
        return res.status(400).json(('Error Occured:', error));
    }


}

exports.logout = (req, res, next) => {

    req.session.destroy(err => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            // Clear cookies
            res.clearCookie('connect.sid');

        }
    });


}
