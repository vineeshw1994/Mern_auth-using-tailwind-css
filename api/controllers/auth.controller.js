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

      const validUser = await User.findOne({ email })

      if (!validUser) return next(errorHandler(401, ' User not found'))

      const validPassword = bcrypt.compareSync(password, validUser.password)

      if (!validPassword) return next(errorHandler(401, ' Invalid credentials'))

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

export const google = async (req, res, next) => {
   try {
      const user = await User.findOne({ email: req.body.email })

      if (user) {
         const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

         const { password: hashedPassword, ...rest } = user._doc
         const expiryDate = new Date(Date.now() + 3600000)
         res.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
            .status(200)
            .json(rest)
      } else {
         const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
         const hashPassword = bcrypt.hashSync(generatePassword, 10)

         const newUser = new User({
            username: req.body.name.split(" ").join().toLowerCase() + Math.floor(Math.random() * 10000).toString(),
            email: req.body.email,
            password: hashPassword,
            profilePic: req.body.photo
         })

         await newUser.save()

         const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET)
         const { password: hashedPassword, ...rest } = newUser._doc
         const expiryDate = new Date(Date.now() + 3600000)
         res.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
            .status(200)
            .json(rest)

      }
   } catch (error) { 
      next(error)
   }
}


export const signout = (req,res) =>{
   res.clearCookies('access_token').status(200).json('signout success')
}