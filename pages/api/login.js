import User from '../../models/User';
import connectDB from '../../Middleware/MongooseConnect';
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

export default async function login(req, res) {
    const secret = process.env.NEXT_PUBLIC_SECRET_KEY_JWT;
    try {
        if (req.method === "POST") {
            console.log(`CONNECTING TO MONGODB!!`)
            await connectDB();
            console.log(`CONNECTED TO DB!!`)
            let { userEmail, password } = req.body;
            let user = await User.findOne({ userEmail: userEmail })
            // console.log(user)
            if (user!==null) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        res.send({ "message": `${err} ${password}` })
                        return;
                    }
                    if (result) {
                        var token = jwt.sign({userName : user.userName, email : userEmail}, secret);
                        res.send({ "message": true, token })
                    }
                    else {
                        res.send({ "message": "Invalid Credentials" })
                    }
                });
            }
            else{
                res.send({"message" : "Email Not exist. Please Sign Up"})
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