import {Schema,model, models} from "mongoose";


const ProductSchema = new Schema({
    productName:{ 
        type: String, 
        required: true 
    },
    slug : {
        type: String,
        required : true
    },
    desc : {
        type: String,
        required : true
    },
    imgPath : {
        type: String,
        required : true
    },
    category : {
        type: String,
        required : true
    },
    size: {
        type: Array,
    },
    color: {
        type: String,
    },
    price: {
        type: Number,
        require: true,
    },
    availableQty: {
        type: Number,
        required : true
    },
    status: {
        type: String,
        default: "Pending",
    }
},{timestamps:true})

//Model for our schema: 
const Product = models.Product || model('Product', ProductSchema)



export default Product;