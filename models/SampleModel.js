import {Schema,model, models} from "mongoose";

const TestSchema = new Schema({
    name:{ 
        type: String, 
        required: true 
    },
   email : {
        type: String,
        required : true
    }
},{timestamps:true})

//Model for our schema: 
const SampleModel = models.SampleModel || model('SampleModel', TestSchema)



export default SampleModel;