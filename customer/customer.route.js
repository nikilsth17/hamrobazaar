import express, { response } from "express";
import { validateCustomer, addCustomer,deleteCustomer, getCustomerDetails,getCustomerDetails } from "./customer.service.js";


const router = express.Router();

// create a customer
router.post("/customer/create", validateCustomer, addCustomer);

// delete a customer 
router.delete("/customer/delete/:id",deleteCustomer);


// get  single customer
router.get("/customer/details/:id",getCustomerDetails);

// edit customer 
// id=>params 
// =>body 


// search by name = regex use

export default router;
