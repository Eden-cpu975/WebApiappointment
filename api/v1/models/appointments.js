const mongoose=require('mongoose');//חיבור לספריית מונגוס
const appointmentsSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    clientName:String,
    date:Date,
    status:String,
    createdAt:Date,
    updatedAt:Date
});//יצירת סכימה עבור המוצרים 
const model=mongoose.model('Appointments',appointmentsSchema);//יצירת מודל דרכו נעבוד מול בסיס הנתונים עם המוצרים 
module.exports=model;
