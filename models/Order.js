import {Schema,model, models} from "mongoose";


const OrderSchema = new Schema({
    UserId : {
        type: String,
        require : true,
    },
    products : [{
        productId : {type : String, required:true},
        quantity : {type: Number, required: true}
    }],
    address : {
        type: String,
        require : true,
    },
    amount : {
        type: Number,
        require : true,
    },
    paymentMethod : {
        type : String,
        default : "COD",
    },
    status : {
        type: String,
        default: "Pending",
    }
},{timestamps:true})

//Model for our schema: 
const Order = models.Order || model('Order',OrderSchema)



export default Order;