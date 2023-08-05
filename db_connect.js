import mongoose from "mongoose";

const {DB_USERNAME,DB_PASSWORD,DB_NAME}= process.env;

const db_url=`mongodb+srv://${DB_USERNAME}:${encodeURIComponent(DB_PASSWORD)}@cluster0.fwx28zt.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;


const db_connect=async()=>{
    try {
        await mongoose.connect(db_url);
        console.log("DB connection ok");

    }
     catch (error) {
        console.log("DB connection failed");
        console.log(error.message);
    }
}


export {db_connect};