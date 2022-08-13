import User from '../../models/User';
import connectDB from '../../Middleware/MongooseConnect';
const bcrypt = require('bcrypt');

export default async function signUp(req, res) {

    try {
        if (req.method === "POST") {
            console.log(`CONNECTING TO MONGODB!!`)
            await connectDB();
            console.log(`CONNECTED TO DB!!`)
            let { userName, userEmail, phoneNo, password } = req.body;
            try {
                let user = await User.findOne({ userEmail: userEmail })
                
                if (user) {
                    res.status(409).send({ "message": `Email already in use : ${userEmail}`,"msg" : "inuse" })
                    return;
                }
            } catch (error) {
                res.status(500).send({ "message": `Internal Server Error : ${error}` })
                return

            }
            let hashPass;
            const salt = await bcrypt.genSalt(10);
            hashPass = await bcrypt.hash(password,salt)
            password = hashPass
            let user = await User.create({ userName, userEmail, password, phoneNo });
            user = await user.save();
            res.status(200).send({ "message": true })
        } else {
            res.status(403).json({ "message": "Method not allowed" })
            return


        }
    } catch (error) {
        res.status(500).send({ "message": `${error}` })
    }
}