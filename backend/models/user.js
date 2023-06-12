const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30
    },

    email:{
        type: String,
        required: true,
        unique: true,
        validate: validator.isEmail
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false //paswword will not be displayed
    },

    role: {
        type: String,
        default: "user"
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date
})
userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_TIME
    })
}


module.exports = mongoose.model('user', userSchema)