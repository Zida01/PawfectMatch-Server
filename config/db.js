const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shop'

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

