import mongoose from "mongoose";

//set rule

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        maxlength:55,
        required:true,
        trim: true,
    },
    dob:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        enum:["male","female","preferNotSay"],
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    }
});

// create table
export const Customer= mongoose.model("Customer",customerSchema);

export {customerSchema};