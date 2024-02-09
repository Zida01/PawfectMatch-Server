

const firebaseError = (error) => (res, req, next) => {
    if (error.code === 'auth/invalid-email') {
        return res.status(400).json("email  does  not exits");
    }
    if (error.code === 'auth/invalid-credential') {
        return res.status(400).json("emails");
    }
    if (error.code === 'auth/email-already-in-use') {
        return res.status(400).json("email already exits");
    }
    return res.status(400).json(('Error Occured:', error.message));

}


module.exports = firebaseError