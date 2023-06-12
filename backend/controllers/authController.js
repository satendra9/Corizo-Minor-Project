const User = require('../models/user')
const sendToken = require('../utils/JwtToken')
const ErrorHandler = require('../utils/errorHandler')



exports.registerUser = async (req,res,next)=>{

    const {name, email, password} = req.body

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'samples/people/smiling-man.jpg',
            url: 'https://res.cloudinary.com/dz2icev64/image/upload/v1684989016/samples/people/smiling-man.jpg'
        }
    })

    sendToken(user, 200, res)
}

exports.loginUser = async (req, res, next)=>{
    const {email, password} = req.body
    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password', 400))
    }
    const user = await User.findOne({email}).select('+password')

    if(!user){
        return next(new ErrorHandler('user does not exist', 404))
    }

    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid email or password', 401))
    }

   sendToken(user, 200, res)
}

exports.updatePassword = async (req,res,next)=>{
    const user = await User.findById(req.user.id).select('+password')

    const isMatched = await user.comparePassword(req.body.oldPassword)

    if(!isMatched){
        return next(new ErrorHandler('old password is incorrect'))
    }
    user.password = req.body.password
    await user.save()

    sendToken(user,200,res)

}

exports.logoutUser = async(req,res,next)=>{
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'logged out'
    })
}

exports.getUserProfile = async(req,res,next)=>{
    const user  = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
}

exports.updateProfile = async(req,res,next)=>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true
    })
}

exports.allUsers = async(req,res,next)=>{
    const users = await User.find()

    res.status(200).json({
        success:true,
        users
    })
}

exports.getUserDetails = async(req,res,next)=>{
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`user is not found ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })

}

exports.deleteUser = async(req,res,next)=>{
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`user is not found ${req.params.id}`))
    }

    await user.deleteOne()

    res.status(200).json({
        success: true
    })
}