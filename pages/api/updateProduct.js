import connectDB from "../../Middleware/MongooseConnect"
import Product from "../../models/Product"

export default async function updateProduct(req, res) {
    try {
        if (req.method === "PUT") {
            const { id } = req.query;
            console.log(`CONNECTING TO MONGODB!!`)
            await connectDB();
            console.log(`CONNECTED TO DB!!`)
            let isProduct = await Product.findById(id);
            if (isProduct) {
                let p = {
                    productName: req.body.productName,
                    slug: req.body.slug,
                    desc: req.body.desc,
                    imgPath: req.body.imgPath,
                    category: req.body.category,
                    size: req.body.size,
                    color: req.body.color,
                    price: req.body.price,
                    availableQty: req.body.availableQty,
                }

                await Product.findByIdAndUpdate(id, p);

                res.status(200).json({ "success": "Product Updated Successfully" })
            } else {
                res.status(404).json({ "Invalid Id": "No product with given Id" })

            }




        } else {
            res.status(400).json({ "Bad Request": "Method not allowed!!" })

        }



    } catch (error) {
        res.json({ error: error.message })
    }
}