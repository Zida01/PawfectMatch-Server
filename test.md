// const SECRET_KEY = 'your-secret-key';

// app.post('/login', (req, res) => {
// const { email, password } = req.body;

// // Validate email and password (you may use a database for this)
// // If valid, generate a JWT token
// if (email && password) {
// const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
// res.json({ token });
// } else {
// res.status(401).json({ error: 'Invalid credentials' });
// }
// });

// // Middleware to verify JWT token
// const verifyToken = (req, res, next) => {
// const token = req.headers.authorization;

// if (!token) {
// return res.status(403).json({ error: 'Token not provided' });
// }

// jwt.verify(token, SECRET_KEY, (err, decoded) => {
// if (err) {
// return res.status(401).json({ error: 'Invalid token' });
// }

// req.user = decoded;
// next();
// });
// };

// app.get('/profile', verifyToken, (req, res) => {
// // Access user information from req.user
// res.json({ message: 'Profile Page', user: req.user });
// });

////// THIS CODE BELOW IS USISNG THE FIREBASE SDK WITH FULL PRIVEELEGGE AND RIGHT FORTHE SERVER SIDE
///// it does login it the use to the firebase app but just create user and other functionality
/////

// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const admin = require("firebase-admin");

const serviceAccount = require('./pawfectmatch-serviceAccount.json');

admin.initializeApp({
credential: admin.credential.cert(serviceAccount)
});

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (res, req) => {

})

app.post('/signup', async (req, res) => {
const usernew = {
email: req.body.email,
password: req.body.password
}
// carry
try {
const user = await admin.auth().createUser({
email: usernew.email,
password: usernew.password
})
//creating a customtoken from firebase which will be passed to the user
// token has to be protected by the cookies or express- sessions
//token will be verified via a middleware
// token will be passed to with ( with the user email and token also ) in protected routes
// either topass this token alone or also use the jwt to reassigned token again automatically
//then pass to the token to the uswer as a cookies which will be verifiedby the middleware
const customToken = await admin.auth().createCustomToken(user.uid, { expiresIn: '1 hour' });
res.json({ user: user, token: customToken })

    } catch (error) {
        res.json(error)
    }

})

app.post('/login', async (req, res) => {
const usernew = {
email: req.body.email,
password: req.body.password
}
// carry
try {
// const user = await admin.auth().createUser({
// email: usernew.email,
// password: usernew.password
// })
// login user with the token
// check token validity inthe cookies
const customToken = await admin.auth().createCustomToken(user.uid, { expiresIn: '1 hour' });
res.json({ user: user, token: customToken })

    } catch (error) {
        res.json(error)


    }

})

const PORT = 5000;
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});
