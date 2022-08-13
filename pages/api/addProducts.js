import connectDB from "../../Middleware/MongooseConnect"
import Product from "../../models/Product"

export default async function getProducts(req, res) {
    try {
        if (req.method === "POST") {
            console.log(`CONNECTING TO MONGODB!!`)
            await connectDB();
            console.log(`CONNECTED TO DB!!`)

            for (let i = 0; i < req.body.length; i++) {
                let p = {
                    productName: req.body[i].productName,
                    slug: req.body[i].slug,
                    desc: req.body[i].desc,
                    imgPath: req.body[i].imgPath,
                    category: req.body[i].category.toUpperCase(),
                    size: req.body[i].size,
                    color: req.body[i].color,
                    price: req.body[i].price,
                    availableQty: req.body[i].availableQty,
                }
                let product = await Product.create(p)
                await product.save();
            }
            res.status(200).json({ "success": "Product Added Successfully" })

        } else {
            res.status(400).json({ "Bad Request": "Method not allowed!!" })

        }


    } catch (error) {
        res.json({ error: error.message })
    }
}