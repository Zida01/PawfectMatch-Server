const authRouter = require('express').Router();
const auth = require('../controller/auth')
const requireAuth = require('../middleware/verify')
const user = require('../controller/user')
const dog = require('../controller/dog')
const upload = require('../controller/user')

/***
 * AUTHENTICATION LOGIN ,LOGOUT,  RESET 
 */
authRouter.post('/login', auth.login)

authRouter.post('/signup', auth.signup)

authRouter.get('/logout', auth.logout)
authRouter.post('/reset', auth.forgetpassword)

//authRouter.get('/1', requireAuth, auth.t)
//https://sandydev.medium.com/how-to-build-secure-and-scalable-authentication-system-with-node-js-and-mongodb-c50bf51c06b0

authRouter.post('/dogs', requireAuth, dog.createDog)
authRouter.get('/dogs', requireAuth, dog.AllMyDogs)
authRouter.get('/alldogs', dog.Alldogs)//===> requireAuth  ( check)
authRouter.get('/alldog', dog.getAlldogs)

authRouter.get('/dogs/:dogId', requireAuth, dog.getOnedogs)//===> requireAuth  ( check)
// 
authRouter.get('/alldogs/:breed', dog.GetDogsByBreed)

//get dogs by search ,  query params( breed)

authRouter.post('/updatedogs/:dogId', requireAuth, dog.updatedogs)
authRouter.delete('/deletedogs/:dogId', requireAuth, dog.deletedogs)

authRouter.get('/mydogs', dog.getAlldogsByCityOrCountry)//===> requireAuth  ( check)
/***
 * USER FUNCTIONALITY
 */

//view user profile when logged in 
authRouter.get('/profile', requireAuth, user.viewprofile)


// edit user profile when login
authRouter.post('/profile', requireAuth, user.editprofile)
authRouter.post('/editpicture', requireAuth, user.editprofilepicture)
authRouter.get('/change', requireAuth, user.changeusertype)
authRouter.get('/userAssociation/:dogId', requireAuth, user.profileAssociation)

authRouter.get('/test', user.token,)

// find all user
authRouter.get('/allprofile', requireAuth, user.profile)
//find all user (volunteer)


///
//authRouter.get('/allvolunteer', requireAuth, user.getAllvolunteer)
//find volunteer by location and city 
authRouter.get('/volunteer', requireAuth, user.getAllvolunteerByCityOrCountry)

authRouter.get('/association', requireAuth, user.getAllAssocciationByCityOrCountry)

//authRouter.post('/upload', requireAuth, upload.single('image'), user.UserImg)


// search Volunteer by country , state , cities
//authRouter.get('/volunteer', user.getAllvolunteerByCityOrCountry)


//find all   association
//authRouter.get('/allassociation', user.getAllAssocciation)
//find all association  by location and city
//authRouter.get('/association', user.getAllAssocciationByCityOrCountry)


module.exports = authRouter;