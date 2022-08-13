import {Schema,model, models} from "mongoose";


const UserSchema = new Schema({
    userName:{ 
        type: String, 
        required: true 
    },
    userEmail : {
        type: String,
        unique: true,
        required : true
    },
    password : {
        type: String,
        required : true
    },
    phoneNo : {
        type: String,
        required : true
    }
},{timestamps:true})

//Model for our schema: 
const User = models.User || model('User', UserSchema)



export default User;