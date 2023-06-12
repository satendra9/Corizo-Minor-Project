const order = require('../models/order')
const Order = require('../models/order')
const Product = require('../models/product')
const user = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')

exports.newOrder = async(req,res,next)=>{
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now,
        user: req.user._id  
    })

    res.status(200).json({
        success:true,
        order
    })
}
 // getSingle order
exports.getSingleOrder = async (req,res,next)=>{
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(!order){
        return next(new ErrorHandler('Order does not exist'))
    }

    res.status(200).json({
        success: true,
        order
    })
}

// get user's all orders
exports.myOrders = async (req,res,next)=>{
    const orders = await Order.find({user: req.user.id})

    res.status(200).json({
        success: true,
        orders
    })
}

exports.allOrders = async (req,res,next)=>{
    const orders = await Order.find()

    let totalAmount = 0

    orders.forEach(order =>{
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        sucess:true,
        totalAmount,
        orders
    })
}

exports.deleteOrder = async (req,res,next)=>{
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler('Order does not exist'))
    }

    await order.deleteOne()

    res.status(200).json({
        success: true
    })
}
