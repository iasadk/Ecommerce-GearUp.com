import User from '../../models/User';
import connectDB from '../../Middleware/MongooseConnect';
const bcrypt = require('bcrypt');

export default async function updateUserInfo(req, res) {
    const secret = process.env.NEXT_PUBLIC_SECRET_KEY_JWT;
    try {
        if (req.method === "POST") {
            console.log(`CONNECTING TO MONGODB!!`)
            await connectDB();
            console.log(`CONNECTED TO DB!!`)
            let { email, newPassword } = req.body;

            let hashPass;
            const salt = await bcrypt.genSalt(10);
            hashPass = await bcrypt.hash(newPassword, salt)
            newPassword = hashPass
            try {
                let user = await User.updateOne({ userEmail: email }, { $set: { password: newPassword } });
                res.status(200).send({ "message": true })
            } catch (error) {
                res.status(500).send({ "message": error })
            }


        }
        else {
            res.send({ "message": "Method Not allowed" })
        }
    }
    catch (error) {
        res.status(500).send({ "message": `${error}` })
    }
}