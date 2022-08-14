import connectDB from '../../Middleware/MongooseConnect';
import Order from '../../models/Order';

export default async function placeOrder(req, res) {
    try {
        if (req.method == "POST") {
            try {
                console.log('CONNECTING TO DB')
                await connectDB();
                console.log('CONNECTED TO DB');
                try {
                    let orderDetails = await Order.create(req.body);
                    orderDetails = await orderDetails.save();
                } catch (error) {
                    res.status(403).send({ "message": error });

                }
                res.status(200).send({ "message": "Order placed successfully" })
            } catch (error) {
                res.status(200).send({ "message": "Internal Server Error", "error": error })

            }
        }
        else {
            res.status(403).send({ "message": "Method not allowed" });
        }
    } catch (error) {
        res.send(400).send({ "message": "Bad request", "error": error })
    }
}