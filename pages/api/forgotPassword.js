import connectDB from '../../Middleware/MongooseConnect';
import User from '../../models/User';
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
export default async function forgotPassword(req, res) {
    try {
        if (req.method === "POST") {
            console.log(`CONNECTING TO MONGODB!!`)
            await connectDB();
            console.log(`CONNECTED TO DB!!`)
            //get user email
            const { email } = req.body;
            // console.log(req.body)
            //verify user email
            try {
                let user = await User.findOne({ userEmail: email });
                // console.log(user)
                if (!user) {
                    res.status(404).send({ "message": "Wrong email" });
                    return;
                }
                // generate token
                let token = jwt.sign({ "email": email }, process.env.NEXT_PUBLIC_SECRET_KEY_JWT,{
                    expiresIn : '60s'
                });

                const transporter = nodemailer.createTransport({
                    service : "hotmail",
                    auth : {
                        user : "asadkhan7690@Outlook.com",
                        pass : process.env.OUT_P
                    }
                });

                const options = {
                    from : "asadkhan7690@Outlook.com",
                    to : email,
                    subject : "GearUp.com - Reset Password.",
                    text :`
                    It seems like you forgot your password for Gearup.com. If this is true, click the link below to reset your password.
                    
                    Reset my password http://localhost:3000/ResetPassword?token=${token} click here to reset your password

                    Validity : Only for 60s/1min.
                    
                    If you did not forget your password, please disregard this email.`


                }
                transporter.sendMail(options,(err,info)=>{
                    if(err){
                        res.status(500).send({"message": "Problem in mail service"})
                        return;
                    }
                    res.status(200).send({"message" : true})
                })

                // console.log(`first`)

            }
            catch (err) {
                res.status(500).send(err)
                return;

            }
        }
    } catch (error) {
        res.status(500).send({ "message": error })
    }

    //sent that token in url via email using nodemailer
}