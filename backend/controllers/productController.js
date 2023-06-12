const Product = require('../models/product')
const APIFeatures = require('../utils/apiFeatures')
const ErrorHandler = require('../utils/errorHandler')
const errorHandler = require('../utils/errorHandler')

exports.newProducts = async (req,res,next)=>{
    const product = await Product.create(req.body)

    res.status(201).json({
        success:true,
        product
    })
}


exports.getProducts = async (req,res,next)=>{

    //return next(new ErrorHandler('My error', 400))

    const resPerPage = 10

    const productsCount = await Product.countDocuments()

    const apiFeatures = new APIFeatures(Product.find(), req.query)
                        .search()
                        .filter()
                        .pagination(resPerPage)

    const products = await apiFeatures.query

    res.status(200).json({
        success: true,
        productsCount,
        products
    })
}

exports.getSingleProduct = async (req,res,next)=>{

    const products = await Product.findById(req.params.id)

    if(!products){
        return next(new errorHandler("Product not found", 404))
        }
    

    res.status(200).json({
        success:true,
        products
    })
}

exports.updateProduct = async (req,res,next)=>{

    let products = await Product.findById(req.params.id)

    if(!products){
        res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }

    products = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: true
    })

    res.status(200).json({
        success: true,
        products
    })
}

exports.deleteProduct = async (req,res,next)=>{

    const products = await Product.findById(req.params.id)
    

    if(!products){
        return res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }

    await products.remove()

    res.status(200).json({
        success:true,
        message: "Product is removed"
    })
}