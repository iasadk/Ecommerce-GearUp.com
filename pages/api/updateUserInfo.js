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
            let { email, password } = req.body;
            let user = await User.findOne({ userEmail: email })
            // console.log(user)
            let c = await bcrypt.compare(password, user.password);
            let d = await JSON.parse(c);

            if (d) {
                if (req.body.newUserName) {
                    let newUserName = req.body.newUserName;
                    try {
                        user = await User.updateOne({ userEmail: email }, { $set: { userName: newUserName } });
                        res.status(200).send({ "message": true })
                    } catch (error) {
                        res.status(500).send({ "message": error })
                    }
                }

                if (req.body.newPassword) {
                    let newPassword = req.body.newPassword;
                    let hashPass;
                    const salt = await bcrypt.genSalt(10);
                    hashPass = await bcrypt.hash(newPassword, salt)
                    newPassword = hashPass
                    try {
                        user = await User.updateOne({ userEmail: email }, { $set: { password: newPassword } });
                        res.status(200).send({ "message": true })
                    } catch (error) {
                        res.status(500).send({ "message": error })
                    }
                }
            }
            else {
                res.send({ "message": "wrong" })
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