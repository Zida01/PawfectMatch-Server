const mongoose = require('mongoose');


const dogProfileSchema = new mongoose.Schema({

    dogName: {
        type: String,

    },
    dogBreed: {
        type: String,


    },
    dogAge: {
        type: String,

    },
    country: {
        type: String,

    },
    state: {
        type: String,

    },
    city: {
        type: String,
        default: null
    },
    dogDescription: {
        type: String,

    },

    dogPhotos: {
        type: Array,

    },

    dogProfilePhoto: {
        type: String,
        allowNull: true,
        default: null
    },

    // type: {
    //     type: String,
    //     default: 'walking'
    // },
    // photoUrl: {
    //     type: String,

    // },

    // userProfile: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "UserProfile"
    // }]


});

const DogProfile = mongoose.model('DogProfile', dogProfileSchema);

module.exports = DogProfile