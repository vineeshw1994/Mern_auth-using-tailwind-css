import User from '../models/user.model.js'
import bcrypt, { hashSync } from 'bcrypt';
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'
 
export const signup = async (req, res, next) => {
   const { username, email, password } = req.body;
   const hashedPassword = hashSync(password, 10)
   const newUser = new User({ username, email, password: hashedPassword })
   try {
      await newUser.save()
      res.status(201).json({ message: 'user created successfully' })
   } catch (error) {
      next(error)
   }
}

export const signin = async (req, res, next) => {
   const { email, password } = req.body;
   try {
      console.log('this inside the try block')

      const validUser = await User.findOne({ email })
      
      if (!validUser) return next(errorHandler(401, ' User not found'))

      const validPassword = bcrypt.compareSync(password, validUser.password) 
 
      if (!validUser) return next(errorHandler(401, ' Invalid credetials'))

      const token = jwt.sign({ _id: validUser._id }, process.env.JWT_SECRET)

      const { password: hashedPassword, ...rest } = validUser._doc
      
      const expiryDate = new Date(Date.now() + 3600000)

      res.cookie('access_token', token, { httpOnly: true, }, expiryDate)
         .status(200)
         .json(rest)

   } catch (error) {
      next(error)
   }
}