const mongoose=require('mongoose');//חיבור לספריית מונגוס 
const userSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userName:String,
    pass:String,
    fullName:String
});//יצירת סכימה עבור היישות של המשתמש

module.exports=mongoose.model('users',userSchema);//ייצוא המודל שהוגדר ביחד עם הטבלה בבסיס הנתונים והסכימה שהגדרנו עבורה