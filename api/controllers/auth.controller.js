import User from '../models/user.model.js'
import bcrypt, { hashSync } from 'bcrypt';
import {errorHandler} from '../utils/error.js'

export const signup = async(req,res,next)=>{
    const {username,email,password}=req.body;
    const hashedPassword =  hashSync(password, 10) 
    const newUser = new User({username,email,password:hashedPassword})
     try{
        await newUser.save()
        res.status(201).json({message:'user created successfully'})
     }catch(error){
        next(error)
     }
}