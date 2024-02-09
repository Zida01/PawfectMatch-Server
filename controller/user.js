const { query } = require('express');
const UserProfile = require('../models/UserProfile');
const { associationValidate, regularValidate } = require('../helper/validate')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

exports.viewprofile = async (req, res, next) => {

    const email = req.session.email
    try {
        const userprofile = await UserProfile.findOne({ email: email })
        if (!userprofile) {
            return res.status(500).json({ error: "Email not found" })
        }
        return res.status(200).json(userprofile)
    } catch (error) {
        return res.status(500).json({ error: error.message })

    }

}

exports.changeusertype = async (req, res) => {
    const email = req.session.email
    try {
        const userprofile = await UserProfile.findOne({ email: email })
        if (!userprofile) {
            return res.status(500).json({ error: "Email not found" })
        }
        if (userprofile.checkBox == true && userprofile.userType === "volunteer") {
            // check is diffrent based on usertype
            userprofile.userType = "regular"
            userprofile.checkBox = false
            const data = await userprofile.save();

            return res.status(200).json({ data: true, mail: data.email, usertype: data.userType, emailId: data._id });
        }
        if (userprofile.checkBox == true && userprofile.userType === "regular") {
            // check is diffrent based on usertype
            userprofile.userType = "volunteer"
            userprofile.checkBox = false
            const data = await userprofile.save();

            return res.status(200).json({ data: true, mail: data.email, usertype: data.userType, emailId: data._id });
        }

        return res.status(200).json({ message: "User type remains unchanged" });


    } catch (error) {
        return res.status(500).json({ error: error.message })

    }




}

exports.profile = async (req, res, next) => {
    //update profile
    const email = req.session.email
    try {
        const userprofile = await UserProfile.find()
        if (userprofile) {
            return res.status(200).json({ userprofile })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}




exports.profileAssociation = async (req, res, next) => {
    //update profile
    const email = req.session.email
    const dogId = req.params.dogId

    try {

        const finddogprofile = await UserProfile.findOne({ 'dogProfile': new mongoose.Types.ObjectId(dogId) })

        if (finddogprofile.email) {
            let email = finddogprofile.email
            const profile = await UserProfile.findOne({ email })
            res.json(profile)
        }

        // if (!user.dogProfile.some(dog => dog.equals(dogId))) { return res.json({ status: ' User  can edit not this resource' }) }


    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}




exports.token = async (req, res, next) => {
    const token = req.cookies.token
    try {
        const checkToken = jwt.verify(token, 'your-secret-key');
        res.json({ isValid: true });
    } catch (error) {
        // console.log(error)

        res.json({ isValid: false });
    }


}


exports.editprofile = async (req, res, next) => {
    const email = req.session.email;
    const userData = req.body;
    try {
        const userprofile = await UserProfile.findOneAndUpdate({ email: email }, req.body, { new: true })
        if (userprofile) {
            return res.status(200).json({ updateprofile: userprofile })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })

    }

}

exports.editprofilepicture = async (req, res, next) => {
    //update profile
    const email = req.session.email
    const { profilePicture } = req.body;
    // console.log(profilePicture)

    try {
        const userprofile = await UserProfile.findOne({ email: email })

        if (userprofile) {

            userprofile.profilePicture = profilePicture;
            await userprofile.save();
            return res.status(200).json('file saved to db')
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })

    }

}




exports.getAllvolunteer = async (req, res, next) => {
    try {

        const volunteer = await UserProfile.find({ userType: 'volunteer' }).select('name age').exec();
        return res.status(200).json({ status: "all volunteers", volunteer: volunteer })
    } catch (error) {
        return res.status(403).json({ status: 'Error  Occurred', message: error.message })

    }


}

exports.getAllvolunteerByCityOrCountry = async (req, res, next) => {




    try {
        if (!req.query) {
            return res.status(400).json({ Error: 'not input for country or city ' })
        }
        const queryObj = { ...req.query }
        const exclude = ['page', 'sort', 'fields', 'limit']
        exclude.forEach(el => delete queryObj[el])
        // const query = UserProfile.find(queryObj)
        //const tours = await query
        //console.log(queryObj)

        const volunteer = await UserProfile.find({ userType: 'volunteer', ...queryObj }).select('nameFirst nameLast contactEmail contactPhone country state  city profilePicture').exec();

        return res.status(200).json({ status: "all volunteers", volunteer: volunteer })

    } catch (error) {
        return res.status(403).json({ status: 'Error  Occurred', message: error.message })

    }

}


/***
 * CODE FOR   GETTING ASSOCIATION
 */

exports.getAllAssocciation = async (req, res, next) => {

    try {


        const association = await UserProfile.find({ usertype: 'association' }).select('name age').exec();
        return res.status(200).json({ status: "all associations", associations: association })

    } catch (error) {
        res.status(403).json({ status: 'Error  Occurred', message: error.message })
    }
}

exports.getAllAssocciationByCityOrCountry = async (req, res, next) => {
    try {
        if (!req.query) {
            return res.status(400).json({ Error: 'not input for country or city ' })
        }
        const queryObj = { ...req.query }
        const exclude = ['page', 'sort', 'fields', 'limit']
        exclude.forEach(el => delete queryObj[el])
        // const query = UserProfile.find(queryObj)
        //const tours = await query
        //console.log(queryObj)


        const association = await UserProfile.find({ userType: 'association', ...queryObj }).select('nameFirst nameLast contactEmail contactPhone country state  city  profilePicture').exec();
        return res.status(200).json({ status: "all associations", associations: association })


    } catch (error) {
        res.status(403).json({ status: 'Error  Occurred', message: error.message })

    }


}


