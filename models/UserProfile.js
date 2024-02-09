const mongoose = require('mongoose');


const userProfileSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        allowNull: false
    },
    associationName: {
        type: String,
        allowNull: true,
        default: null
    },
    nameFirst: {
        type: String,
        allowNull: true,
        default: null
    },
    nameLast: {
        type: String,
        allowNull: true,
        default: null
    },
    userType: {
        type: String,
        allowNull: true,
        default: null

    },
    verified: {
        type: Boolean,

    },
    country: {
        type: String,
        allowNull: true,
        default: null
    },
    city: {
        type: String,
        allowNull: true,
        default: null
    },
    state: {
        type: String,
        allowNull: true,
        default: null
    },
    contactPhone: {
        type: String,
        allowNull: true,
        default: null
    },
    contactEmail: {
        type: String,
        allowNull: true,
        default: null
    },
    description: {
        type: String,
        allowNull: true,
        default: null
    },
    checkBox: {
        type: Boolean,
        default: false

    },
    profilePicture: {
        type: String,
        allowNull: false,

    },
    //stateIso2:selectedStateIso2
    //countryIso2:selectedCountryIso2

    dogProfile: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DogProfile'
    }]

});



const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile