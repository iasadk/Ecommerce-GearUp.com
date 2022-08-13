import connectDB from "../../Middleware/MongooseConnect"
import Product from "../../models/Product"

export default async function getProducts(req,res){
    try {
        console.log(`CONNECTING TO MONGODB!!`)
        await connectDB();
        console.log(`CONNECTED TO DB!!`)
        let Products = await Product.find()
        res.send({Products})
    } catch (error) {
        res.json({error : error.message})
    }
}