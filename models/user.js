const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    imgUrl:{
        type:String
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    phone: {
        type: Number,
        length: 10,
        sparse: true,
        unique: true
    },
    role: {
        type: String,
        default: "Customer"
    },
    address: {
        _id: mongoose.Types.ObjectId,
        type: {
            type: String
        },
        pincode: {
            type: Number
        },
        addressLine1: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        country: String
    },
    cartItems: [
        {
            _id: {
                type: mongoose.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1
            }

        }
    ],
    refreshToken: {
        token: {
            type: String
        }
    }
}, { timestamps: true, toJSON: { getters: true } })

userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`
});
const User = new mongoose.model('User', userSchema)
module.exports = User