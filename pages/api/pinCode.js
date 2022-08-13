export default function handler(req,res){
    const PINCODE_LIST = [110084,110092,590045];
    res.status(200).json(PINCODE_LIST);

}