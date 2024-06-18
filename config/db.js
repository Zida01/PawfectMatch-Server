const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URI 

const connectdb = async () => {
    try {

        await mongoose.connect(MONGODB_URL, {
            //useNewUrlParser: false,
            //useUnifiedTopology: false,
            //useFindAndModify: false
        });
        console.log(" db connected");
    } catch (error) {
        console.log(error);
    }

};
connectdb();

