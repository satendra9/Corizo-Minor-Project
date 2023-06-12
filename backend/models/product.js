const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        trim: true,
        maxLength: 100,
    },

    price: {
        type: Number,
        required: true,
        maxLength: 5,
        default: 0
    },

    description: {
        type: String,
        required: true
    },
     
    ratings: {
        type: Number,
        default: 0.0
    },

    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],

    category: {
        type: String,
        required: true,
        enum: {
            values: [
                'Electronics',
                'Books',
                'Food',
                'Clothes',
                'Sports',
                'Home appliances',
                'Sanitary'
            ]
        }
    },

    seller: {
        type: String,
        required: true
    },

    stock: {
        type: Number,
        required: true,
        default: 0
    },

    numofReviews: {
        type: Number,
        default: 0
    },

    Reviews: [{
        name: {
            type: String,
            required: true
        },

        rating: {
            type: Number,
            required: true
        },

        comment: {
            type: String,
            required: true

        }
    }],

    createdAT: {
        type: Date,
        default: Date.now
    }
    
})


module.exports = mongoose.model('product', productSchema)