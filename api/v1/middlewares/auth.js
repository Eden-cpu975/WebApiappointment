//  const jwt=require('jsonwebtoken');
//  module.exports=(req,res,next)=>{
//     try{
//         const token=req.headers.authorization.split(' ')[1];//שליפת הטוקן מתוך ההדר של האבטחה 
//          const userNameobj=jwt.verify(token,"abcd1234");//לוקח את הטוקן והמפתח מפענח מה שמפענח מחזיר למשתנה 
//          req.userName=userNameobj;// שמירת שם המשתמש עבור השכבות הבאות
//         next();//מעבר לשכבה הבאה
//      }
//      catch{//אם לא מצליח לפענח יחזיר שגיאה
//         return res.status(403).json({msg:"Not Authorized"});
//      }
//  };