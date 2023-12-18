import {errorHandler} from '../utils/error.js'
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
export const test = (req,res)=> {
    res.json({
        message:'hello vineesh'
    })
}

export const updateUser = async(req,res,next)=>{
    console.log('this is the update user function')
    if(req.user._id !== req.params.id){
       
        // return res.status(401).json('you can update only your account')
        return next(errorHandler(401,'You can update only your account'))
    }

    try{
        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password, 10)
        }
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,{$set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                profilePic:req.body.profilePic
            }},
            {new:true}
        );
        const {password,...rest} =updateUser._doc;
        res.status(200).json(rest)
    }catch(error){
        next(error)
    }
}


export const deleteUser =async(req,res,next) =>{
    console.log('hey this is the delete user function')
    if(req.user._id !== req.params.id){
        return res.status(401).json('you can delete only your account')    
    }

    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'User has been deleted.' });    
    }catch(error){
        next(error)
    }
}