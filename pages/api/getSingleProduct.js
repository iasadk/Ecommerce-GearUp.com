import connectDB from "../../Middleware/MongooseConnect"
import Product from "../../models/Product"

export default async function getSingleProducts(req, res) {
    try {
        if (req.method === "POST") {
            console.log(`CONNECTING TO MONGODB!!`)
            await connectDB();
            console.log(`CONNECTED TO DB!!`)
            const { id } = req.body
            let Products = await Product.find({ "_id": id })
            res.send(Products)
        }else{
        res.status(400).json({ error: "Method Not allowed" })

        }

    } catch (error) {
        res.json({ error: error.message })
    }
}