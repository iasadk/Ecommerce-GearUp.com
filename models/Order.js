import { Schema, model, models } from "mongoose";


const OrderSchema = new Schema({
    fullName: {
        type: String,
        require: true,
    },
    userEmail: {
        type: String,
        require: true,
    },
    products: [{
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        price : {type: Number, required: true},
        size : { type: String, required: true },
        color : { type: String, required: true },
        imgPath : { type: String, required: true },
        productName: { type: String, required: true }

    }],
    address: {
        type: String,
        require: true,
    },
    amount: {
        type: Number,
        require: true,
    },
    pincode: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    district: {
        type: String,
        require: true
    },
    paymentMethod: {
        type: String,
        default: "COD",
    },
    status: {
        type: String,
        default: "Pending",
    },
    estimatedTime  :{
        type: String,
        default: () => new Date(+new Date() + 2*24*60*60*1000),
    }
}, { timestamps: true })

//Model for our schema: 
const Order = models.Order || model('Order', OrderSchema)



export default Order;