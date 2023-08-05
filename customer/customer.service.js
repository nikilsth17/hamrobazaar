import Joi, { custom } from "joi";
import { Customer } from "./customer.model.js";
import mongoose from "mongoose";
import { checkMongoIdValidity } from "../utilis/utilis.js";
import { response } from "express";


// validation logic of customer
export const validateCustomer = async (req, res, next) => {
  const newCustomer = req.body;

  const schema = Joi.object({
    name: Joi.string().min(3).max(55).required().trim(),
    dob: Joi.string().required().trim(),
    gender: Joi.string()
      .required()
      // .valid(["male", "female", "preferNotToSay"])
      .trim(),
    email: Joi.string().email().required().trim(),
  });

  try {
    await schema.validateAsync(newCustomer);
    next();
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

// add customer logic
export const addCustomer = async (req, res) => {
  const newCustomer = req.body;

  //   check if user exists
  const customer = await Customer.findOne({ email: newCustomer.email });

  if (customer) {
    return res
      .status(409)
      .send({ message: "User with this email already exists." });
  }
  try {
    await Customer.create(newCustomer);
    return res.status(201).send({ message: "Customer created." });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};


export const deleteCustomer=async(req,res)=>{
  // extract id
  const customerID= req.params.id;
  console.log({customerID});

  // validate id
  const isValidMongoId= checkMongoIdValidity(customerID);

  // delete customer
  await Customer.deleteOne({_id:new mongoose.Types.ObjectId(customerId)});


  // send response 
  return res.status(200).send({message:"Customer deleted successfully"});
};




// get customer 
export const getCustomerDetails= async(req,res)=>{
    // extract id 
    const customerID=req.params.id;
    // validate id 
    const isValid= checkMongoIdValidity(customerID);
    if (!isValid){
      return res.status(400).send({message:"invalid mongo id"});
    }
    // find user 
    const customer= await Customer.findById(customerId);
    // if not user throw error
    if (!customer){
      return res.status(404).send({message:"Customer doesnot exist."})
    }
    // send response
    return res.status(200).send(customer);
}