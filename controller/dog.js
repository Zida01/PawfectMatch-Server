const DogProfile = require('../models/dogsProfile')
const UserProfile = require('../models/UserProfile')

exports.createDog = async (req, res, next) => {


    const userProfile = req.session.user
    console.log()
    if (userProfile) {
        const addDogs = await DogProfile.create(req.body)
        const adddogToProfile = await UserProfile.findByIdAndUpdate(userProfile,

            {
                $push: { dogProfile: addDogs._id }

            },
            { new: true }

        )
        return res.json({ status: adddogToProfile, addDogs })
    }
    return res.json({ status: 'failed' })

}

// exports.createDog = async (req, res, next) => {
//     const addDogs = await DogProfile.create(req.body)
//     const userProfile = req.session.user
//     if (userProfile) {
//         const adddogToProfile = await UserProfile.findByIdAndUpdate(userProfile,

//             {
//                 $push: { dogProfile: addDogs._id }

//             },
//             { new: true }

//         )
//         return res.json({ status: adddogToProfile })
//     }
//     return res.json({ status: 'failed' })

// }



//** REMOVE AUTH FOR UNREGISTERED USER
exports.Alldogs = async (req, res, next) => {
    try {
        const showprofileWithDog = await DogProfile.find()
        if (!showprofileWithDog) {
            return res.json({ status: 'failed' })
        }
        return res.json(showprofileWithDog)


    } catch (error) {
        res.status(403).json({ status: 'Error  Occurred', message: error.message })
    }

}



//** AUTH REQUIRED ASSOCIATION AND VOLUNTEER */
// exports.Alldogs = async (req, res, next) => {
//     try {
//         const userProfile = req.session.user

//         if (userProfile) {
//             const showprofileWithDog = await DogProfile.find()
//             if (!showprofileWithDog) {
//                 return res.json({ status: 'failed' })
//             }
//             return res.json(showprofileWithDog)
//         }
//         return res.json({ status: 'failed' })

//     } catch (error) {
//         res.status(403).json({ status: 'Error  Occurred', message: error.message })
//     }

// }


exports.getAlldogs = async (req, res, next) => {
    try {

        const showprofileWithDog = await DogProfile.find()
        if (!showprofileWithDog) {
            return res.json({ status: 'failed  searching for  all dogs' })
        }
        return res.json(showprofileWithDog)
    } catch (error) {
        res.status(403).json({ status: 'Error  Occurred', message: error.message })
    }

}


exports.getAlldogsByCityOrCountry = async (req, res, next) => {

    try {
        if (!req.query) {
            return res.status(400).json({ Error: 'not input for country or city ' })
        }
        console.log(req.query)
        const queryObj = { ...req.query }
        const exclude = ['page', 'sort', 'fields', 'limit']
        exclude.forEach(el => delete queryObj[el])
        // const query = UserProfile.find(queryObj)
        //const tours = await query
        console.log(queryObj)

        const dogs = await DogProfile.find(queryObj).select('dogName dogBreed  country state city dogProfilePhoto')
        return res.status(200).json(dogs)

        // { status: "all dogs", dogs: dogs }
    } catch (error) {
        return res.status(403).json({ status: 'Error  Occurred', message: error.message })

    }

}


exports.AllMyDogs = async (req, res, next) => {
    try {
        const userProfile = req.session.user

        if (userProfile) {
            const showprofileWithDog = await UserProfile.findById(userProfile).populate('dogProfile').exec();
            if (!showprofileWithDog) {
                return res.json({ status: 'failed' })
            }
            return res.json(showprofileWithDog.dogProfile)
        }
        return res.json({ status: 'failed' })

    } catch (error) {
        res.status(403).json({ status: 'Error  Occurred', message: error.message })
    }



}

//  ***** AUTH REQUIRED***///
// exports.GetDogsByBreed = async (req, res, next) => {
//     const { breed } = req.params
//     console.log(breed)
//     try {
//         const userProfile = req.session.user

//         if (userProfile) {
//             const dog = await DogProfile.find({ dogBreed: breed })
//             if (!dog) {
//                 return res.json({ status: ' dogs does  not exits in  db' })
//             }
//             return res.json(dog)
//         }
//         return res.json({ status: 'failed  user Auth' })

//     } catch (error) {
//         res.status(403).json({ status: 'Error  Occurred', message: error.message })
//     }



// }

exports.GetDogsByBreed = async (req, res, next) => {
    const { breed } = req.params
    // console.log(breed)
    try {

        const dog = await DogProfile.find({ dogBreed: breed })
        if (!dog) {
            return res.json({ status: ' dogs does  not exits in  db' })
        }
        return res.json(dog)


    } catch (error) {
        res.status(403).json({ status: 'Error  Occurred', message: error.message })
    }



}





exports.getWalkingdogs = async (req, res, next) => {

    try {
        const userProfile = req.session.user
        if (userProfile) {
            const showprofileWithDog = await UserProfile.findById(userProfile).populate({
                path: 'dogProfile',
                select: 'breed type',
                match: { type: 'walking' }
            })
            if (!showprofileWithDog) {
                return res.json({ status: 'failed' })
            }
            return res.json({ status: showprofileWithDog.dogProfile })
        }
        return res.json({ status: 'failed' })

    } catch (error) {
        res.status(403).json({ status: 'Error  Occurred', message: error.message })


    }

}

exports.getAdoptiondogs = async (req, res, next) => {

    try {
        const userProfile = req.session.user
        if (userProfile) {
            const showprofileWithDog = await UserProfile.findById(userProfile).populate({
                path: 'dogProfile',
                select: 'breed type',
                match: { type: 'adoption' }
            })
            if (!showprofileWithDog) {
                return res.json({ status: 'failed' })
            }
            return res.json({ status: showprofileWithDog.dogProfile })
        }
        return res.json({ status: 'failed' })

    } catch (error) {
        res.status(403).json({ status: 'Error  Occurred', message: error.message })

    }

}


exports.getOnedogs = async (req, res, next) => {

    try {
        const userProfile = req.session.user
        const dogId = req.params.dogId
        if (!userProfile) {
            return res.json({ status: 'failed searching UserProfile' })
        }
        const dog = await DogProfile.findById(dogId);
        if (!dog) {
            return res.json({ status: 'failed  to find that dogs' })
        }
        res.json(dog)

    } catch (error) {
        res.status(403).json({ status: 'Error  Occurred', message: error.message })

    }

}


exports.updatedogs = async (req, res, next) => {
    try {
        const userProfile = req.session.user
        const dogId = req.params.dogId
        const dog = await DogProfile.findById(dogId);
        const user = await UserProfile.findById(userProfile)
        if (!dog) { return res.json({ status: ' dog  not  available' }) };
        if (!user) { return res.json({ status: ' User not  available' }) }
        if (!user.dogProfile.some(dog => dog.equals(dogId))) { return res.json({ status: ' User  can edit not this resource' }) }
        const updatedogs = await DogProfile.findByIdAndUpdate(dogId, req.body, { new: true })
        return res.json({ status: updatedogs })
    } catch (error) {
        res.status(403).json({ status: 'Error  Occurred', message: error.message })
    }

}


exports.deletedogs = async (req, res, next) => {
    try {
        const userProfile = req.session.user
        const dogId = req.params.dogId
        const dog = await DogProfile.findById(dogId);
        const user = await UserProfile.findById(userProfile)
        if (!dog) { return res.json({ status: ' dog  not  available' }) };
        if (!user) { return res.json({ status: ' User not  available' }) }
        if (!user.dogProfile.some(dog => dog.equals(dogId))) { return res.json({ status: ' User  can edit not this resource' }) }
        const deletedogs = await DogProfile.findByIdAndDelete(dogId)
        return res.json({ status: "deleted Dogs" })

    } catch (error) {
        res.status(403).json({ status: 'Error  Occurred', message: error.message })
    }


}


exports.getAlldogsWalking = async (req, res, next) => {

    try {

        const dogs = await DogProfile.find({ type: 'walking' })
        return res.status(200).json({ status: "Dog that Needs Walking", dogs: dogs })

    } catch (error) {
        res.status(403).json({ status: 'Error  Occurred', message: error.message })
    }
}

exports.getAlldogsAdoption = async (req, res, next) => {

    try {

        const dogs = await DogProfile.find({ type: 'adoption' })
        return res.status(200).json({ status: "Dog that Needs adoption", dogs: dogs })

    } catch (error) {
        res.status(403).json({ status: 'Error  Occurred', message: error.message })
    }
}