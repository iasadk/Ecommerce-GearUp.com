import connectDB from "../../Middleware/MongooseConnect";
import Order from "../../models/Order";
export default async function getOrders(req, res) {
    try {
        if (req.method == "POST") {
            console.log(`CONNECTING TO MONGODB!!`)
            await connectDB();
            console.log(`CONNECTED TO DB!!`)
            const { email, status } = req.body;
            let orders = await Order.find({ "userEmail": email, "status": `${status ? status : "Pending"}` });
            if (orders.length == 0) {
                res.status(404).send({ "message": "No Order is pending " })
            }
            else {
                res.send({orders});
            }

        }
        else {
            res.status(400).send({ "message": "Bad Request" })
        }
    } catch (error) {
        res.status(500).send({ "message": "Internal server error!!" })
    }
}